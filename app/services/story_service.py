from __future__ import annotations

from uuid import uuid4
from app.ai.output_parser import parse_story_output
from app.ai.prompt import (
    build_start_prompt,
    build_turn_prompt,
    build_novel_world_prompt,
    build_novel_foundation_prompt,
)
from app.ai.provider import get_text_provider
from app.domain.models import Message, SessionState, utc_now_iso
from app.domain.schemas import (
    StartGameRequest,
    StoryResponse,
    TurnRequest,
    NovelStartRequest,
    NovelWorldResponse,
    NovelFoundationRequest,
)
from app.memory.firebase_store import FirebaseStore
from app.memory.memory_service import MemoryService
from app.memory.vector_store import VectorStore
import json 
class StoryService:
    def __init__(self) -> None:
        self.provider = get_text_provider()
        self.store = FirebaseStore()
        self.vector_store = VectorStore()
        self.memory = MemoryService(self.store, self.vector_store, self.provider)

    async def start_game(self, request: StartGameRequest, user_id: str,) -> StoryResponse:
        session = SessionState(
            session_id=str(uuid4()),
            user_id=user_id,
            title=f"Câu chuyện của {request.player_name}",
        )
        await self.store.create_session(session)

        prompt = build_start_prompt(
            player_name=request.player_name,
            story_style=request.story_style,
            character_hint=request.character_hint,
            world_hint=request.world_hint,
            gender=request.gender,
            personality=request.personality,
        )

        raw = await self.provider.generate_text(prompt)
        parsed = parse_story_output(raw)

        foundation_text = parsed["foundation"]
        ai_text = parsed["story"]
        choices = parsed["choices"]

        if foundation_text:
            session.foundation_text = foundation_text
            session.world_summary = foundation_text
            session.character_summary = foundation_text
            session.story_summary = "The story has just begun."
            session.important_facts = list(dict.fromkeys(session.important_facts + [foundation_text]))[-12:]
            session.updated_at = utc_now_iso()
            await self.store.update_session(session)

        foundation_message = Message(
            message_id=str(uuid4()),
            session_id=session.session_id,
            role="system",
            content=f"Story foundation profile:\n{foundation_text}" if foundation_text else "Story foundation profile is not clearly.",
        )
        await self.store.add_message(foundation_message)

        ai_message = Message(
            message_id=str(uuid4()),
            session_id=session.session_id,
            role="ai",
            content=ai_text,
            choices=choices,
        )
        await self.memory.save_message(ai_message)

        session = await self.memory.refresh_summary(session)

        return StoryResponse(
            session_id=session.session_id,
            message=ai_text,
            choices=choices,
            foundation_text=session.foundation_text,
            session=session,
        )

    async def continue_story(self, request: TurnRequest, user_id: str, ) -> StoryResponse:
        session = await self.store.get_session(request.session_id)
        if session is None:
            raise ValueError("Session not found")
        if session.user_id != user_id:
            raise PermissionError("You do not own this session")
        user_message = Message(
            message_id=str(uuid4()),
            session_id=request.session_id,
            role="user",
            content=request.player_input,
        )
        await self.memory.save_message(user_message)

        recent = await self.memory.recent_messages(request.session_id)
        query = f"{request.player_input}\n{session.foundation_text}\n{session.story_summary}\n{session.character_summary}"
        relevant = await self.memory.relevant_memories(request.session_id, query)

        prompt = build_turn_prompt(
                session,
                recent,
                relevant,
                request.player_input,
                target_words=request.target_words,
            )
        raw = await self.provider.generate_text(prompt)
        parsed = parse_story_output(raw)

        ai_text = parsed["story"]
        choices = parsed["choices"]

        ai_message = Message(
            message_id=str(uuid4()),
            session_id=request.session_id,
            role="ai",
            content=ai_text,
            choices=choices,
        )
        await self.memory.save_message(ai_message)

        session.updated_at = utc_now_iso()
        await self.store.update_session(session)
        session = await self.memory.refresh_summary(session)

        return StoryResponse(
            session_id=session.session_id,
            message=ai_text,
            choices=choices,
            foundation_text=session.foundation_text,
            session=session,
        )

    async def get_session(self, session_id: str, user_id: str,):
        session = await self.store.get_session(session_id)
        if session is None:
            raise ValueError("Session not found")
        if session.user_id != user_id:
            raise PermissionError("You do not own this session")
        messages = await self.store.get_messages(session_id, limit=100)
        return session, messages
    async def debug_memory(self, session_id: str):
        session = await self.store.get_session(session_id)
        if session is None:
            raise ValueError("Session not found")

        messages = await self.store.get_messages(session_id, limit=30)
        memories = await self.vector_store.list_memories(session_id, limit=100)

        return {
            "session": session,
            "messages": messages,
            "memories": memories,
        }
    async def list_sessions(self, user_id: str):
        return await self.store.list_sessions(
                user_id=user_id,
                limit=30,
            )
    async def delete_session(self, session_id: str, user_id: str,):
        session = await self.store.get_session(session_id)

        if session is None:
            raise ValueError("Session not found")
        if session.user_id != user_id:
            raise PermissionError("You do not own this session")

        await self.vector_store.delete_memories(session_id)
        await self.store.delete_session(session_id)

        return {"success": True}
    def _parse_json(self, raw: str) -> dict:
        text = raw.strip()

        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)
    async def start_novel_world(
        self,
        request: NovelStartRequest,
        user_id: str,
    ) -> NovelWorldResponse:
        session = SessionState(
            session_id=str(uuid4()),
            user_id=user_id,
            mode="novel",
            title=request.title or "Untitled Novel",
            world_seed=request.world_seed or "",
            target_words=request.target_words,
        )

        await self.store.create_session(session)

        prompt = build_novel_world_prompt(request.world_seed)
        raw = await self.provider.generate_text(prompt)
        data = self._parse_json(raw)

        world_draft = data.get("world_draft", "")
        questions = data.get("questions", [])

        session.world_summary = world_draft
        session.world_questions = questions
        session.novel_profile = {
            "world_draft": world_draft,
            "questions": questions,
        }
        session.updated_at = utc_now_iso()

        await self.store.update_session(session)

        return NovelWorldResponse(
            session_id=session.session_id,
            world_draft=world_draft,
            questions=questions,
            session=session,
        )
    async def create_novel_foundation(
        self,
        request: NovelFoundationRequest,
        user_id: str,
    ) -> StoryResponse:
        session = await self.store.get_session(request.session_id)

        if session is None:
            raise ValueError("Session not found")

        if session.user_id != user_id:
            raise PermissionError("You do not own this session")

        answers = [a.model_dump() for a in request.answers]

        session.world_answers = answers
        session.target_words = request.target_words

        prompt = build_novel_foundation_prompt(
            session=session,
            player_name=request.player_name,
            gender=request.gender,
            age=request.age,
            occupation=request.occupation,
            personality=request.personality,
            answers=answers,
            target_words=request.target_words,
        )

        raw = await self.provider.generate_text(prompt)
        data = self._parse_json(raw)

        foundation_text = data.get("foundation", "")
        novel_profile = data.get("novel_profile", {})
        ai_text = data.get("story", "")
        choices = data.get("choices", [])

        session.foundation_text = foundation_text
        session.novel_profile = novel_profile
        session.character_summary = json.dumps(
            novel_profile.get("protagonist", {}),
            ensure_ascii=False,
        )
        session.story_summary = "The novel has just begun."
        session.important_facts = [foundation_text]
        session.updated_at = utc_now_iso()

        await self.store.update_session(session)

        foundation_message = Message(
            message_id=str(uuid4()),
            session_id=session.session_id,
            role="system",
            content=f"Novel foundation profile:\n{foundation_text}",
        )
        await self.store.add_message(foundation_message)

        ai_message = Message(
            message_id=str(uuid4()),
            session_id=session.session_id,
            role="ai",
            content=ai_text,
            choices=choices,
        )
        await self.memory.save_message(ai_message)

        session = await self.memory.refresh_summary(session)

        return StoryResponse(
            session_id=session.session_id,
            message=ai_text,
            choices=choices,
            foundation_text=session.foundation_text,
            session=session,
        )