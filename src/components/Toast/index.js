import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import { useToast } from '../../context/ToastContext';
import { Container } from './styles';

export default function Toast({ message, style }) {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      /*sempre que retornamos uma função dentro do useEffect,
        essa função será executada quando o componente deixar de
        existir. No caso, estamos cancelando o timer, caso o usuário 
        já tenha apertado no botão de deletar o toast, antes do tempo
        acabar*/
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  const icons = {
    info: <FiInfo size={24} />,
    error: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />,
  };

  return (
    <Container
      key={message.id}
      type={message.type}
      noDescription={!message.description}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
        <button type="button" onClick={() => removeToast(message.id)}>
          <FiXCircle size={18} />
        </button>
      </div>
    </Container>
  );
}
