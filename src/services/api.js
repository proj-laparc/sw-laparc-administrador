import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.laparc.com.br/',
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('@Laparc:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default api;
