import React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const { addToast } = useToast();
  const history = useHistory();

  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('@Laparc:token');
    if (token) {
      return token;
    }
    return '';
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    const refreshToken = localStorage.getItem('@Laparc:refreshToken');
    if (refreshToken) {
      return refreshToken;
    }
    return '';
  });
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem('@Laparc:user');
    if (user) {
      return JSON.parse(user);
    }
    return {};
  });

  const signIn = useCallback(async (email, password, setLoading) => {
    setLoading(true);
    try {
      const data = {
        email,
        senha: password,
      };
      const response = await api.post('/admins/login', data);
      const { token, refresh_token } = response.data[0];
      const user = response.data[1];

      history.push("/pacientes");
      addToast({
        type: 'success',
        title: 'Login efetuado com sucesso',
        description: `Bem vindo ao Laparc, ${user.nome}!`,
      });
      localStorage.setItem('@Laparc:token', token);
      localStorage.setItem('@Laparc:refreshToken', refresh_token);
      localStorage.setItem('@Laparc:user', JSON.stringify(user));
      setToken(token);
      setRefreshToken(refreshToken);
      setUser(user);
    } catch (err) {
      if (err?.response?.data?.error?.includes("email ou senha incorretos")) {
        addToast({
          type: 'error',
          title: 'Erro no Login',
          description: "E-mail ou senha incorretos"
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro no Login',
        });
      }
    }
    setLoading(false);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Laparc:token');
    localStorage.removeItem('@Laparc:user');
    localStorage.removeItem('@Laparc:refreshToken');
    setToken('');
    history.push('/');
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, token, refreshToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
