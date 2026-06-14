from fastapi import APIRouter, Depends
from sqlmodel import select
from db import get_session
from models import Guardado
from routers.auth import obtener_usuario_actual

router = APIRouter(prefix="/guardados", tags=["guardados"])

@router.post("/publicacion/{pub_id}")
def toggle_guardado(pub_id: int, usuario=Depends(obtener_usuario_actual), session=Depends(get_session)):
    existe = session.exec(
        select(Guardado).where(
            (Guardado.publicacion_id == pub_id) & (Guardado.usuario_id == usuario.id)
        )
    ).first()
    
    if existe:
        session.delete(existe)
        session.commit()
        return {"saved": False}
    else:
        nuevo = Guardado(usuario_id=usuario.id, publicacion_id=pub_id)
        session.add(nuevo)
        session.commit()
        return {"saved": True}

@router.get("/mis-guardados")
def mis_guardados(usuario=Depends(obtener_usuario_actual), session=Depends(get_session)):
    guardados = session.exec(
        select(Guardado).where(Guardado.usuario_id == usuario.id)
    ).all()
    return [{"publicacion_id": g.publicacion_id} for g in guardados]