import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Explorar from './pages/Explorar';
import Tableros from './pages/Tableros';
import Crear from './pages/Crear';
import Notificaciones from './pages/Notificaciones';
import Mensajes from './pages/Mensajes';
import CrearPin from './pages/CrearPin';
import Perfil from './pages/Perfil';
import Guardados from './pages/Guardados';
import Configuracion from './pages/Configuracion';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/explorar" element={<Explorar />} />
            <Route path="/tableros" element={<Tableros />} />
            <Route path="/crear" element={<Crear />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
            <Route path="/mensajes" element={<Mensajes />} />
            <Route path="/crear/pin" element={<CrearPin />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/guardados" element={<Guardados />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;