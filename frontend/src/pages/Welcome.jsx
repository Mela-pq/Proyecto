// src/pages/Welcome.jsx
import { Link } from 'react-router-dom';
import { FaPinterest } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';

function Welcome() {
  return (
    <>
      {/* HEADER - Barra de navegación superior */}
      <header className="px-6 py-4 bg-white border-b border-gray-100">
        <nav className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-1 text-[#e60023] text-xl font-bold flex-shrink-0">
            <FaPinterest className="text-2xl" />
            <span>Pinterest</span>
          </Link>

          {/* Explorar - fijo a la izquierda */}
          <Link to="/explorar" className="text-black font-semibold text-base hover:bg-gray-100 px-3 py-2 rounded-full transition-colors flex-shrink-0">
            Explorar
          </Link>

          {/* Barra de búsqueda - CENTRAL */}
          <div className="flex-1 max-w-2xl">
            <SearchBar placeholder="Encuentra ideas sobre cenas faciles, moda, etc." />
          </div>

          {/* Navegación derecha con enlaces externos */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="https://about.pinterest.com/es-la/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black text-sm hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
            >
              Información
            </a>
            <a
              href="https://business.pinterest.com/es/?utm_campaign=pinterest_homepage_blogicon_all_evergreen&utm_medium=organic-pinterest&utm_source=organicpins_pinsite_homepageicon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black text-sm hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
            >
              Empresas
            </a>
            <a
              href="https://create.pinterest.com/es-la/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black text-sm hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
            >
              Crear
            </a>
            <a
              href="https://newsroom.pinterest.com/es/?utm_source=organicpins_pinsite_homepageicon&utm_campaign=pinterest_homepage_blogicon_all_evergreen&utm_medium=organic-pinterest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black text-sm hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
            >
              Noticias
            </a>
            <Link
              to="/login"
              className="bg-[#e60023] text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-red-700 transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="bg-[#efefef] text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-300 transition-colors"
            >
              Regístrate
            </Link>
          </div>
        </nav>
      </header>

      {/* MAIN - Contenido principal */}
      <main className="flex items-center justify-between px-16 py-16 min-h-[calc(100vh-80px)] gap-10 max-[900px]:flex-col max-[900px]:text-center max-[900px]:px-5">
        {/* Sección Izquierda - Texto hero */}
        <section className="flex-1 max-w-[500px] max-[900px]:max-w-full">
          <h1 className="text-6xl font-bold leading-tight tracking-tight mb-8 max-[900px]:text-4xl">
            Crea la vida que te <br />encanta en Pinterest
          </h1>

          <nav className="flex gap-3 flex-wrap max-[900px]:justify-center">
            <Link
              to="/register"
              className="bg-[#e60023] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors"
            >
              Únete a Pinterest gratis
            </Link>
            <Link
              to="/login"
              className="bg-[#e1e1e1] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-300 transition-colors"
            >
              Ya tengo una cuenta
            </Link>
          </nav>
        </section>

        {/* Sección Derecha - Galería de imágenes */}
        <aside className="flex-1 flex gap-4 justify-center items-center max-[900px]:hidden">
          <figure className="w-[140px] -mt-16 flex flex-col gap-4">
            <img
              src="https://picsum.photos/200/250?random=11"
              alt="Flores"
              className="w-full h-[180px] object-cover rounded-3xl"
            />
            <img
              src="https://picsum.photos/200/300?random=12"
              alt="Moda Verde"
              className="w-full h-auto rounded-3xl"
            />
          </figure>
          <figure className="w-[220px]">
            <img
              src="https://picsum.photos/250/350?random=13"
              alt="Cabello con pañuelo"
              className="w-full h-[320px] object-cover rounded-3xl"
            />
          </figure>
          <figure className="w-[140px] mt-10 flex flex-col gap-4">
            <img
              src="https://picsum.photos/150/150?random=14"
              alt="Hojas"
              className="w-full h-[100px] object-cover rounded-3xl"
            />
            <img
              src="https://picsum.photos/150/220?random=15"
              alt="Uñas"
              className="w-full h-auto rounded-3xl"
            />
            <img
              src="https://picsum.photos/200/180?random=16"
              alt="Sofá naranja"
              className="w-full h-auto rounded-3xl"
            />
          </figure>
        </aside>
      </main>
    </>
  );
}

export default Welcome;