from fastapi import APIRouter, Depends
from sqlmodel import select
from ..db import get_session
from ..models import Comentario, ComentarioCreate, Usuario
from .auth import obtener_usuario_actual

router = APIRouter(prefix="/comentarios", tags=["comentarios"])

@router.post("/publicacion/{pub_id}", status_code=201)
def comentar(
    pub_id: int,
    data: ComentarioCreate,
    usuario=Depends(obtener_usuario_actual),
    session=Depends(get_session)
):
    comentario = Comentario(
        contenido=data.contenido,
        usuario_id=usuario.id,
        publicacion_id=pub_id
    )
    session.add(comentario)
    session.commit()
    session.refresh(comentario)
    
    return {
        "id": comentario.id, 
        "contenido": comentario.contenido, 
        "usuario_id": usuario.id,
        "usuario": {
            "username": usuario.username,
            "avatar_url": usuario.avatar_url
        },
        "fecha": comentario.fecha
    }

@router.get("/publicacion/{pub_id}")
def listar_comentarios(pub_id: int, session=Depends(get_session)):
    comentarios = session.exec(
        select(Comentario).where(Comentario.publicacion_id == pub_id)
        .order_by(Comentario.fecha.desc())
    ).all()
    
    resultado = []
    for c in comentarios:
        usuario = session.get(Usuario, c.usuario_id)
        resultado.append({
            "id": c.id, 
            "contenido": c.contenido, 
            "usuario_id": c.usuario_id,
            "usuario": {
                "username": usuario.username if usuario else f"Usuario {c.usuario_id}",
                "avatar_url": usuario.avatar_url if usuario else None
            } if usuario else None,
            "fecha": c.fecha
        })
    
    return resultado