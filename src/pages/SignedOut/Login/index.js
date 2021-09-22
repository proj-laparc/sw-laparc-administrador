import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { useAuth } from '../../../context/AuthContext';
import {
  Container,
  ArcosImage,
  MainLogin,
  LogoLaparc,
  InputType,
  InputContainer,
  Inputs,
  Input,
  PasswordInput,
  PasswordContainer,
  LoginButton,
  ForgotPassword,
  ForgotPasswordContainer,
} from './styles';
import { images, icons, animations } from '../../../assets';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  function validateInputs() {
    if (email === '' || password === '') {
      return true;
    } else if (loading) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit() {
    signIn(email, password, setLoading);
  }

  return (
    <Container>
      <ArcosImage src={images.arcosDaLapa} alt="Arcos da Lapa" />
      <MainLogin>
        <LogoLaparc src={icons.logoLaparc} alt="Logo laparc" />
        <Inputs>
          <InputContainer>
            <InputType>E-mail</InputType>
            <Input
              placeholder="Insira seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputType>Senha</InputType>
            <PasswordContainer>
              <PasswordInput
                placeholder="Insira sua senha"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: '#666666',
                  size: '50px',
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </PasswordContainer>
          </InputContainer>
        </Inputs>
        <LoginButton
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
            'Entrar'
          )}
        </LoginButton>
        <ForgotPasswordContainer to="/esqueci-minha-senha">
          <ForgotPassword>Esqueci minha senha</ForgotPassword>
        </ForgotPasswordContainer>
      </MainLogin>
    </Container>
  );
}
