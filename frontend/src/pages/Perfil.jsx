import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaHeart, FaFolder, FaSignOutAlt } from 'react-icons/fa';

function Perfil() {
  const { usuario, getNombreUsuario, getEmail, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header del perfil */}
        <section className="bg-white rounded-2xl shadow-sm p-8 mb-6 text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4">
            <FaUserCircle className="text-6xl text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{getNombreUsuario()}</h1>
          <p className="text-gray-500">{getEmail()}</p>
          <p className="text-sm text-gray-400 mt-2">0 seguidores · 0 seguidos</p>
          <button className="mt-4 px-6 py-2 bg-[#e60023] text-white rounded-full font-semibold hover:bg-red-700">
            Editar perfil
          </button>
        </section>

        {/* Estadísticas */}
        <section className="grid grid-cols-3 gap-4 mb-6">
          <article className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500">Pines</p>
          </article>
          <article className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500">Seguidores</p>
          </article>
          <article className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500">Siguiendo</p>
          </article>
        </section>

        {/* Tabs */}
        <nav className="flex gap-6 border-b border-gray-200 mb-6">
          <Link to="/perfil" className="text-[#e60023] font-semibold border-b-2 border-[#e60023] pb-2">Creados</Link>
          <Link to="/guardados" className="text-gray-600 hover:text-gray-900 font-semibold pb-2">Guardados</Link>
        </nav>

        {/* Grid de pines del usuario */}
        <section className="masonry-grid">
          <p className="text-gray-500 text-center py-20 col-span-full">No hay pines aún. ¡Crea tu primer pin!</p>
        </section>

        {/* Botón cerrar sesión */}
        <footer className="mt-8 text-center">
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 mx-auto hover:underline">
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </footer>
      </div>
    </main>
  );
}

export default Perfil;