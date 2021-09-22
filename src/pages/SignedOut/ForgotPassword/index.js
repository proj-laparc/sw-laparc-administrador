import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import { FiArrowLeft } from 'react-icons/fi';

import {
  Container,
  LogoLaparc,
  ForgotPasswordTitle,
  ForgotPasswordSubtitle,
  InputContainer,
  InputType,
  Input,
  SubmitButton,
  BackButton,
} from './styles';
import { icons, animations } from '../../../assets';
import { useToast } from '../../../context/ToastContext';
import api from '../../../services/api';

export default function Register() {
  const history = useHistory();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const data = {
        email,
        link: 'https://laparc.netlify.app/redefinir-senha/forgot/',
      };
      const response = await api.post('/admins/esqueci-minha-senha', data);
      addToast({
        type: 'info',
        title:
          'Um email foi enviado com as informações para a redefinição de senha',
      });
      history.push('/');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao redefinir senha',
      });
    }
    setLoading(false);
  }

  function validateInputs() {
    if (email === '') {
      return true;
    } else if (loading) {
      return true;
    } else {
      return false;
    }
  } 
  return (
    <Container>
      <BackButton to="/">
        <FiArrowLeft  color="#404040" />
      </BackButton>
      <LogoLaparc src={icons.logoLaparc} />
      <ForgotPasswordTitle>Esqueceu sua senha?</ForgotPasswordTitle>
      <ForgotPasswordSubtitle>
        Digite seu email para redefinir sua senha
      </ForgotPasswordSubtitle>
      <InputContainer marginTop={5}>
        <InputType>E-mail</InputType>
        <Input
          placeholder="Insira seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </InputContainer>
      <SubmitButton
        type="submit"
        onClick={handleSubmit}
        disabled={validateInputs() ? true : false}
      >
        {loading ? (
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animations.loadingBalls,
            }}
            height={50}
            width={50}
          />
        ) : (
          'Enviar'
        )}
      </SubmitButton>
    </Container>
  );
}
