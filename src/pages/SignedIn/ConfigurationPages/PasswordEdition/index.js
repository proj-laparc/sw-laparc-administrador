import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import SideBar from '../../../../components/SideBar';
import HamburgerBtn from '../../../../components/HamburgerBtn';
import {
  Background,
  Container,
  Header,
  AddUserButton,
  Dashboard,
  Cover,
  TitleContainer,
  Title,
  InformationContainer,
  LabelContainer,
  OptionsContainer,
  InputContainer,
  EditionDashboard,
  ButtonsContainer,
  EditButton,
  CancelButton,
} from './styles';
import { animations } from '../../../../assets';
import { useAuth } from '../../../../context/AuthContext';
import { useToast } from '../../../../context/ToastContext';
import api from '../../../../services/api';

export default function PasswordEdition({ setEditPasswordMode }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({});
  const [open, setOpen] = useState(false)
  function handleChange(e) {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  }

  function validateInputs() {
    const values = Object.values(passwordData);
    if (values.length < 3 || values.includes('')) {
      return true;
    } else {
      return false;
    }
  }

  async function handleSubmit() {
    //erros do back: senha igual a passada, senha atual errada e senha fraca
    if (passwordData.newPassword !== passwordData.reNewPassword) {
      addToast({
        type: 'error',
        title: 'Erro ao redefinir senha',
        description: 'A confirmação da sua nova senha está diferente da senha',
      });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      addToast({
        type: 'error',
        title: 'Erro ao redefinir senha',
        description: 'A sua nova senha deve possuir no mínimo 6 caracteres',
      });
      return;
    }
    setLoading(true);
    try {
      const data = {
        senha_atual: passwordData.password,
        senha: passwordData.newPassword,
      };
      const response = await api.patch('/admins/alterar-senha', data);
      setEditPasswordMode(false);
      addToast({
        type: 'success',
        title: 'Senha alterada com sucesso!',
      });
    } catch (err) {
      if (err.response?.data?.error?.includes("Senha atual incorreta")) {
        addToast({
          type: 'error',
          title: 'Erro ao alterar senha',
          description: "A senha atual fornecida está incorreta"
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao alterar senha',
        });
      }
    } 
    setLoading(false);
  }

  return (
    <Background>
      <SideBar activeOption={'config'} open={open} />
      <Cover open={open} onClick={() => setOpen(false)}/>
      <Container>
        <Header>
        <HamburgerBtn
            isOpen={open}
            open={open}  
            menuClicked={()=>setOpen(!open)}
            width={20}
            height={17}
            strokeWidth={2}
            rotate={0}
            color='#99a3ae'
            borderRadius={0}
            animationDuration={0.5}
        />
          <h1>Configurações</h1>
        </Header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '3.4%',
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/adicionar-usuario">
            <AddUserButton>
              <h1>Adicionar administrador</h1>
            </AddUserButton>
          </Link>
        </div>
        <Dashboard>
          <TitleContainer>
            <Title>Conta</Title>
          </TitleContainer>
          <InformationContainer>
          
              <LabelContainer>
                <p>Nome</p>
                <h3>{user.nome}</h3>
              </LabelContainer>
              <LabelContainer marginLeft={4}>
                <p>Sobrenome</p>
                <h3>{user.sobrenome}</h3>
              </LabelContainer>
            
            <LabelContainer marginTop={3}>
              <p>Email</p>
              <h3>{user.email}</h3>
            </LabelContainer>
          </InformationContainer>
          <OptionsContainer>
            <button>
              <h3>Deletar conta</h3>
            </button>
          </OptionsContainer>
        </Dashboard>
        <EditionDashboard>
          <InputContainer>
            <p>Senha atual</p>
            <input name="password" type={'password'} onChange={e => handleChange(e)} />
          </InputContainer>
          <InputContainer marginTop={2.5}>
            <p>Nova senha</p>
            <input name="newPassword" type={'password'} onChange={e => handleChange(e)} />
          </InputContainer>
          <InputContainer marginTop={2.5}>
            <p>Confirmar nova senha</p>
            <input name="reNewPassword" type={'password'} onChange={e => handleChange(e)} />
          </InputContainer>
          <ButtonsContainer>
            <CancelButton onClick={() => setEditPasswordMode(false)}>
              <p>Cancelar</p>
            </CancelButton>
            <EditButton
              disabled={validateInputs() ? true : false}
              onClick={handleSubmit}
            >
              {loading ? (
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: animations.loadingBalls,
                  }}
                  height={35}
                  width={30}
                />
              ) : (
                <p>Salvar Alterações</p>
              )}
            </EditButton>
          </ButtonsContainer>
        </EditionDashboard>
      </Container>
    </Background>
  );
}
