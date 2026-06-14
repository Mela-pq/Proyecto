import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPinterest, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      toast.success('¡Inicio de sesión exitoso!');
    } catch (error) {
      const mensaje = error.response?.data?.detail || 'Error al iniciar sesión';
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
        <article className="bg-white w-[820px] max-w-[95%] rounded-3xl flex max-[768px]:flex-col overflow-hidden shadow-2xl">
          
          <Link to="/" className="absolute top-6 right-6 text-black w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10">
            <FaTimes className="text-xl" />
          </Link>

          <section className="w-[55%] max-[768px]:w-full p-8 flex flex-col items-center text-center">
            <h2 className="text-3xl font-semibold text-black mb-6">
              Te damos la bienvenida a Pinterest
            </h2>

            <form onSubmit={handleSubmit} className="w-full text-left">
              <fieldset className="border-0 p-0 m-0">
                <label htmlFor="email" className="block text-sm text-black mb-1 pl-1">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Correo"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-2xl text-base outline-none focus:border-blue-500 mb-3"
                  required
                />

                <label htmlFor="password" className="block text-sm text-black mb-1 pl-1">
                  Contraseña
                </label>
                <section className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña"
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

                <a href="#" className="block text-sm text-blue-600 font-semibold mt-1 mb-4 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#e60023] text-white py-3 rounded-3xl font-bold text-base hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
                </button>
              </fieldset>
            </form>

            <p className="font-bold text-black text-sm my-3">O</p>

            <button className="w-full bg-white text-black border border-gray-300 py-3 rounded-3xl font-semibold text-base flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
              Continuar con Google
            </button>

            <p className="text-xs text-gray-500 mt-4">
              El inicio de sesión con Facebook ya no está disponible <br />
              <strong className="cursor-pointer hover:underline">Actualizar método de inicio de sesión</strong>
            </p>

            <p className="text-sm text-black mt-2">
              ¿Aún no estás en Pinterest? <Link to="/register" className="font-bold hover:underline">Regístrate</Link>
            </p>
            <p className="text-sm text-black">
              ¿Representas a una empresa? <a href="#" className="font-bold hover:underline">Empieza aquí</a>
            </p>

            <footer className="text-xs text-gray-500 mt-5 leading-relaxed">
              Si continúas, indicas que aceptas las <a href="#" className="underline font-semibold">Condiciones de servicio</a> de Pinterest y reconoces que leíste nuestra <a href="#" className="underline font-semibold">Política de privacidad</a>. <a href="#" className="underline font-semibold">Aviso de recopilación de información</a>.
            </footer>
          </section>

          <aside className="w-[45%] max-[768px]:w-full bg-gray-100 rounded-2xl p-10 flex flex-col justify-center items-center text-center">
            <figure className="bg-white p-4 rounded-2xl shadow-md mb-5">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.pinterest.com/" 
                alt="Código QR Pinterest"
                className="w-[140px] h-[140px]"
              />
            </figure>
            <h3 className="text-xl font-bold text-black mb-2">Inicia sesión al instante</h3>
            <p className="text-sm text-black">
              Escanea el código QR con tu teléfono y confirma el inicio de sesión en la aplicación de Pinterest
            </p>
          </aside>

        </article>
      </section>
    </>
  );
}

export default Login;