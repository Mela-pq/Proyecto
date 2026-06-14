import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCog, FaHome, FaCompass, FaTabletAlt, FaPlus, FaBell, FaEnvelope, FaChevronDown, FaUserCircle, FaBuilding, FaUsers, FaPlusCircle, FaSignOutAlt, FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DrawerPanel from './DrawerPanel';
import SearchBar from './SearchBar';

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, getNombreUsuario, getEmail } = useAuth();
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const [selectedPin, setSelectedPin] = useState(null);
  const [relatedPins, setRelatedPins] = useState([]);

  const isActive = (path) => location.pathname === path;

  const openDrawer = (type) => {
    setActiveDrawer(activeDrawer === type ? null : type);
  };

  const closeDrawer = () => {
    setActiveDrawer(null);
  };

  const closePinDrawer = () => {
    setActiveDrawer(null);
    setSelectedPin(null);
    setRelatedPins([]);
  };

  const openPinDrawer = (pin, related) => {
    setSelectedPin(pin);
    setRelatedPins(related);
    setActiveDrawer('pin');
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* BARRA LATERAL IZQUIERDA - Sidebar Fija */}
      <aside className="fixed left-0 top-0 w-20 h-screen bg-white border-r border-gray-100 z-[1001] overflow-y-auto pt-5 flex flex-col">
        <nav className="flex flex-col h-full">
          <h2 className="text-center pb-6 m-0">
            <Link to="/home" className="block">
              <img 
                src="https://cdn.pixabay.com/photo/2022/01/11/15/02/pinterest-6930796_1280.png" 
                alt="Pinterest"
                className="w-8 h-8 block mx-auto"
              />
            </Link>
          </h2>
          
          <ul className="flex flex-col gap-6 list-none p-0 m-0">
            <li className="flex justify-center">
              <Link to="/home" className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-colors ${isActive('/home') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                <FaHome className={`w-6 h-6 ${isActive('/home') ? 'text-black' : 'text-gray-700'}`} />
              </Link>
            </li>
            <li className="flex justify-center">
              <Link to="/explorar" className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-colors ${isActive('/explorar') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                <FaCompass className={`w-6 h-6 ${isActive('/explorar') ? 'text-black' : 'text-gray-700'}`} />
              </Link>
            </li>
            <li className="flex justify-center">
              <Link to="/tableros" className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-colors ${isActive('/tableros') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                <FaTabletAlt className={`w-6 h-6 ${isActive('/tableros') ? 'text-black' : 'text-gray-700'}`} />
              </Link>
            </li>
            <li className="flex justify-center">
              <button 
                onClick={() => openDrawer('crear')}
                className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-colors ${activeDrawer === 'crear' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <FaPlus className={`w-6 h-6 ${activeDrawer === 'crear' ? 'text-black' : 'text-gray-700'}`} />
              </button>
            </li>
            <li className="flex justify-center">
              <button 
                onClick={() => openDrawer('notificaciones')}
                className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-colors ${activeDrawer === 'notificaciones' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <FaBell className={`w-6 h-6 ${activeDrawer === 'notificaciones' ? 'text-black' : 'text-gray-700'}`} />
              </button>
            </li>
            <li className="flex justify-center">
              <button 
                onClick={() => openDrawer('mensajes')}
                className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-colors ${activeDrawer === 'mensajes' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <FaEnvelope className={`w-6 h-6 ${activeDrawer === 'mensajes' ? 'text-black' : 'text-gray-700'}`} />
              </button>
            </li>
          </ul>

          <footer className="mt-auto py-5 flex justify-center">
            <Link to="/configuracion" className="flex items-center justify-center w-12 h-12 rounded-2xl hover:bg-gray-100 transition-colors">
              <FaCog className="w-6 h-6 text-gray-600" />
            </Link>
          </footer>
        </nav>
      </aside>

      {/* BARRA SUPERIOR - Navbar con búsqueda y menú de usuario */}
      <header className="fixed top-0 left-20 right-0 bg-white z-50 px-6 py-3 shadow-sm">
        <nav className="flex items-center justify-between gap-4">
          <SearchBar placeholder="Buscar" className="flex-1" />
          
          <div className="relative flex-shrink-0">
            <div className="flex items-center gap-2">
              <Link to="/perfil" className="block">
                <img 
                  src="https://cdn-icons-png.flaticon.com/128/6676/6676016.png" 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full object-cover hover:opacity-80 transition-opacity"
                />
              </Link>
              
              <button 
                onClick={toggleUserMenu}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaChevronDown className={`text-gray-500 text-xs transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {isUserMenuOpen && (
              <nav className="absolute right-0 top-12 bg-white rounded-xl shadow-lg py-2 w-64 z-50 border border-gray-100">
                <ul>
                  <li>
                    <Link to="/perfil" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors" onClick={closeUserMenu}>
                      <FaUserCircle className="text-gray-500 text-xl" />
                      <div>
                        <p className="font-semibold text-gray-800">{getNombreUsuario()}</p>
                        <p className="text-xs text-gray-400">{getEmail()}</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/guardados" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors" onClick={closeUserMenu}>
                      <FaHeart className="text-gray-500 text-xl" />
                      <span className="text-gray-700">Guardados</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/empresa" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors" onClick={closeUserMenu}>
                      <FaBuilding className="text-gray-500 text-xl" />
                      <span className="text-gray-700">Convertir en cuenta para empresa</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/cuentas" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors" onClick={closeUserMenu}>
                      <FaUsers className="text-gray-500 text-xl" />
                      <span className="text-gray-700">Tus cuentas</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/agregar-cuenta" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors" onClick={closeUserMenu}>
                      <FaPlusCircle className="text-gray-500 text-xl" />
                      <span className="text-gray-700">Agregar cuenta de Pinterest</span>
                    </Link>
                  </li>
                  <li><hr className="my-2" /></li>
                  <li>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                      <FaSignOutAlt className="text-red-500 text-xl" />
                      <span className="text-red-600">Salir</span>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </nav>
      </header>

      {/* DRAWERS */}
      <DrawerPanel 
        isOpen={activeDrawer === 'crear'}
        onClose={closeDrawer}
        type="crear"
      />
      <DrawerPanel 
        isOpen={activeDrawer === 'notificaciones'}
        onClose={closeDrawer}
        type="notificaciones"
      />
      <DrawerPanel 
        isOpen={activeDrawer === 'mensajes'}
        onClose={closeDrawer}
        type="mensajes"
      />
      <DrawerPanel 
        isOpen={activeDrawer === 'pin'}
        onClose={closePinDrawer}
        type="pin"
        selectedPin={selectedPin}
        relatedPins={relatedPins}
        onSelectPin={(newPin) => {
          setSelectedPin(newPin);
          setRelatedPins(prev => prev.filter(p => p.id !== newPin.id));
        }}
      />

      {/* CONTENIDO PRINCIPAL */}
      <main className={`pt-20 transition-all duration-300 ${activeDrawer === 'pin' ? 'ml-[28rem]' : 'ml-20'}`}>
        <Outlet context={{ openPinDrawer }} />
      </main>
    </>
  );
}

export default Layout;