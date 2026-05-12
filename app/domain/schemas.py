from __future__ import annotations

from pydantic import BaseModel, Field
from app.domain.models import Message, SessionState

class StartGameRequest(BaseModel):
    player_name: str = Field(default="Người lữ hành", min_length=1, max_length=80)
    gender: str | None = Field(default=None, max_length=120)
    personality: str | None = Field(default=None, max_length=300)
    story_style: str | None = Field(default=None, max_length=200)
    character_hint: str | None = Field(default=None, max_length=1000)
    world_hint: str | None = Field(default=None, max_length=1000)

class TurnRequest(BaseModel):
    session_id: str
    player_input: str = Field(min_length=1, max_length=4000)
    target_words: int = Field(default=600, ge=100, le=2000)

class StoryResponse(BaseModel):
    session_id: str
    message: str
    choices: list[str] = Field(default_factory=list)
    foundation_text: str = ""
    session: SessionState

class SessionResponse(BaseModel):
    session: SessionState
    messages: list[Message]
class NovelStartRequest(BaseModel):
    title: str | None = Field(default=None, max_length=120)
    world_seed: str | None = Field(default=None, max_length=4000)
    target_words: int = Field(default=600, ge=150, le=2000)


class NovelQuestionAnswer(BaseModel):
    question_id: str
    question: str
    answer: str


class NovelWorldResponse(BaseModel):
    session_id: str
    world_draft: str
    questions: list[dict] = Field(default_factory=list)
    session: SessionState


class NovelFoundationRequest(BaseModel):
    session_id: str
    player_name: str = Field(default="The Wanderer", min_length=1, max_length=80)
    gender: str | None = Field(default=None, max_length=120)
    age: str | None = Field(default=None, max_length=80)
    occupation: str | None = Field(default=None, max_length=160)
    personality: str | None = Field(default=None, max_length=500)
    answers: list[NovelQuestionAnswer] = Field(default_factory=list)
    target_words: int = Field(default=600, ge=150, le=2000)