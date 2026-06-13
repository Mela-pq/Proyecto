import { BrowserRouter, Routes, Route } from "react-router-dom";

import Subir from "./pages/Subir";
import Usuario from "./pages/Usuario";
import EditarPerfil from "./pages/EditarPerfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Subir />} />
          <Route path="/subir" element={<Subir />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;