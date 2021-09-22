import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import { FiArrowLeft } from 'react-icons/fi';
 
import { useToast } from '../../../context/ToastContext';
import { animations } from '../../../assets';
import api from '../../../services/api';
import {
  Container,
  BackButton,
  LogoLaparc,
  RegisterTitle,
  RegisterSubtitle,
  Inputs,
  InputContainer,
  InputType,
  Input,
  SubmitButton,
} from './styles';
import { icons } from '../../../assets';

export default function Regitser() {
  const history = useHistory();
  const { addToast } = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const data = {
        nome: firstName,
        sobrenome: lastName,
        email,
        link: 'https://laparc.netlify.app/redefinir-senha/active/',
      };
      const response = await api.post('/admins/cadastrar', data);
      addToast({
        type: 'info',
        title: 'Usuário cadastrado com sucesso!',
        description: 'Confira o email cadastrado para confirmação',
      });
      history.push("/configuracoes");
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no ao cadastrar usuário',
      });
    }
    setLoading(false);
  }

  function validateInputs() {
    if (firstName === '' || lastName === '' || email === '') {
      return true;
    } else if (loading) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Container>
      <BackButton to="/configuracoes">
        <FiArrowLeft size={40} color="#404040" />
      </BackButton>
      <LogoLaparc src={icons.logoLaparc} />
      <RegisterTitle>Cadastrar novo usuário</RegisterTitle>
      <RegisterSubtitle>
        Digite as informações do novo usuário e ele receberá um email com mais
        informações!
      </RegisterSubtitle>
      <Inputs>
        <InputContainer>
          <InputType>Nome</InputType>
          <Input
            placeholder="Insira seu nome"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </InputContainer>
        <InputContainer marginTop={19}>
          <InputType>Sobrenome</InputType>
          <Input
            placeholder="Insira seu sobrenome"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </InputContainer>
        <InputContainer marginTop={19}>
          <InputType>E-mail</InputType>
          <Input
            placeholder="Insira o e-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputContainer>
      </Inputs>
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
          'Cadastrar'
        )}
      </SubmitButton>
    </Container>
  );
}
