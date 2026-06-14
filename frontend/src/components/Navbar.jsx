import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaComment, FaCamera } from 'react-icons/fa';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 px-6 py-3 shadow-sm">
      <nav className="flex items-center justify-between">
        {/* Links de navegación - SIN TÍTULO */}
        <ul className="flex items-center gap-2">
          <li><Link to="/home" className="px-3 py-2 font-semibold text-black hover:bg-gray-100 rounded-full transition-colors">Inicio</Link></li>
          <li><Link to="/explorar" className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">Explorar</Link></li>
          <li><Link to="/crear" className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">Crear</Link></li>
        </ul>
        
        {/* Barra de búsqueda con ícono de cámara */}
        <section className="flex-1 max-w-2xl mx-4">
          <form className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-3">
            <FaSearch className="text-gray-500" aria-label="Buscar" />
            <input 
              type="text" 
              placeholder="Buscar" 
              className="bg-transparent w-full outline-none text-gray-700"
              aria-label="Campo de búsqueda"
            />
            <FaCamera className="text-gray-500 text-xl cursor-pointer hover:text-gray-700 transition-colors" aria-label="Buscar por imagen" />
          </form>
        </section>
        
        {/* Iconos de usuario */}
        <ul className="flex items-center gap-3">
          <li>
            <button className="text-gray-700 text-xl hover:bg-gray-100 p-2 rounded-full transition-colors" aria-label="Notificaciones">
              <FaBell />
            </button>
          </li>
          <li>
            <button className="text-gray-700 text-xl hover:bg-gray-100 p-2 rounded-full transition-colors" aria-label="Mensajes">
              <FaComment />
            </button>
          </li>
          <li className="relative">
            <button 
              className="text-gray-700 text-3xl hover:bg-gray-100 p-1 rounded-full transition-colors"
              aria-label="Menú de usuario"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/128/6676/6676016.png" 
                alt="Avatar" 
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>
            
            {/* Dropdown semántico */}
            {isDropdownOpen && (
              <nav className="absolute right-0 top-12 bg-white rounded-xl shadow-lg py-2 w-56 z-50 border border-gray-100">
                <ul>
                  <li><Link to="/perfil" className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">Mi perfil</Link></li>
                  <li><Link to="/guardados" className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">Guardados</Link></li>
                  <li><hr className="my-2" /></li>
                  <li><button onClick={() => navigate('/')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-red-600">Salir</button></li>
                </ul>
              </nav>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;