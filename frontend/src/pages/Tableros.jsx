import { Link } from 'react-router-dom';
import { FaFolder, FaPlus } from 'react-icons/fa';

function Tableros() {
  const boards = [
    { id: 1, name: "Personajes de anime", pins: 11, color: "bg-pink-100" },
    { id: 2, name: "Diseño de personajes", pins: 10, color: "bg-purple-100" },
    { id: 3, name: "Fotos de fondo de...", pins: 8, color: "bg-blue-100" },
    { id: 4, name: "Fondo de pantalla de...", pins: 6, color: "bg-green-100" },
    { id: 5, name: "Dibujos animados...", pins: 4, color: "bg-yellow-100" },
    { id: 6, name: "Ilustraciones", pins: 4, color: "bg-indigo-100" },
    { id: 7, name: "Manualidades rapidas", pins: 4, color: "bg-orange-100" },
    { id: 8, name: "Dibujos bonitos", pins: 3, color: "bg-red-100" },
  ];

  return (
    <div className="px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Tus ideas guardadas</h1>
        <button className="flex items-center gap-2 text-[#e60023] font-semibold hover:underline">
          <FaPlus /> Crear
        </button>
      </div>
      
      <nav className="flex gap-6 border-b border-gray-200 mb-6">
        <Link to="/guardados/pines" className="text-gray-600 hover:text-gray-900 font-semibold pb-2">Pines</Link>
        <Link to="/tableros" className="text-[#e60023] font-semibold border-b-2 border-[#e60023] pb-2">Tableros</Link>
        <Link to="/guardados/collages" className="text-gray-600 hover:text-gray-900 font-semibold pb-2">Collages</Link>
      </nav>

      <article className="bg-gray-50 rounded-2xl p-8 text-center mb-8">
        <h3 className="text-xl font-bold mb-2">Lleva un registro de lo que te inspira</h3>
        <p className="text-gray-500 mb-4">
          Los tableros te permiten organizar los Pines que guardas en colecciones.
        </p>
        <button className="bg-[#e60023] text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700">
          Crear tablero
        </button>
      </article>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link key={board.id} to={`/tablero/${board.id}`} className={`${board.color} p-4 rounded-2xl hover:shadow-lg transition-all group`}>
            <div className="flex items-start justify-between">
              <FaFolder className="text-4xl text-gray-600" />
              <span className="text-sm text-gray-500">{board.pins} Pines</span>
            </div>
            <h3 className="font-semibold mt-3 group-hover:text-[#e60023] transition-colors">{board.name}</h3>
          </Link>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="text-gray-500 text-sm mb-4">Ideas sin organizar</h2>
        <button className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center text-gray-500 hover:border-[#e60023] hover:text-[#e60023] transition-colors">
          Organizar
        </button>
      </section>
    </div>
  );
}

export default Tableros;