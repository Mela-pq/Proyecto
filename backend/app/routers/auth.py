from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import select
from jose import jwt
from ..db import get_session
from ..models import Usuario, LoginRequest
from ..utils.security import verify_password
import os
from datetime import datetime, timedelta

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()
SECRET_KEY = os.getenv("SECRET_KEY", "mi-clave-secreta-pinterest-2026")

def crear_token(usuario_id: int, username: str) -> str:
    """Crear token JWT con subject como string"""
    exp = datetime.utcnow() + timedelta(days=7)
    # Asegurar que sub es un string
    payload = {
        "sub": str(usuario_id),  # ← Convertir a string OBLIGATORIO
        "username": username,
        "exp": exp
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def obtener_usuario_actual(
    credentials: HTTPAuthorizationCredentials = Depends(security), 
    session=Depends(get_session)
):
    try:
        token = credentials.credentials
        print(f"🔐 Token recibido: {token[:50]}...")
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        print(f"🔐 Payload decodificado: {payload}")
        
        usuario_id = payload.get("sub")
        if not usuario_id:
            raise HTTPException(401, "Token inválido: no contiene sub")
        
        # Convertir a int para la consulta
        usuario = session.get(Usuario, int(usuario_id))
        if not usuario:
            raise HTTPException(401, "Usuario no encontrado")
        
        return usuario
    except jwt.ExpiredSignatureError:
        print("❌ Token expirado")
        raise HTTPException(401, "Token expirado")
    except jwt.JWTError as e:
        print(f"❌ Error decodificando token: {e}")
        raise HTTPException(401, f"Token inválido: {str(e)}")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        raise HTTPException(401, f"Error de autenticación: {str(e)}")

@router.post("/login")
def login(data: LoginRequest, session=Depends(get_session)):
    usuario = session.exec(select(Usuario).where(Usuario.email == data.email)).first()
    if not usuario or not verify_password(data.password, usuario.password_hash):
        raise HTTPException(401, "Credenciales inválidas")
    
    token = crear_token(usuario.id, usuario.username)
    print(f"✅ Token creado para usuario {usuario.username} (ID: {usuario.id})")
    return {"token": token, "usuario_id": usuario.id, "username": usuario.username}