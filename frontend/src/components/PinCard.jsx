import { useState } from 'react';
import { FaHeart, FaComment, FaSave, FaShare, FaEllipsisH } from 'react-icons/fa';
import { toggleLike, toggleGuardado } from '../services/api';
import toast from 'react-hot-toast';

function PinCard({ id, imageUrl, title, author, authorAvatar, likes: initialLikes, saves: initialSaves }) {
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
    } catch (error) {
      toast.error('Error al procesar like');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    if (isLoading) return;
    
    setIsLoading(true);
    try {
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
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + `/pin/${id}`);
    toast.success('Enlace copiado');
  };

  return (
    <div 
      className="relative rounded-2xl overflow-hidden cursor-pointer bg-gray-100"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <img 
        src={imageUrl} 
        alt={title || `Pin de ${author}`}
        className="w-full h-auto block"
        loading="lazy"
      />
      
      {showOverlay && (
        <div className="absolute inset-0 bg-black/40 transition-opacity">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`absolute top-3 right-3 px-4 py-1.5 rounded-full text-sm font-bold transition-all z-10 ${
              isSaved ? 'bg-gray-800 text-white' : 'bg-[#e60023] text-white hover:bg-red-700'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSaved ? '✓ Guardado' : 'Guardar'}
          </button>
          
          <button className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors z-10">
            <FaEllipsisH className="text-gray-800 text-sm" />
          </button>
          
          <div className="absolute bottom-3 left-3 flex gap-2">
            <button
              onClick={handleLike}
              disabled={isLoading}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors z-10"
            >
              <FaHeart className={`text-lg ${isLiked ? 'text-red-600' : 'text-gray-800'}`} />
            </button>
            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors z-10">
              <FaComment className="text-gray-800 text-lg" />
            </button>
            <button
              onClick={handleShare}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors z-10"
            >
              <FaShare className="text-gray-800 text-lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PinCard;