import { Link } from 'react-router-dom';
import { 
  FaPaw, FaPalette, FaHeart, FaPaintBrush, 
  FaCut, FaUtensils, FaHome, FaMale, 
  FaQuoteRight, FaBrush, FaChevronRight 
} from 'react-icons/fa';

function Explorar() {
  const categories = [
    { id: 1, name: "Animales", icon: <FaPaw className="text-[#e60023]" />, color: "bg-red-50" },
    { id: 2, name: "Art", icon: <FaPalette className="text-purple-600" />, color: "bg-purple-50" },
    { id: 3, name: "Beauty", icon: <FaHeart className="text-pink-600" />, color: "bg-pink-50" },
    { id: 4, name: "Design", icon: <FaPaintBrush className="text-blue-600" />, color: "bg-blue-50" },
    { id: 5, name: "DIY And Crafts", icon: <FaCut className="text-orange-600" />, color: "bg-orange-50" },
    { id: 6, name: "Food And Drink", icon: <FaUtensils className="text-green-600" />, color: "bg-green-50" },
    { id: 7, name: "Home Decor", icon: <FaHome className="text-teal-600" />, color: "bg-teal-50" },
    { id: 8, name: "Mens Fashion", icon: <FaMale className="text-indigo-600" />, color: "bg-indigo-50" },
    { id: 9, name: "Quotes", icon: <FaQuoteRight className="text-yellow-600" />, color: "bg-yellow-50" },
    { id: 10, name: "Tattoos", icon: <FaBrush className="text-gray-600" />, color: "bg-gray-50" },
  ];

  const news = [
    { id: 1, title: "Adjust", description: "It's nice to be back home quick" },
    { id: 2, title: "Nuevas tendencias", description: "Descubre lo último en moda" },
    { id: 3, title: "Inspiración diaria", description: "Ideas para tu día a día" },
  ];

  return (
    <div className="px-6 max-w-6xl mx-auto py-6">
      {/* Título principal */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Explorar lo mejor de Pinterest</h1>
      
      {/* Sección de categorías */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Explorar por categoría</h2>
          <button className="flex items-center gap-1 text-[#e60023] font-semibold hover:underline">
            Ver más <FaChevronRight className="text-sm" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.id}
              to={`/explorar/categoria/${cat.id}`}
              className={`${cat.color} p-4 rounded-2xl hover:shadow-lg transition-all flex flex-col items-center text-center group`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <span className="font-medium text-gray-700 group-hover:text-[#e60023] transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Sección de novedades */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Mira las novedades de Pinterest</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <article key={item.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-all cursor-pointer">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Mensaje de fin */}
      <footer className="text-center py-12 mt-8">
        <p className="text-gray-400">¡Sigue explorando para encontrar más inspiración!</p>
      </footer>
    </div>
  );
}

export default Explorar;