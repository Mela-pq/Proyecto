import { useState, useEffect } from 'react';
import PinCard from './PinCard';
import { getPublicaciones } from '../services/api';
import toast from 'react-hot-toast';

function Gallery({ onOpenPin }) {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const cargarPublicaciones = async () => {
    try {
      setLoading(true);
      const data = await getPublicaciones('', 30, 0);
      setPins(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar las imágenes');
    } finally {
      setLoading(false);
    }
  };

  const handlePinClick = (pin) => {
    const pinCompleto = {
      id: pin.id,
      imagen_url: pin.imagen_url,
      titulo: pin.titulo || 'Sin título',
      descripcion: pin.descripcion || 'Sin descripción',
      usuario_id: pin.usuario_id,
      usuario: pin.usuario || { username: 'Usuario', avatar_url: null },
      likes: pin.likes || 0,
      comentarios: pin.comentarios || 0
    };
    const related = pins.filter(p => p.id !== pin.id);
    onOpenPin(pinCompleto, related);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">Cargando inspiración para ti...</p>
      </div>
    );
  }

  if (pins.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">No hay publicaciones aún</p>
      </div>
    );
  }

  return (
    <div className="masonry-grid">
      {pins.map((pin) => (
        <div key={pin.id} onClick={() => handlePinClick(pin)} className="cursor-pointer masonry-item">
          <PinCard 
            id={pin.id}
            imageUrl={pin.imagen_url}
            title={pin.titulo}
            author={pin.usuario?.username || `Usuario ${pin.usuario_id}`}
            authorAvatar={pin.usuario?.avatar_url || 'https://cdn-icons-png.flaticon.com/128/6676/6676016.png'}
            likes={pin.likes || 0}
            saves={0}
          />
        </div>
      ))}
    </div>
  );
}

export default Gallery;