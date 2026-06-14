import random
import uuid
import os
from faker import Faker
from sqlmodel import Session, select
from app.db import engine
from app.models import Usuario, Publicacion, Like, Comentario, Guardado
from app.utils.security import hash_password
import boto3
from dotenv import load_dotenv

load_dotenv()

fake = Faker('es_ES')

# Configuración AWS
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION", "us-east-1")
)
BUCKET = os.getenv("AWS_BUCKET_NAME")

# =============================================================
# Usar imágenes locales de la carpeta Oufits
# =============================================================
RUTA_IMAGENES_LOCAL = r"C:\Users\Josue\Proyecto\backend\temp_images\Oufits"  # ← Sin 'S' al final

def obtener_imagenes_locales():
    """Lee las imágenes locales (1.jpg, 2.jpg, ..., 61.jpg)"""
    imagenes = []
    for i in range(1, 62):  # Del 1 al 61
        # Probar diferentes extensiones por si acaso
        for ext in ['.jpg', '.jpeg', '.png', '.webp']:
            ruta = os.path.join(RUTA_IMAGENES_LOCAL, f"{i}{ext}")
            if os.path.exists(ruta):
                imagenes.append(ruta)
                break
    print(f"   📁 Encontradas {len(imagenes)} imágenes locales")
    return imagenes

# Cargar todas las imágenes locales al inicio
IMAGENES_LOCALES = obtener_imagenes_locales()

# -------------------------------------------------------------
# Función para subir imagen LOCAL a S3
# -------------------------------------------------------------
def subir_imagen_local_a_s3(ruta_local, categoria, user_id):
    try:
        # Obtener extensión del archivo
        extension = ruta_local.split('.')[-1]
        nombre_archivo = f"publicaciones/{categoria}/usuario_{user_id}/{uuid.uuid4()}.{extension}"
        
        # Leer el archivo local
        with open(ruta_local, 'rb') as archivo:
            contenido = archivo.read()
        
        # Subir a S3
        s3.put_object(
            Bucket=BUCKET,
            Key=nombre_archivo,
            Body=contenido,
            ContentType=f"image/{extension}",
            ACL="public-read"
        )
        return f"https://{BUCKET}.s3.amazonaws.com/{nombre_archivo}"
    except Exception as e:
        print(f"   ❌ Error subiendo imagen {ruta_local}: {e}")
        return None

# -------------------------------------------------------------
# 1. Crear Usuarios
# -------------------------------------------------------------
def crear_usuarios(cantidad=30):
    usuarios = []
    with Session(engine) as session:
        for i in range(cantidad):
            username = fake.user_name() + str(random.randint(100, 9999))
            email = fake.email()
            password = "12345678"
            
            existe = session.exec(select(Usuario).where(Usuario.email == email)).first()
            if existe:
                continue
            
            usuario = Usuario(
                email=email,
                username=username,
                password_hash=hash_password(password),
                avatar_url=f"https://randomuser.me/api/portraits/{random.choice(['men', 'women'])}/{random.randint(1, 99)}.jpg"
            )
            session.add(usuario)
            session.commit()
            session.refresh(usuario)
            
            usuarios.append((usuario.id, usuario.username))
            if (i + 1) % 10 == 0:
                print(f"   ✅ {i + 1}/{cantidad} usuarios creados...")
    return usuarios

# -------------------------------------------------------------
# 2. Crear Publicaciones (usando imágenes locales)
# -------------------------------------------------------------
def crear_publicaciones(usuarios, publicaciones_por_usuario=3):
    if not IMAGENES_LOCALES:
        print("   ❌ No se encontraron imágenes locales en la carpeta Oufits")
        return []
    
    publicaciones_ids = []
    contador_imagenes = 0
    
    for user_id, username in usuarios:
        with Session(engine) as session:
            num_pubs = random.randint(2, publicaciones_por_usuario)
            
            for _ in range(num_pubs):
                # Seleccionar imagen local (cíclicamente)
                if contador_imagenes >= len(IMAGENES_LOCALES):
                    contador_imagenes = 0  # Reiniciar si se acaban
                
                ruta_imagen = IMAGENES_LOCALES[contador_imagenes]
                contador_imagenes += 1
                
                categoria = "outfits"
                
                print(f"   📤 Subiendo: {os.path.basename(ruta_imagen)} para {username}")
                imagen_url = subir_imagen_local_a_s3(ruta_imagen, categoria, user_id)
                
                if not imagen_url:
                    continue
                
                titulo = f"{fake.word().capitalize()} {fake.word().capitalize()}"
                descripcion = fake.sentence()
                tags = f"outfits, moda, estilo, {random.choice(['casual', 'elegante', 'urbano'])}"
                
                publicacion = Publicacion(
                    titulo=titulo,
                    descripcion=descripcion,
                    categoria=categoria,
                    tags=tags,
                    imagen_url=imagen_url,
                    usuario_id=user_id
                )
                session.add(publicacion)
                session.commit()
                session.refresh(publicacion)
                
                publicaciones_ids.append(publicacion.id)
                print(f"   ✅ Publicación ID: {publicacion.id}")
    
    print(f"   📊 Total de publicaciones: {len(publicaciones_ids)}")
    return publicaciones_ids

# -------------------------------------------------------------
# 3. Crear Likes
# -------------------------------------------------------------
def crear_likes(usuarios, publicaciones_ids):
    if not publicaciones_ids:
        print("   ⚠️ No hay publicaciones para dar likes.")
        return
    
    like_count = 0
    total_publicaciones = len(publicaciones_ids)
    
    for user_id, username in usuarios:
        with Session(engine) as session:
            num_likes = random.randint(5, min(20, total_publicaciones))
            pubs_ids_para_like = random.sample(publicaciones_ids, num_likes)
            
            for pub_id in pubs_ids_para_like:
                existe = session.exec(select(Like).where(
                    (Like.usuario_id == user_id) & (Like.publicacion_id == pub_id)
                )).first()
                
                if not existe:
                    like = Like(usuario_id=user_id, publicacion_id=pub_id)
                    session.add(like)
                    like_count += 1
            session.commit()
    
    print(f"   ✅ Likes creados: {like_count}")

# -------------------------------------------------------------
# 4. Crear Guardados
# -------------------------------------------------------------
def crear_guardados(usuarios, publicaciones_ids):
    if not publicaciones_ids:
        print("   ⚠️ No hay publicaciones para guardar.")
        return
    
    guardado_count = 0
    total_publicaciones = len(publicaciones_ids)
    
    for user_id, username in usuarios:
        with Session(engine) as session:
            num_guardados = random.randint(3, min(15, total_publicaciones))
            pubs_ids_para_guardar = random.sample(publicaciones_ids, num_guardados)
            
            for pub_id in pubs_ids_para_guardar:
                existe = session.exec(select(Guardado).where(
                    (Guardado.usuario_id == user_id) & (Guardado.publicacion_id == pub_id)
                )).first()
                
                if not existe:
                    guardado = Guardado(usuario_id=user_id, publicacion_id=pub_id)
                    session.add(guardado)
                    guardado_count += 1
            session.commit()
    
    print(f"   ✅ Guardados creados: {guardado_count}")

# -------------------------------------------------------------
# 5. Crear Comentarios
# -------------------------------------------------------------
def crear_comentarios(usuarios, publicaciones_ids):
    comentarios_textos = [
        "¡Qué outfit tan increíble! Me encanta 😍",
        "Muy buen estilo, gracias por compartir",
        "Me encanta esa combinación de colores",
        "¡Me encanta! Voy a guardarlo para inspirarme",
        "Excelente outfit, sigue así",
        "¿Dónde conseguiste esa prenda?",
        "Me encanta tu estilo 😊",
        "¡Qué original! Me gusta mucho",
    ]
    
    if not publicaciones_ids:
        print("   ⚠️ No hay publicaciones para comentar.")
        return
    
    comentario_count = 0
    total_publicaciones = len(publicaciones_ids)
    
    for user_id, username in usuarios:
        with Session(engine) as session:
            num_comentarios = random.randint(2, 5)
            pubs_ids_para_comentar = random.sample(
                publicaciones_ids, 
                min(num_comentarios, total_publicaciones)
            )
            
            for pub_id in pubs_ids_para_comentar:
                comentario = Comentario(
                    contenido=random.choice(comentarios_textos),
                    usuario_id=user_id,
                    publicacion_id=pub_id
                )
                session.add(comentario)
                comentario_count += 1
            session.commit()
    
    print(f"   ✅ Comentarios creados: {comentario_count}")

# -------------------------------------------------------------
# MAIN
# -------------------------------------------------------------
def main():
    print("=" * 60)
    print("🌱 SEED DE DATOS CON IMÁGENES LOCALES (Oufits)")
    print("=" * 60)
    
    # Verificar bucket
    if not BUCKET:
        print("❌ ERROR: AWS_BUCKET_NAME no está configurado en .env")
        return
    print(f"📦 Usando bucket: {BUCKET}")
    
    # Verificar que existan imágenes locales
    if not IMAGENES_LOCALES:
        print(f"❌ ERROR: No se encontraron imágenes en {RUTA_IMAGENES_LOCAL}")
        print("   Asegúrate de que la carpeta exista y contenga imágenes 1.jpg a 61.jpg")
        return
    print(f"🖼️  Usando {len(IMAGENES_LOCALES)} imágenes locales de Oufits")
    
    # 1. Crear usuarios
    print("\n📝 Creando usuarios de prueba...")
    usuarios = crear_usuarios(cantidad=30)
    
    if not usuarios:
        print("❌ No se pudieron crear usuarios")
        return
    
    # 2. Crear publicaciones (retorna lista de IDs)
    print("\n📷 Creando publicaciones (subiendo imágenes locales a S3)...")
    publicaciones_ids = crear_publicaciones(usuarios, publicaciones_por_usuario=3)
    
    if not publicaciones_ids:
        print("❌ No se pudieron crear publicaciones")
        return
    
    # 3. Likes
    print("\n❤️ Creando likes...")
    crear_likes(usuarios, publicaciones_ids)
    
    # 4. Guardados
    print("\n📌 Creando guardados...")
    crear_guardados(usuarios, publicaciones_ids)
    
    # 5. Comentarios
    print("\n💬 Creando comentarios...")
    crear_comentarios(usuarios, publicaciones_ids)
    
    print("\n" + "=" * 60)
    print(f"✅ SEED COMPLETADO CORRECTAMENTE")
    print(f"   - Usuarios creados: {len(usuarios)}")
    print(f"   - Publicaciones creadas: {len(publicaciones_ids)}")
    print(f"   - Imágenes subidas desde: {RUTA_IMAGENES_LOCAL}")  # ← Corregido: sin 'S'
    print(f"   - Bucket S3: {BUCKET}")
    print(f"   - Contraseña para todos: 12345678")
    print("=" * 60)

if __name__ == "__main__":
    main()