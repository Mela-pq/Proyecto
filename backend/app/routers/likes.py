from fastapi import APIRouter, Depends
from sqlmodel import select
from ..db import get_session
from ..models import Like
from .auth import obtener_usuario_actual

router = APIRouter(prefix="/likes", tags=["likes"])

@router.post("/publicacion/{pub_id}")
def toggle_like(pub_id: int, usuario=Depends(obtener_usuario_actual), session=Depends(get_session)):
    existe = session.exec(
        select(Like).where(
            (Like.publicacion_id == pub_id) & (Like.usuario_id == usuario.id)
        )
    ).first()
    
    if existe:
        session.delete(existe)
        session.commit()
        return {"liked": False}
    else:
        nuevo = Like(usuario_id=usuario.id, publicacion_id=pub_id)
        session.add(nuevo)
        session.commit()
        return {"liked": True}