import boto3
import os
from fastapi import UploadFile, HTTPException

def get_s3_client():
    return boto3.client(
        "s3",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=os.getenv("AWS_REGION", "us-east-1")
    )

async def subir_imagen(archivo: UploadFile, carpeta: str = "publicaciones") -> str:
    bucket = os.getenv("AWS_BUCKET_NAME")
    if not bucket:
        raise HTTPException(500, "AWS no configurado")
    
    # Generar nombre único
    import uuid
    ext = archivo.filename.split(".")[-1]
    key = f"{carpeta}/{uuid.uuid4()}.{ext}"
    
    # Subir a S3
    s3 = get_s3_client()
    contenido = await archivo.read()
    s3.put_object(
        Bucket=bucket,
        Key=key,
        Body=contenido,
        ContentType=archivo.content_type,
        ACL="public-read"
    )
    
    return f"https://{bucket}.s3.amazonaws.com/{key}"