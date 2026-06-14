from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import select
from datetime import datetime, timedelta
from jose import jwt
from db import get_session
from models import Usuario, LoginRequest
from utils.security import hash_password, verify_password
import os

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()
SECRET_KEY = os.getenv("SECRET_KEY", "secret")

def crear_token(usuario_id: int):
    exp = datetime.utcnow() + timedelta(days=7)
    return jwt.encode({"sub": usuario_id, "exp": exp}, SECRET_KEY, algorithm="HS256")

def obtener_usuario_actual(token: str = Depends(security), session=Depends(get_session)):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=["HS256"])
        usuario = session.get(Usuario, int(payload["sub"]))
        if not usuario:
            raise HTTPException(401, "Usuario no encontrado")
        return usuario
    except:
        raise HTTPException(401, "Token inválido")

@router.post("/login")
def login(data: LoginRequest, session=Depends(get_session)):
    usuario = session.exec(select(Usuario).where(Usuario.email == data.email)).first()
    if not usuario or not verify_password(data.password, usuario.password_hash):
        raise HTTPException(401, "Credenciales inválidas")
    
    token = crear_token(usuario.id)
    return {"token": token, "usuario_id": usuario.id, "username": usuario.username}