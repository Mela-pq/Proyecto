import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPinterest, FaTimes, FaEye, FaEyeSlash, FaInfoCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { registro } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    fecha_nacimiento: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await registro(formData.email, formData.username, formData.password, formData.fecha_nacimiento);
      toast.success('¡Registro exitoso! Ahora inicia sesión');
      navigate('/login');
    } catch (error) {
      console.error('Error completo:', error);
      const mensaje = error.response?.data?.detail || 'Error al registrarse';
      toast.error(mensaje);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-white opacity-30 pointer-events-none">
        <nav className="flex items-center gap-4">
          <h1 className="flex items-center gap-1 text-[#e60023] text-xl font-bold">
            <FaPinterest className="text-2xl" />
            <span>Pinterest</span>
          </h1>
          <a href="#" className="text-black font-semibold">Explorar</a>
        </nav>
        <nav className="flex items-center gap-4">
          <a href="#" className="text-black font-semibold">Información</a>
          <a href="#" className="text-black font-semibold">Empresas</a>
          <a href="#" className="text-black font-semibold">Crear</a>
          <a href="#" className="text-black font-semibold">Lo nuevo</a>
        </nav>
      </header>

      <main className="flex items-center justify-between px-16 py-10 min-h-[calc(100vh-80px)] gap-10 opacity-30 pointer-events-none">
        <section className="flex-1 max-w-[500px]">
          <h1 className="text-6xl font-bold leading-tight tracking-tight mb-8">
            Crea la vida que deseas en Pinterest
          </h1>
        </section>
      </main>

      <section className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
        <article className="bg-white w-[500px] max-w-[90%] max-h-[95vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          
          <Link to="/" className="absolute top-5 right-5 text-black w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10">
            <FaTimes />
          </Link>

          <section className="p-8 overflow-y-auto">
            <figure className="text-center text-[#e60023] text-3xl mb-3">
              <FaPinterest />
            </figure>
            
            <h2 className="text-2xl font-semibold text-black text-center mb-1">
              Te damos la bienvenida a Pinterest
            </h2>
            <p className="text-sm text-black text-center mb-6">
              Encuentra nuevas ideas para experimentar
            </p>

            <form onSubmit={handleSubmit} className="w-full">
              <fieldset className="border-0 p-0 m-0">
                <label htmlFor="email" className="block text-sm text-black mb-1 pl-1">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-2xl text-base outline-none focus:border-blue-500 mb-4"
                  required
                />

                <label htmlFor="username" className="block text-sm text-black mb-1 pl-1">
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Nombre de usuario"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-2xl text-base outline-none focus:border-blue-500 mb-4"
                  required
                />

                <label htmlFor="password" className="block text-sm text-black mb-1 pl-1">
                  Contraseña
                </label>
                <section className="relative mb-1">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Crea una contraseña"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-2xl text-base outline-none focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 text-black"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </section>
                <p className="text-xs text-gray-500 mb-2 pl-1">
                  Usa ocho o más letras, números y símbolos
                </p>

                <nav className="mb-4">
                  <a href="#" className="text-sm text-black font-semibold hover:underline flex items-center gap-1">
                    Consejos para la contraseña <FaInfoCircle className="text-gray-500 text-xs" />
                  </a>
                </nav>

                <label htmlFor="birthdate" className="block text-sm text-black mb-1 pl-1">
                  Fecha de nacimiento <FaInfoCircle className="text-gray-500 text-xs inline ml-1" />
                </label>
                <input
                  id="birthdate"
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={(e) => setFormData({...formData, fecha_nacimiento: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-2xl text-base outline-none focus:border-blue-500 mb-6"
                  required
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#e60023] text-white py-3 rounded-3xl font-bold text-base hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Registrando...' : 'Continuar'}
                </button>
              </fieldset>
            </form>

            <p className="font-bold text-black text-sm text-center my-3">O</p>

            <button className="w-full bg-white text-black border border-gray-300 py-3 rounded-3xl font-semibold text-base flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors mb-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
              Continuar con Google
            </button>

            <footer className="text-xs text-gray-500 text-center leading-relaxed mb-4">
              Si continúas, indicas que aceptas las <a href="#" className="underline font-semibold">Condiciones de servicio</a> de Pinterest y reconoces que leíste nuestra <a href="#" className="underline font-semibold">Política de privacidad</a>. <a href="#" className="underline font-semibold">Aviso de recopilación de información</a>.
            </footer>

            <p className="text-sm text-black text-center">
              ¿Ya eres miembro? <Link to="/login" className="font-bold hover:underline">Iniciar sesión</Link>
            </p>
          </section>

          <footer className="bg-gray-200 py-4 text-center">
            <a href="#" className="text-black font-bold text-sm hover:underline">
              Crea una cuenta para empresa gratuita
            </a>
          </footer>

        </article>
      </section>
    </>
  );
}

export default Register;