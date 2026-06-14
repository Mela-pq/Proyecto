from fastapi import APIRouter, UploadFile, File, Depends
from routers.auth import obtener_usuario_actual
from utils.s3 import subir_imagen

router = APIRouter(prefix="/upload", tags=["upload"])

@router.post("/imagen")
async def subir_imagen_endpoint(
    archivo: UploadFile = File(...),
    usuario=Depends(obtener_usuario_actual)
):
    url = await subir_imagen(archivo, f"usuarios/{usuario.id}")
    return {"url": url}