import React, { createContext, useState, useContext, useCallback } from 'react';
//gera um id único
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

const ToastContext = createContext();
export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addToast = useCallback(({ type, title, description }) => {
    const id = uuid();
    const toast = {
      id,
      type,
      title,
      description,
    };
    setMessages(state => [...state, toast]);
  }, []);

  const removeToast = useCallback(id => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
