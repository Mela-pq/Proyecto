from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime
from typing import Optional, List

class Usuario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    username: str = Field(unique=True, index=True)
    password_hash: str
    avatar_url: Optional[str] = None
    fecha_nacimiento: Optional[str] = None
    fecha_registro: datetime = Field(default_factory=datetime.now)
    
    publicaciones: List["Publicacion"] = Relationship(back_populates="usuario")
    comentarios: List["Comentario"] = Relationship(back_populates="usuario")
    likes: List["Like"] = Relationship(back_populates="usuario")
    guardados: List["Guardado"] = Relationship(back_populates="usuario")

class Publicacion(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    imagen_url: str
    titulo: Optional[str] = None
    descripcion: Optional[str] = None
    categoria: str = "general"
    tags: Optional[str] = None
    usuario_id: int = Field(foreign_key="usuario.id")
    fecha: datetime = Field(default_factory=datetime.now)
    
    usuario: Optional[Usuario] = Relationship(back_populates="publicaciones")
    comentarios: List["Comentario"] = Relationship(back_populates="publicacion")
    likes: List["Like"] = Relationship(back_populates="publicacion")
    guardados: List["Guardado"] = Relationship(back_populates="publicacion")

class Comentario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    contenido: str
    usuario_id: int = Field(foreign_key="usuario.id")
    publicacion_id: int = Field(foreign_key="publicacion.id")
    fecha: datetime = Field(default_factory=datetime.now)
    
    usuario: Optional[Usuario] = Relationship(back_populates="comentarios")
    publicacion: Optional[Publicacion] = Relationship(back_populates="comentarios")

class Like(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    usuario_id: int = Field(foreign_key="usuario.id")
    publicacion_id: int = Field(foreign_key="publicacion.id")
    
    usuario: Optional[Usuario] = Relationship(back_populates="likes")
    publicacion: Optional[Publicacion] = Relationship(back_populates="likes")

class Guardado(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    usuario_id: int = Field(foreign_key="usuario.id")
    publicacion_id: int = Field(foreign_key="publicacion.id")
    
    usuario: Optional[Usuario] = Relationship(back_populates="guardados")
    publicacion: Optional[Publicacion] = Relationship(back_populates="guardados")

# Schemas (para validación)
class UsuarioCreate(SQLModel):
    email: str
    username: str
    password: str
    fecha_nacimiento: Optional[str] = None

class LoginRequest(SQLModel):
    email: str
    password: str

class PublicacionCreate(SQLModel):
    titulo: Optional[str] = None
    descripcion: Optional[str] = None
    categoria: str = "general"
    tags: Optional[str] = None

class ComentarioCreate(SQLModel):
    contenido: str