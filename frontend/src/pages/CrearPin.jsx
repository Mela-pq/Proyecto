import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaLink, FaTag, FaRobot, FaArrowLeft } from 'react-icons/fa';
import { subirImagen, crearPublicacion } from '../services/api';
import toast from 'react-hot-toast';

function CrearPin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    enlace: '',
    tablero: 'general',
    tags: '',
    es_ia: false
  });
  const [archivo, setArchivo] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('📸 Imagen seleccionada:', file?.name);
    if (file) {
      setArchivo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀🚀🚀 HANDLESUBMIT EJECUTADO 🚀🚀🚀');
    console.log('📸 archivo:', archivo?.name);
    
    if (!archivo) {
      toast.error('Debes seleccionar una imagen');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('📤 Subiendo imagen...');
      const imagenResponse = await subirImagen(archivo);
      console.log('✅ Imagen subida:', imagenResponse);
      const imagenUrl = imagenResponse.url;
      
      console.log('📝 Creando publicación...');
      await crearPublicacion(
        imagenUrl,
        formData.titulo,
        formData.descripcion,
        formData.tablero,
        formData.tags
      );
      
      toast.success('¡Pin creado exitosamente!');
      navigate('/home');
    } catch (error) {
      console.error('❌ Error detallado:', error);
      toast.error(error.response?.data?.detail || 'Error al crear el Pin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        <header className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Crear Pin</h1>
        </header>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md overflow-hidden">
          
          <section className="p-6 border-b border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Imagen <span className="text-red-500">*</span>
            </label>
            
            {!imagenPreview ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#e60023] transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaImage className="text-4xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Haz clic o arrastra una imagen</p>
                  <p className="text-xs text-gray-400">JPG, PNG, WebP (máx. 20MB)</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            ) : (
              <div className="relative">
                <img src={imagenPreview} alt="Preview" className="w-full max-h-96 object-contain rounded-xl" />
                <button
                  type="button"
                  onClick={() => { setArchivo(null); setImagenPreview(null); }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            )}
          </section>

          <section className="p-6 space-y-4">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                placeholder="Agrega un título"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                placeholder="Agrega una descripción detallada"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Enlace</label>
              <div className="flex items-center gap-2">
                <FaLink className="text-gray-400" />
                <input
                  type="url"
                  value={formData.enlace}
                  onChange={(e) => setFormData({...formData, enlace: e.target.value})}
                  placeholder="Agrega un enlace"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tags (separados por comas)</label>
              <div className="flex items-center gap-2">
                <FaTag className="text-gray-400" />
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="ejemplo: arte, naturaleza, diseño"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tablero</label>
              <select
                value={formData.tablero}
                onChange={(e) => setFormData({...formData, tablero: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e60023]"
              >
                <option value="general">General</option>
                <option value="arte">Arte</option>
                <option value="fotografia">Fotografía</option>
                <option value="diseño">Diseño</option>
                <option value="moda">Moda</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="es_ia"
                checked={formData.es_ia}
                onChange={(e) => setFormData({...formData, es_ia: e.target.checked})}
                className="w-4 h-4 rounded border-gray-300 text-[#e60023] focus:ring-[#e60023]"
              />
              <label htmlFor="es_ia" className="flex items-center gap-2 text-sm text-gray-700">
                <FaRobot className="text-gray-500" />
                Contenido creado total o parcialmente con IA
              </label>
            </div>

          </section>

          <footer className="p-6 bg-gray-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !archivo}
              className="px-6 py-2 rounded-full bg-[#e60023] text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Publicando...' : 'Publicar'}
            </button>
          </footer>

        </form>
      </div>
    </main>
  );
}

export default CrearPin;