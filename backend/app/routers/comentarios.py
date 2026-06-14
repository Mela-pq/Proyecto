from fastapi import APIRouter, Depends
from db import get_session
from models import Comentario, ComentarioCreate
from routers.auth import obtener_usuario_actual

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
    return {"id": comentario.id, "contenido": comentario.contenido, "usuario_id": usuario.id}

@router.get("/publicacion/{pub_id}")
def listar_comentarios(pub_id: int, session=Depends(get_session)):
    from sqlmodel import select
    comentarios = session.exec(
        select(Comentario).where(Comentario.publicacion_id == pub_id)
        .order_by(Comentario.fecha.desc())
    ).all()
    return [{"id": c.id, "contenido": c.contenido, "usuario_id": c.usuario_id, "fecha": c.fecha} for c in comentarios]