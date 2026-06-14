import { useState, useEffect } from 'react';
import { FaHeart, FaComment, FaSave, FaShare, FaEllipsisH, FaTimes, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

function PinModal({ pin, onClose, onNextPin, relatedPins }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(pin.likes || 80);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: "ayesha0302", text: "Where light is most forever, Time Lingers as a shadow.", avatar: "https://picsum.photos/id/64/40/40" }
  ]);

  // Evitar scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
      toast.success('¡Te gusta esta publicación!');
    } else {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
      toast('Quitaste el like');
    }
  };

  const handleSave = () => {
    if (!isSaved) {
      setIsSaved(true);
      toast.success('¡Guardado en tu perfil!');
    } else {
      setIsSaved(false);
      toast('Eliminado de guardados');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `/pin/${pin.id}`);
    toast.success('¡Enlace copiado!');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          user: "usuario_actual",
          text: comment,
          avatar: "https://cdn-icons-png.flaticon.com/128/6676/6676016.png"
        }
      ]);
      setComment('');
      toast.success('Comentario agregado');
    }
  };

  return (
    <section className="fixed inset-0 bg-black z-[1200] flex flex-col">
      
      {/* Header con botón cerrar */}
      <header className="bg-black/90 p-4 flex justify-between items-center">
        <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
          <FaTimes className="text-2xl" />
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className={`px-5 py-2 rounded-full font-semibold transition-colors ${
              isSaved ? 'bg-gray-600 text-white' : 'bg-[#e60023] text-white hover:bg-red-700'
            }`}
          >
            {isSaved ? 'Guardado ✓' : 'Guardar'}
          </button>
        </div>
      </header>

      {/* Contenido principal del modal */}
      <article className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* COLUMNA IZQUIERDA - Imagen grande */}
        <figure className="lg:w-3/5 bg-black flex justify-center items-center p-8 min-h-0 overflow-auto">
          <img 
            src={pin.imageUrl} 
            alt={pin.title}
            className="max-w-full max-h-full object-contain rounded-2xl"
          />
        </figure>

        {/* COLUMNA DERECHA - Información y comentarios */}
        <section className="lg:w-2/5 bg-white flex flex-col overflow-hidden">
          
          {/* Perfil del autor */}
          <header className="flex justify-between items-center p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img 
                src={pin.authorAvatar || 'https://cdn-icons-png.flaticon.com/128/6676/6676016.png'} 
                alt={pin.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{pin.author}</p>
                <p className="text-xs text-gray-500">80 seguidores</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaEllipsisH className="text-gray-700" />
            </button>
          </header>

          {/* Título y descripción */}
          <section className="p-4 border-b border-gray-100">
            <h1 className="text-xl font-semibold text-gray-900 mb-1">{pin.title || 'Sin título'}</h1>
            <p className="text-gray-600">{pin.description || 'Sin descripción'}</p>
          </section>

          {/* Acciones: likes, comentarios, compartir */}
          <nav className="flex items-center gap-6 p-4 border-b border-gray-100">
            <button onClick={handleLike} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full">
              <FaHeart className={`text-xl ${isLiked ? 'text-red-600' : 'text-gray-700'}`} />
              <span className="font-semibold">{likesCount}</span>
            </button>
            <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full">
              <FaComment className="text-xl text-gray-700" />
              <span className="font-semibold">{comments.length}</span>
            </button>
            <button onClick={handleShare} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full">
              <FaShare className="text-xl text-gray-700" />
            </button>
          </nav>

          {/* Comentarios (scrollable) */}
          <section className="flex-1 p-4 overflow-y-auto min-h-0">
            <h3 className="font-semibold text-gray-900 mb-4">Comentarios</h3>
            <ul className="space-y-4">
              {comments.map((c) => (
                <li key={c.id} className="flex gap-3">
                  <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{c.user}</p>
                    <p className="text-sm text-gray-600">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Input comentario */}
          <footer className="p-4 border-t border-gray-100">
            <form onSubmit={handleAddComment} className="flex gap-3">
              <img src="https://cdn-icons-png.flaticon.com/128/6676/6676016.png" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Agregar un comentario"
                  className="w-full bg-gray-100 rounded-full py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#e60023] font-semibold text-sm">
                  Publicar
                </button>
              </div>
            </form>
          </footer>

        </section>
      </article>

      {/* SECCIÓN DE IMÁGENES RELACIONADAS (debajo del modal) */}
      {relatedPins && relatedPins.length > 0 && (
        <footer className="bg-white border-t border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Más ideas que podrían gustarte</h3>
          <ul className="flex gap-3 overflow-x-auto pb-2">
            {relatedPins.map((related) => (
              <li key={related.id} className="flex-shrink-0 w-24">
                <button onClick={() => onNextPin(related)} className="block w-full">
                  <figure className="rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity">
                    <img src={related.imageUrl} alt={related.title} className="w-full aspect-square object-cover" />
                    <figcaption className="p-1 text-xs font-medium text-gray-700 truncate">{related.title}</figcaption>
                  </figure>
                </button>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </section>
  );
}

export default PinModal;