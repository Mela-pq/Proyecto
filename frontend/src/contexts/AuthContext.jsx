import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, registro as apiRegistro, logout as apiLogout, getUsuarioActual, isAuthenticated } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getUsuarioActual();
    const loggedIn = isAuthenticated();
    if (user && loggedIn) {
      setUsuario(user);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    const user = getUsuarioActual();
    setUsuario(user);
    setIsLoggedIn(true);
    return response;
  };

  const registro = async (email, username, password, fecha_nacimiento) => {
    const response = await apiRegistro(email, username, password, fecha_nacimiento);
    return response;
  };

  const logout = () => {
    apiLogout();
    setUsuario(null);
    setIsLoggedIn(false);
  };

  const getNombreUsuario = () => {
    if (!usuario?.email) return 'Usuario';
    return usuario.email.split('@')[0];
  };

  const getEmail = () => {
    return usuario?.email || 'usuario@gmail.com';
  };

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      loading, 
      isLoggedIn,
      login, 
      registro, 
      logout, 
      getNombreUsuario,
      getEmail 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}