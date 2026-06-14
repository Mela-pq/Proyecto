import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaBell, FaLock, FaPalette, FaLanguage, FaQuestionCircle } from 'react-icons/fa';

function Configuracion() {
  const { getNombreUsuario, getEmail } = useAuth();

  const options = [
    { icon: <FaUser />, title: "Perfil", description: "Edita tu información personal" },
    { icon: <FaBell />, title: "Notificaciones", description: "Configura tus alertas" },
    { icon: <FaLock />, title: "Privacidad y seguridad", description: "Controla tu cuenta" },
    { icon: <FaPalette />, title: "Apariencia", description: "Tema oscuro/claro" },
    { icon: <FaLanguage />, title: "Idioma", description: "Español (Latinoamérica)" },
    { icon: <FaQuestionCircle />, title: "Ayuda", description: "Centro de ayuda" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Configuración</h1>
        
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-semibold text-gray-900">{getNombreUsuario()}</p>
              <p className="text-sm text-gray-500">{getEmail()}</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {options.map((opt, idx) => (
            <button key={idx} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0">
              <div className="text-gray-400 text-xl">{opt.icon}</div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900">{opt.title}</p>
                <p className="text-sm text-gray-500">{opt.description}</p>
              </div>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Configuracion;