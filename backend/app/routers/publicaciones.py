from fastapi import APIRouter, HTTPException, Depends, Query
from sqlmodel import select, func
from ..db import get_session
from ..models import Publicacion, PublicacionCreate, Like, Comentario, Guardado, Usuario
from .auth import obtener_usuario_actual

router = APIRouter(prefix="/publicaciones", tags=["publicaciones"])

@router.post("/", status_code=201)
def crear_publicacion(
    imagen_url: str,
    titulo: str = None,
    descripcion: str = None,
    categoria: str = "general",
    tags: str = None,
    usuario=Depends(obtener_usuario_actual),
    session=Depends(get_session)
):
    nueva = Publicacion(
        titulo=titulo,
        descripcion=descripcion,
        categoria=categoria,
        tags=tags,
        imagen_url=imagen_url,
        usuario_id=usuario.id
    )
    session.add(nueva)
    session.commit()
    session.refresh(nueva)
    
    return {
        "id": nueva.id,
        "imagen_url": nueva.imagen_url,
        "titulo": nueva.titulo,
        "descripcion": nueva.descripcion,
        "categoria": nueva.categoria,
        "tags": nueva.tags,
        "usuario_id": nueva.usuario_id,
        "fecha": nueva.fecha
    }

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
        
        usuario = session.get(Usuario, pub.usuario_id)
        
        resultado.append({
            "id": pub.id,
            "imagen_url": pub.imagen_url,
            "titulo": pub.titulo,
            "descripcion": pub.descripcion,
            "categoria": pub.categoria,
            "tags": pub.tags,
            "usuario_id": pub.usuario_id,
            "usuario": {
                "username": usuario.username if usuario else f"Usuario {pub.usuario_id}",
                "avatar_url": usuario.avatar_url if usuario else None
            } if usuario else None,
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