import { Link } from 'react-router-dom';
import { FaTimes, FaImage, FaFolder, FaPalette, FaBell, FaEnvelope, FaUserPlus, FaComment, FaHeart, FaShare } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { getComentarios, crearComentario, toggleLike, toggleGuardado } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function DrawerPanel({ isOpen, onClose, type, selectedPin, relatedPins, onSelectPin }) {
  const { getNombreUsuario } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(selectedPin?.likes || 0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (selectedPin && type === 'pin') {
      setLikesCount(selectedPin.likes || 0);
      cargarComentarios();
    }
  }, [selectedPin, type]);

  const cargarComentarios = async () => {
    try {
      const data = await getComentarios(selectedPin.id);
      setComments(data.map(c => ({
        id: c.id,
        user: c.usuario?.username || `Usuario ${c.usuario_id}`,
        text: c.contenido,
        avatar: c.usuario?.avatar_url || 'https://cdn-icons-png.flaticon.com/128/6676/6676016.png'
      })));
    } catch (error) {
      console.error('Error cargando comentarios:', error);
    }
  };

  if (!isOpen) return null;

  const handleLike = async () => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
      toast.success('¡Te gusta!');
      if (selectedPin) await toggleLike(selectedPin.id);
    } else {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
      toast('Quitaste el like');
      if (selectedPin) await toggleLike(selectedPin.id);
    }
  };

  const handleSave = async () => {
    if (!isSaved) {
      setIsSaved(true);
      toast.success('¡Guardado!');
      if (selectedPin) await toggleGuardado(selectedPin.id);
    } else {
      setIsSaved(false);
      toast('Eliminado');
      if (selectedPin) await toggleGuardado(selectedPin.id);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `/pin/${selectedPin?.id}`);
    toast.success('Enlace copiado');
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (comment.trim() && selectedPin) {
      try {
        await crearComentario(selectedPin.id, comment);
        await cargarComentarios();
        setComment('');
        toast.success('Comentario agregado');
      } catch (error) {
        toast.error('Error al agregar comentario');
      }
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'crear':
        return (
          <section>
            <h2 className="text-xl font-bold mb-6">Crear</h2>
            <ul className="space-y-6">
              <li>
                <Link to="/crear/pin" onClick={onClose} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <figure className="bg-red-50 p-3 rounded-full"><FaImage className="text-2xl text-[#e60023]" /></figure>
                  <article><h3 className="font-semibold">Pin</h3><p className="text-sm text-gray-500">Publica tus fotos o videos, y agrega enlaces, stickers, efectos y más</p></article>
                </Link>
              </li>
              <li>
                <Link to="/crear/tablero" onClick={onClose} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <figure className="bg-blue-50 p-3 rounded-full"><FaFolder className="text-2xl text-blue-600" /></figure>
                  <article><h3 className="font-semibold">Tablero</h3><p className="text-sm text-gray-500">Crea un tablero para organizar una colección de tus Pines favoritos</p></article>
                </Link>
              </li>
              <li>
                <Link to="/crear/collage" onClick={onClose} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <figure className="bg-purple-50 p-3 rounded-full"><FaPalette className="text-2xl text-purple-600" /></figure>
                  <article><h3 className="font-semibold">Collage</h3><p className="text-sm text-gray-500">Combina ideas para construir tu visión y crear algo nuevo.</p></article>
                </Link>
              </li>
            </ul>
          </section>
        );

      case 'notificaciones':
        return (
          <section>
            <h2 className="text-xl font-bold mb-6">Actualizaciones</h2>
            <section className="mb-6">
              <h3 className="text-[#e60023] font-semibold mb-3">Novedad</h3>
              <ul className="space-y-3">
                <li className="py-2 border-b border-gray-100"><p className="font-medium">Wallpapers de One Piece para ti</p><span className="text-xs text-gray-400">1h</span></li>
                <li className="py-2 border-b border-gray-100"><p className="font-medium">Kirby para ti</p><span className="text-xs text-gray-400">6h</span></li>
                <li className="py-2 border-b border-gray-100"><p className="font-medium">Esto es para ti</p><span className="text-xs text-gray-400">10h</span></li>
              </ul>
            </section>
            <section>
              <h3 className="text-gray-600 font-semibold mb-3">Actualizaciones</h3>
              <ul className="space-y-3">
                <li className="py-2 border-b border-gray-100"><p className="font-medium">Tómate un momento a solas</p><span className="text-xs text-gray-400">1d</span></li>
                <li className="py-2 border-b border-gray-100"><p className="font-medium">Reflejo perfecto de tu estilo</p><span className="text-xs text-gray-400">1d</span></li>
                <li className="py-2 border-b border-gray-100"><p className="font-medium">Tu selección siempre sorprende</p><span className="text-xs text-gray-400">1d</span></li>
              </ul>
            </section>
            <footer className="text-center text-gray-400 text-sm mt-8">Visto</footer>
          </section>
        );

      case 'mensajes':
        return (
          <section>
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Mensajes</h2>
              <button className="flex items-center gap-1 text-[#e60023] text-sm font-semibold"><FaUserPlus /> Invitar</button>
            </header>
            <article className="bg-gray-50 rounded-xl p-6 text-center mb-6">
              <FaComment className="text-4xl text-gray-300 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Inicia una conversación</h3>
              <p className="text-sm text-gray-500">Usa los mensajes para chatear con amigos, compartir Pines y tableros.</p>
            </article>
            <section>
              <h3 className="text-gray-500 text-sm mb-3">MENSAJE NUEVO</h3>
              <ul className="space-y-2">
                <li className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer"><p className="font-medium">Guardar</p></li>
                <li className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer"><p className="font-medium">No se (si sabe)</p></li>
                <li className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer"><p className="font-medium">frieren</p></li>
                <li className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer"><p className="font-medium">I'M JUST A POTATO</p></li>
              </ul>
            </section>
          </section>
        );

      case 'pin':
        return (
          <section>
            {/* Imagen grande */}
            <figure className="w-full bg-gray-100 rounded-2xl overflow-hidden mb-4">
              <img 
                src={selectedPin?.imagen_url || selectedPin?.imageUrl} 
                alt={selectedPin?.titulo || selectedPin?.title}
                className="w-full h-auto object-contain"
              />
            </figure>

            {/* Información del pin */}
            <article className="mt-2">
              <header className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedPin?.usuario?.avatar_url || 'https://cdn-icons-png.flaticon.com/128/6676/6676016.png'} 
                    alt={selectedPin?.usuario?.username || 'Usuario'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{selectedPin?.usuario?.username || `Usuario ${selectedPin?.usuario_id}`}</p>
                    <p className="text-xs text-gray-500">0 seguidores</p>
                  </div>
                </div>
                <button onClick={handleSave} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${isSaved ? 'bg-gray-800 text-white' : 'bg-[#e60023] text-white hover:bg-red-700'}`}>
                  {isSaved ? 'Guardado ✓' : 'Guardar'}
                </button>
              </header>

              <section className="mb-3">
                <h1 className="text-lg font-semibold text-gray-900">{selectedPin?.titulo || selectedPin?.title || 'Sin título'}</h1>
                <p className="text-sm text-gray-600">{selectedPin?.descripcion || 'Sin descripción'}</p>
              </section>

              <nav className="flex items-center gap-4 mb-3 py-2 border-y border-gray-100">
                <button onClick={handleLike} className="flex items-center gap-1 hover:bg-gray-100 px-3 py-1 rounded-full">
                  <FaHeart className={`${isLiked ? 'text-red-600' : 'text-gray-700'}`} />
                  <span>{likesCount}</span>
                </button>
                <button className="flex items-center gap-1 hover:bg-gray-100 px-3 py-1 rounded-full">
                  <FaComment className="text-gray-700" />
                  <span>{comments.length}</span>
                </button>
                <button onClick={handleShare} className="flex items-center gap-1 hover:bg-gray-100 px-3 py-1 rounded-full">
                  <FaShare className="text-gray-700" />
                </button>
              </nav>

              <section className="mb-3 max-h-[150px] overflow-y-auto">
                <h3 className="font-semibold text-gray-900 mb-2">Comentarios</h3>
                {comments.length === 0 ? (
                  <p className="text-sm text-gray-500">No hay comentarios aún. ¡Sé el primero en comentar!</p>
                ) : (
                  <ul className="space-y-2">
                    {comments.map((c) => (
                      <li key={c.id} className="flex gap-2">
                        <img src={c.avatar} alt={c.user} className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-xs text-gray-900">{c.user}</p>
                          <p className="text-xs text-gray-600">{c.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <footer className="pt-3 border-t border-gray-100">
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <img src="https://cdn-icons-png.flaticon.com/128/6676/6676016.png" alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Agregar un comentario"
                      className="w-full bg-gray-100 rounded-full py-1.5 px-3 text-xs outline-none focus:ring-1 focus:ring-gray-300"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#e60023] font-semibold text-xs">Publicar</button>
                  </div>
                </form>
              </footer>
            </article>

            {/* Ideas relacionadas */}
            {relatedPins && relatedPins.length > 0 && (
              <section className="mt-6 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Ideas relacionadas</h3>
                <ul className="grid grid-cols-3 gap-2">
                  {relatedPins.slice(0, 3).map((related) => (
                    <li key={related.id}>
                      <button onClick={() => onSelectPin(related)} className="w-full">
                        <img 
                          src={related.imagen_url} 
                          alt={related.titulo}
                          className="w-full aspect-square object-cover rounded-lg hover:opacity-90 transition-opacity"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <aside className={`fixed top-0 left-20 w-[600px] h-full bg-white shadow-xl z-[1002] overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <header className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{type === 'pin' ? 'Pin' : type === 'crear' ? 'Crear nuevo' : type === 'notificaciones' ? 'Actualizaciones' : type === 'mensajes' ? 'Mensajes' : ''}</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><FaTimes className="text-xl" /></button>
      </header>
      <section className="p-6">{renderContent()}</section>
    </aside>
  );
}

export default DrawerPanel;