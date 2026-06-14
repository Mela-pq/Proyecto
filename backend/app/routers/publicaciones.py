from fastapi import APIRouter, HTTPException, Depends, Query
from sqlmodel import select, func
from db import get_session
from models import Publicacion, PublicacionCreate, Like, Comentario, Guardado
from routers.auth import obtener_usuario_actual

router = APIRouter(prefix="/publicaciones", tags=["publicaciones"])

@router.post("/", status_code=201)
def crear_publicacion(
    pub_data: PublicacionCreate,
    imagen_url: str,
    usuario=Depends(obtener_usuario_actual),
    session=Depends(get_session)
):
    nueva = Publicacion(
        **pub_data.dict(),
        imagen_url=imagen_url,
        usuario_id=usuario.id
    )
    session.add(nueva)
    session.commit()
    session.refresh(nueva)
    return {"id": nueva.id, "imagen_url": nueva.imagen_url, "titulo": nueva.titulo}

@router.get("/")
def listar_publicaciones(
    session=Depends(get_session),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    search: str = None,
    usuario_id: int = None
):
    query = select(Publicacion).order_by(Publicacion.fecha.desc())
    
    if search:
        query = query.where(
            (Publicacion.titulo.contains(search)) |
            (Publicacion.descripcion.contains(search)) |
            (Publicacion.tags.contains(search))
        )
    if usuario_id:
        query = query.where(Publicacion.usuario_id == usuario_id)
    
    publicaciones = session.exec(query.offset(offset).limit(limit)).all()
    
    resultado = []
    for pub in publicaciones:
        likes = session.exec(select(func.count(Like.id)).where(Like.publicacion_id == pub.id)).one()
        comentarios = session.exec(select(func.count(Comentario.id)).where(Comentario.publicacion_id == pub.id)).one()
        
        resultado.append({
            "id": pub.id,
            "imagen_url": pub.imagen_url,
            "titulo": pub.titulo,
            "descripcion": pub.descripcion,
            "categoria": pub.categoria,
            "tags": pub.tags,
            "usuario_id": pub.usuario_id,
            "fecha": pub.fecha,
            "likes": likes,
            "comentarios": comentarios
        })
    
    return resultado

@router.get("/{pub_id}")
def obtener_publicacion(pub_id: int, session=Depends(get_session)):
    pub = session.get(Publicacion, pub_id)
    if not pub:
        raise HTTPException(404, "No encontrada")
    
    likes = session.exec(select(func.count(Like.id)).where(Like.publicacion_id == pub.id)).one()
    comentarios = session.exec(select(func.count(Comentario.id)).where(Comentario.publicacion_id == pub.id)).one()
    
    return {
        "id": pub.id,
        "imagen_url": pub.imagen_url,
        "titulo": pub.titulo,
        "descripcion": pub.descripcion,
        "usuario_id": pub.usuario_id,
        "fecha": pub.fecha,
        "likes": likes,
        "comentarios": comentarios
    }