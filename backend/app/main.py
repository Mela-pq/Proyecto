from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import create_tables
from .routers import auth, usuarios, publicaciones, comentarios, likes, guardados, uploads

app = FastAPI(title="Pinterest API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear tablas al inicio
@app.on_event("startup")
def on_startup():
    create_tables()

# Incluir routers
app.include_router(auth.router)
app.include_router(usuarios.router)
app.include_router(publicaciones.router)
app.include_router(comentarios.router)
app.include_router(likes.router)
app.include_router(guardados.router)
app.include_router(uploads.router)

@app.get("/")
def root():
    return {"message": "Pinterest API", "status": "online"}

@app.get("/health")
def health():
    return {"status": "ok"}