function Notificaciones() {
  const notifications = [
    { id: 1, title: "Wallpapers de One Piece para ti", time: "1h", type: "novedad" },
    { id: 2, title: "Kirby para ti", time: "6h", type: "novedad" },
    { id: 3, title: "Esto es para ti", time: "10h", type: "novedad" },
    { id: 4, title: "Tómate un momento a solas", time: "1d", type: "actualizacion" },
    { id: 5, title: "Reflejo perfecto de tu estilo", time: "1d", type: "actualizacion" },
    { id: 6, title: "Tu selección siempre sorprende", time: "1d", type: "actualizacion" },
    { id: 7, title: "Esta inspiración es lo más", time: "2d", type: "actualizacion" },
    { id: 8, title: "Esto va con tu estilo", time: "2d", type: "actualizacion" },
    { id: 9, title: "Todo esto es para ti", time: "2d", type: "actualizacion" },
    { id: 10, title: "Hatsune Miku para ti", time: "3d", type: "actualizacion" },
  ];

  return (
    <div className="ml-20">
      <header className="fixed top-0 left-20 right-0 bg-white z-50 px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Actualizaciones</h1>
      </header>
      
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <section className="mb-8">
          <h2 className="text-[#e60023] font-semibold mb-4">Novedad</h2>
          <ul className="space-y-4">
            {notifications.filter(n => n.type === 'novedad').map((notif) => (
              <li key={notif.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-800">{notif.title}</span>
                <span className="text-sm text-gray-400">{notif.time}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-gray-600 font-semibold mb-4">Actualizaciones</h2>
          <ul className="space-y-4">
            {notifications.filter(n => n.type === 'actualizacion').map((notif) => (
              <li key={notif.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-800">{notif.title}</span>
                <span className="text-sm text-gray-400">{notif.time}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="text-center py-8 text-gray-400 text-sm">Visto</footer>
      </main>
    </div>
  );
}

export default Notificaciones;