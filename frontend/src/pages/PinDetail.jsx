import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaComment, FaSave, FaShare, FaEllipsisH, FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

function PinDetail() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(80);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: "ayesha0302", text: "Where light is most forever, Time Lingers as a shadow.", avatar: "https://picsum.photos/id/64/40/40" }
  ]);

  // Datos de ejemplo del pin
  const pin = {
    id: id,
    imageUrl: 'https://picsum.photos/id/1/600/800',
    author: 'ayesha0302',
    authorAvatar: 'https://picsum.photos/id/64/50/50',
    title: 'Where light is most forever',
    description: 'Time Lingers as a shadow.'
  };

  // Imágenes relacionadas (para la sección lateral)
  const relatedPins = [
    { id: 2, imageUrl: 'https://picsum.photos/id/15/200/250', title: 'Dibujos a lápiz' },
    { id: 3, imageUrl: 'https://picsum.photos/id/104/200/280', title: 'Arte digital' },
    { id: 4, imageUrl: 'https://picsum.photos/id/22/200/260', title: 'Ilustraciones' },
    { id: 5, imageUrl: 'https://picsum.photos/id/30/200/270', title: 'Paisajes' },
  ];

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
    navigator.clipboard.writeText(window.location.href);
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
    <main className="min-h-screen bg-white pt-20">
      {/* Contenedor principal del modal */}
      <section className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden my-8">
        
        {/* Botón cerrar/volver */}
        <header className="p-4 border-b border-gray-100">
          <Link to="/home" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <FaArrowLeft />
            <span>Volver</span>
          </Link>
        </header>

        {/* Contenido principal: imagen + info */}
        <article className="flex flex-col lg:flex-row">
          
          {/* COLUMNA IZQUIERDA - Imagen grande */}
          <figure className="lg:w-3/5 bg-gray-100 flex justify-center items-center p-4">
            <img 
              src={pin.imageUrl} 
              alt={pin.title}
              className="w-full h-auto rounded-2xl object-contain max-h-[70vh]"
            />
          </figure>

          {/* COLUMNA DERECHA - Información y acciones */}
          <section className="lg:w-2/5 flex flex-col">
            
            {/* Header con acciones */}
            <header className="flex justify-between items-center p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img 
                  src={pin.authorAvatar} 
                  alt={pin.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{pin.author}</p>
                  <p className="text-xs text-gray-500">80 seguidores</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <FaEllipsisH className="text-gray-700" />
                </button>
                <button
                  onClick={handleSave}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    isSaved ? 'bg-gray-800 text-white' : 'bg-[#e60023] text-white hover:bg-red-700'
                  }`}
                >
                  {isSaved ? 'Guardado ✓' : 'Guardar'}
                </button>
              </div>
            </header>

            {/* Título y descripción */}
            <section className="p-4 border-b border-gray-100">
              <h1 className="text-xl font-semibold text-gray-900 mb-1">{pin.title}</h1>
              <p className="text-gray-600">{pin.description}</p>
            </section>

            {/* Acciones (likes, comentarios, compartir) */}
            <section className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-6">
                <button 
                  onClick={handleLike}
                  className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                >
                  <FaHeart className={`text-xl ${isLiked ? 'text-red-600' : 'text-gray-700'}`} />
                  <span className="font-semibold">{likesCount}</span>
                </button>
                <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors">
                  <FaComment className="text-xl text-gray-700" />
                  <span className="font-semibold">{comments.length}</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                >
                  <FaShare className="text-xl text-gray-700" />
                </button>
              </div>
            </section>

            {/* Sección de comentarios */}
            <section className="flex-1 p-4 overflow-y-auto max-h-[300px]">
              <h3 className="font-semibold text-gray-900 mb-4">Comentarios</h3>
              
              <ul className="space-y-4">
                {comments.map((c) => (
                  <li key={c.id} className="flex gap-3">
                    <img 
                      src={c.avatar} 
                      alt={c.user}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{c.user}</p>
                      <p className="text-sm text-gray-600">{c.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Formulario para agregar comentario */}
            <footer className="p-4 border-t border-gray-100">
              <form onSubmit={handleAddComment} className="flex gap-3">
                <img 
                  src="https://cdn-icons-png.flaticon.com/128/6676/6676016.png" 
                  alt="Tu avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Agregar un comentario"
                    className="w-full bg-gray-100 rounded-full py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#e60023] font-semibold text-sm disabled:opacity-50"
                    disabled={!comment.trim()}
                  >
                    Publicar
                  </button>
                </div>
              </form>
            </footer>

          </section>
        </article>

        {/* SECCIÓN DE IDEAS RELACIONADAS */}
        <footer className="p-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ideas que podrían gustarte</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedPins.map((related) => (
              <li key={related.id}>
                <Link to={`/pin/${related.id}`} className="block">
                  <figure className="rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity">
                    <img 
                      src={related.imageUrl} 
                      alt={related.title}
                      className="w-full aspect-[3/4] object-cover"
                    />
                    <figcaption className="p-2 text-sm font-medium text-gray-700">{related.title}</figcaption>
                  </figure>
                </Link>
              </li>
            ))}
          </ul>
        </footer>

      </section>
    </main>
  );
}

export default PinDetail;