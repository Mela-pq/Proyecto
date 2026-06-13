import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Subir() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const subirPublicacion = async (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
      setMensaje("Debes iniciar sesión para subir una publicación.");
      return;
    }

    if (!imagen) {
      setMensaje("Debes seleccionar una imagen.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("imagen", imagen);

      const respuestaImagen = await fetch(`${API_URL}/upload/imagen`, {
        method: "POST",
        body: formData,
      });

      if (!respuestaImagen.ok) {
        setMensaje("Error al subir la imagen.");
        return;
      }

      const dataImagen = await respuestaImagen.json();

      const publicacion = {
        titulo: titulo,
        descripcion: descripcion,
        categoria: categoria,
        imagen_url: dataImagen.url,
        usuario_id: usuario.id,
      };

      const respuestaPublicacion = await fetch(`${API_URL}/publicaciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(publicacion),
      });

      if (respuestaPublicacion.ok) {
        setMensaje("Publicación subida con éxito.");
        setTitulo("");
        setDescripcion("");
        setCategoria("");
        setImagen(null);
      } else {
        setMensaje("Error al crear la publicación.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con la API.");
    }
  };

  return (
    <div className="subir-container">
      <h2>Subir Publicación</h2>

      <form onSubmit={subirPublicacion}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="tecnologia">Tecnología</option>
            <option value="deportes">Deportes</option>
            <option value="cultura">Cultura</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
            required
          />
        </div>

        <button type="submit">Subir Publicación</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Subir;