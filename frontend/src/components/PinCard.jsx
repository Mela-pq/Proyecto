import { useState } from 'react';
import { FaHeart, FaComment, FaSave, FaShare, FaEllipsisH } from 'react-icons/fa';
import { toggleLike, toggleGuardado } from '../services/api';
import toast from 'react-hot-toast';

function PinCard({ id, imageUrl, title, author, authorAvatar, likes: initialLikes, comments, saves: initialSaves }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes || 0);
  const [savesCount, setSavesCount] = useState(initialSaves || 0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (!isLiked) {
        const result = await toggleLike(id);
        if (result.liked) {
          setLikesCount(prev => prev + 1);
          setIsLiked(true);
          toast.success('¡Te gusta!');
        } else {
          setLikesCount(prev => prev - 1);
          setIsLiked(false);
          toast('Quitaste el like');
        }
      } else {
        setLikesCount(prev => prev - 1);
        setIsLiked(false);
        toast('Quitaste el like');
      }
    } catch (error) {
      console.error('Error al dar like:', error);
      toast.error('Error al procesar tu like');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (!isSaved) {
        const result = await toggleGuardado(id);
        if (result.saved) {
          setSavesCount(prev => prev + 1);
          setIsSaved(true);
          toast.success('¡Guardado!');
        } else {
          setSavesCount(prev => prev - 1);
          setIsSaved(false);
          toast('Eliminado de guardados');
        }
      } else {
        setSavesCount(prev => prev - 1);
        setIsSaved(false);
        toast('Eliminado de guardados');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar la publicación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(window.location.origin + `/pin/${id}`);
      toast.success('¡Enlace copiado al portapapeles!');
    } catch (error) {
      toast.error('No se pudo copiar el enlace');
    }
  };

  return (
    <article 
      className="masonry-item group relative rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <figure className="relative">
        <img 
          src={imageUrl} 
          alt={title || `Publicación de ${author}`}
          className="w-full rounded-2xl hover:opacity-95 transition-all"
          loading="lazy"
        />
        
        {showOverlay && (
          <footer className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col justify-between p-3">
            <section className="flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isLoading}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  isSaved 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-[#e60023] text-white hover:bg-red-700'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSaved ? '✓ Guardado' : 'Guardar'}
              </button>
            </section>
            
            <ul className="flex gap-2 justify-start">
              <li>
                <button 
                  onClick={handleLike}
                  disabled={isLoading}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  aria-label={isLiked ? 'Quitar like' : 'Dar like'}
                >
                  <FaHeart className={`${isLiked ? 'text-red-600' : 'text-gray-800'} text-lg`} />
                </button>
              </li>
              <li>
                <button 
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors" 
                  aria-label="Comentar"
                >
                  <FaComment className="text-gray-800 text-lg" />
                </button>
              </li>
              <li>
                <button 
                  onClick={handleShare}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors" 
                  aria-label="Compartir"
                >
                  <FaShare className="text-gray-800 text-lg" />
                </button>
              </li>
            </ul>
          </footer>
        )}
      </figure>
      
      <section className="flex items-center gap-2 mt-2 px-1">
        <img 
          src={authorAvatar || 'https://cdn-icons-png.flaticon.com/128/6676/6676016.png'} 
          alt={author}
          className="w-8 h-8 rounded-full object-cover"
        />
        <section className="flex flex-col">
          <p className="font-semibold text-sm hover:underline cursor-pointer">{author}</p>
          <ul className="flex gap-3 text-xs text-gray-500">
            <li className="flex items-center gap-1">
              <FaHeart className="text-xs" />
              <span>{likesCount}</span>
            </li>
            <li className="flex items-center gap-1">
              <FaComment className="text-xs" />
              <span>{comments || 0}</span>
            </li>
            <li className="flex items-center gap-1">
              <FaSave className="text-xs" />
              <span>{savesCount}</span>
            </li>
          </ul>
        </section>
      </section>
    </article>
  );
}

export default PinCard;