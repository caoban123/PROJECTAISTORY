# AI Story Adventure

Bản nền tối giản: AI tự tạo thế giới, nhân vật và mở đầu; người chơi nhập hành động tự do; Firebase lưu dữ liệu gốc; ChromaDB lưu vector memory; summary giữ mạch truyện.

## Chạy nhanh

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

python -m http.server 5500
http://localhost:5500

Mở `frontend/index.html` bằng trình duyệt.

## API

- `POST /game/start`
- `POST /game/turn`
- `GET /game/{session_id}`

## Ghi chú cấu hình

Để test trước khi cấu hình Firebase/API key, đặt:

```env
TEXT_PROVIDER=mock
USE_LOCAL_STORE_IF_FIREBASE_MISSING=true
```

Khi dùng OpenAI:

```env
TEXT_PROVIDER=openai
TEXT_MODEL=gpt-4o-mini
OPENAI_API_KEY=...
```

Khi dùng Gemini:

```env
TEXT_PROVIDER=gemini
TEXT_MODEL=gemini-2.5-flash
GEMINI_API_KEY=...
```

Khi dùng Ollama:

```env
TEXT_PROVIDER=ollama
TEXT_MODEL=llama3:latest
OLLAMA_BASE_URL=http://127.0.0.1:11434
```

Firebase dùng `FIREBASE_CREDENTIALS_PATH` hoặc `FIREBASE_SERVICE_ACCOUNT_JSON`.

cd frontend
python -m http.server 5500
http://localhost:5500