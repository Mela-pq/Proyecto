import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ========== AUTENTICACIÓN ==========
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('usuario', JSON.stringify({
      id: response.data.usuario_id,
      username: response.data.username,
      email: email
    }));
  }
  return response.data;
};

export const registro = async (email, username, password, fecha_nacimiento) => {
  const response = await api.post('/usuarios/registro', { email, username, password, fecha_nacimiento });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

export const getUsuarioActual = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// ========== PUBLICACIONES ==========
export const getPublicaciones = async (search = '', limit = 20, offset = 0) => {
  let url = `/publicaciones?limit=${limit}&offset=${offset}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  const response = await api.get(url);
  return response.data;
};

export const getPublicacion = async (id) => {
  const response = await api.get(`/publicaciones/${id}`);
  return response.data;
};

// ✅ FUNCIÓN CORREGIDA - Envía los datos como parámetros individuales
export const crearPublicacion = async (imagen_url, titulo, descripcion, categoria, tags) => {
  console.log('📝 Creando publicación con:', { imagen_url, titulo, descripcion, categoria, tags });
  
  const response = await api.post('/publicaciones/', null, {
    params: {
      imagen_url: imagen_url,
      titulo: titulo || '',
      descripcion: descripcion || '',
      categoria: categoria || 'general',
      tags: tags || ''
    }
  });
  
  console.log('✅ Publicación creada:', response.data);
  return response.data;
};

// ========== LIKES ==========
export const toggleLike = async (publicacionId) => {
  const response = await api.post(`/likes/publicacion/${publicacionId}`);
  return response.data;
};

// ========== GUARDADOS ==========
export const toggleGuardado = async (publicacionId) => {
  const response = await api.post(`/guardados/publicacion/${publicacionId}`);
  return response.data;
};

export const getMisGuardados = async () => {
  const response = await api.get('/guardados/mis-guardados');
  return response.data;
};

// ========== COMENTARIOS ==========
export const getComentarios = async (publicacionId) => {
  const response = await api.get(`/comentarios/publicacion/${publicacionId}`);
  return response.data;
};

export const crearComentario = async (publicacionId, contenido) => {
  const response = await api.post(`/comentarios/publicacion/${publicacionId}`, { contenido });
  return response.data;
};

// ========== SUBIDA DE IMÁGENES ==========
export const subirImagen = async (archivo) => {
  const formData = new FormData();
  formData.append('archivo', archivo);
  
  const response = await api.post('/upload/imagen', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export default api;