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

api.interceptors.response.use(
  response => {
    return response;
  },
  async err => {
    const originalReq = err.config;
    if (err.response.status === 401 && err.config && !err.config._retry) {
      const refreshToken = localStorage.getItem('@Laparc:refreshToken');
      try {
        const apiRefresh = axios.create({
          baseURL: 'https://api.laparc.com.br/',
        });
        const response = await apiRefresh.get('/refresh-token', {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        localStorage.setItem('@Laparc:token', response.data.token);
        localStorage.setItem('@Laparc:refreshToken', response.data.refresh_token);
        originalReq.headers['Authorization'] = `Bearer ${response.data.token}`;
      } catch (error) {
        console.log(error, 'error');
      }
      return axios(originalReq);
    } else {
      throw err;
    }
  }
);

export default api;
