import { FaUserPlus, FaComment } from 'react-icons/fa';

function Mensajes() {
  return (
    <div className="ml-20">
      <header className="fixed top-0 left-20 right-0 bg-white z-50 px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Mensajes</h1>
      </header>
      
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-500 text-sm">MENSAJE NUEVO</h2>
            <button className="flex items-center gap-2 text-[#e60023] font-semibold hover:underline">
              <FaUserPlus /> Invita a tus amigos
            </button>
          </div>
          <p className="text-gray-400 text-sm text-center py-8">
            Conéctense para comenzar a chatear
          </p>
        </section>

        <section className="text-center py-12">
          <div className="bg-gray-50 rounded-2xl p-8">
            <FaComment className="text-5xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Inicia una conversación</h3>
            <p className="text-gray-500 text-sm">
              Usa los mensajes para chatear con amigos, compartir Pines y tableros, 
              y planear ideas juntos. Tus conversaciones aparecerán aquí.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Mensajes;