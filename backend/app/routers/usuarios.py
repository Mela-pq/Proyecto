from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select
from ..db import get_session
from ..models import Usuario, UsuarioCreate
from ..utils.security import hash_password

router = APIRouter(prefix="/usuarios", tags=["usuarios"])

@router.post("/registro", status_code=201)
def registrar(data: UsuarioCreate, session=Depends(get_session)):
    existe = session.exec(
        select(Usuario).where(
            (Usuario.email == data.email) | (Usuario.username == data.username)
        )
    ).first()
    
    if existe:
        raise HTTPException(400, "Email o username ya existe")
    
    usuario = Usuario(
        email=data.email,
        username=data.username,
        password_hash=hash_password(data.password),
        fecha_nacimiento=data.fecha_nacimiento
    )
    session.add(usuario)
    session.commit()
    session.refresh(usuario)
    
    return {"id": usuario.id, "email": usuario.email, "username": usuario.username}

@router.get("/{usuario_id}")
def get_usuario(usuario_id: int, session=Depends(get_session)):
    usuario = session.get(Usuario, usuario_id)
    if not usuario:
        raise HTTPException(404, "Usuario no encontrado")
    return {"id": usuario.id, "username": usuario.username, "email": usuario.email}