import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMisGuardados } from '../services/api';
import toast from 'react-hot-toast';

function Guardados() {
  const [guardados, setGuardados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarGuardados();
  }, []);

  const cargarGuardados = async () => {
    try {
      const data = await getMisGuardados();
      setGuardados(data);
    } catch (error) {
      toast.error('Error al cargar guardados');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-500">Cargando tus guardados...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Tus ideas guardadas</h1>
        
        <nav className="flex gap-6 border-b border-gray-200 mb-6">
          <Link to="/perfil" className="text-gray-600 hover:text-gray-900 font-semibold pb-2">Creados</Link>
          <Link to="/guardados" className="text-[#e60023] font-semibold border-b-2 border-[#e60023] pb-2">Guardados</Link>
        </nav>

        {guardados.length === 0 ? (
          <article className="bg-white rounded-2xl p-12 text-center">
            <h3 className="text-xl font-bold mb-2">No has guardado ningún pin aún</h3>
            <p className="text-gray-500 mb-4">Explora y guarda los Pines que te inspiren</p>
            <Link to="/home" className="bg-[#e60023] text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700">
              Explorar
            </Link>
          </article>
        ) : (
          <div className="masonry-grid">
            {guardados.map((g) => (
              <div key={g.guardado_id} className="masonry-item">
                <img src={g.publicacion?.imagen_url} alt={g.publicacion?.titulo} className="w-full rounded-2xl" />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Guardados;