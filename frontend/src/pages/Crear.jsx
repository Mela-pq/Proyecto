import { Link } from 'react-router-dom';
import { FaImage, FaFolder, FaPalette } from 'react-icons/fa';

function Crear() {
  const createOptions = [
    { id: 1, name: "Pin", description: "Publica tus fotos o videos, y agrega enlaces, stickers, efectos y más", icon: <FaImage />, color: "bg-red-50", link: "/crear/pin" },
    { id: 2, name: "Tablero", description: "Crea un tablero para organizar una colección de tus Pines favoritos", icon: <FaFolder />, color: "bg-blue-50", link: "/crear/tablero" },
    { id: 3, name: "Collage", description: "Combina ideas para construir tu visión y crear algo nuevo.", icon: <FaPalette />, color: "bg-purple-50", link: "/crear/collage" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Crear</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {createOptions.map((option) => (
            <Link 
              key={option.id}
              to={option.link}
              className={`${option.color} p-6 rounded-2xl hover:shadow-lg transition-all group`}
            >
              <div className="text-4xl text-gray-600 mb-4">{option.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#e60023] transition-colors">{option.name}</h3>
              <p className="text-gray-600 text-sm">{option.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Crear;