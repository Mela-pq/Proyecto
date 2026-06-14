import { FaSearch, FaCamera } from 'react-icons/fa';

function SearchBar({ placeholder, className = "" }) {
  return (
    <form className={`bg-gray-100 rounded-full px-5 py-3 flex items-center gap-3 ${className}`}>
      <FaSearch className="text-gray-400 text-xl" />
      <input 
        type="text" 
        placeholder={placeholder || "Buscar"}
        className="bg-transparent flex-1 outline-none text-gray-700 text-base"
      />
      <FaCamera className="text-gray-400 text-xl cursor-pointer hover:text-gray-600 transition-colors" />
    </form>
  );
}

export default SearchBar;