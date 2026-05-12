from __future__ import annotations

from datetime import datetime, timezone
from typing import Literal, Any
from pydantic import BaseModel, Field


Role = Literal["user", "ai", "system"]

def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()

class Message(BaseModel):
    message_id: str
    session_id: str
    role: Role
    content: str
    choices: list[str] = Field(default_factory=list)
    created_at: str = Field(default_factory=utc_now_iso)

class SessionState(BaseModel):
    session_id: str
    user_id: str

    title: str = "Cuộc phiêu lưu chưa đặt tên"
    foundation_text: str = ""

    world_summary: str = ""
    character_summary: str = ""
    story_summary: str = ""

    important_facts: list[str] = Field(default_factory=list)

    created_at: str = Field(default_factory=utc_now_iso)
    updated_at: str = Field(default_factory=utc_now_iso)
    
    mode: Literal["adventure", "novel"] = "adventure"

    world_seed: str = ""
    world_questions: list[dict[str, Any]] = Field(default_factory=list)
    world_answers: list[dict[str, Any]] = Field(default_factory=list)

    novel_profile: dict[str, Any] = Field(default_factory=dict)
    target_words: int = 600

class MemoryChunk(BaseModel):
    chunk_id: str
    session_id: str
    text: str
    kind: str = "event"
    importance: int = 3
    source_message_id: str | None = None
    created_at: str = Field(default_factory=utc_now_iso)
