from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from app.routes import auth, user

app = FastAPI(title="Fullstack App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # veya ["*"] geliştirirken
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(user.router, prefix="/api", tags=["users"])

@app.get("/", response_class=HTMLResponse)
async def root():
    return """
    <html>
        <head>
            <meta http-equiv="refresh" content="0; url=/docs" />
        </head>
        <body>
            <p>Redirecting to <a href="/docs">API Documentation</a>...</p>
        </body>
    </html>
    """