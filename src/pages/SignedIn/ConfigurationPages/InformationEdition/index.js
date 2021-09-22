import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';

import SideBar from '../../../../components/SideBar';
import HamburgerBtn from '../../../../components/HamburgerBtn';
import {
  Background,
  Container,
  Header,
  AddUserButton,
  Cover,
  Dashboard,
  TitleContainer,
  Title,
  InformationContainer,
  InputContainer,
  ButtonsContainer,
  CancelButton,
  EditButton,
} from './styles';
import { animations } from '../../../../assets';
import api from '../../../../services/api';
import { useToast } from '../../../../context/ToastContext';

export default function InformationEdition({
  user,
  setUser,
  setEditInformationMode,
}) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(user);
  const [open, setOpen] = useState(false);

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function validateInputs() {
    const values = Object.values(userData);
    if (
      userData.nome === user.nome &&
      userData.sobrenome === user.sobrenome &&
      userData.email === user.email
    ) {
      return true;
    } else if (loading) {
      return true;
    } else if (values.includes('')) {
      return true;
    } else {
      return false;
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const data = {
        email: userData.email,
        nome: userData.nome,
        sobrenome: userData.sobrenome,
      };
      const response = await api.patch(`/admins/${user.id}`, data);
      setUser({ ...user, ...response.data });
      setEditInformationMode(false);
      addToast({
        type: 'success',
        title: 'Informações editadas com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no ao editar informações',
      });
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
    
              <InputContainer>
                <p>Nome</p>
                <input
                  value={userData.nome}
                  name="nome"
                  onChange={e => handleChange(e)}
                />
              </InputContainer>
              <InputContainer>
                <p>Sobrenome</p>
                <input
                  value={userData.sobrenome}
                  name="sobrenome"
                  onChange={e => handleChange(e)}
                />
              </InputContainer>
    
            <InputContainer marginTop={2.6}>
              <p>Email</p>
              <input
                value={userData.email}
                name="email"
                onChange={e => handleChange(e)}
              />
            </InputContainer>
          </InformationContainer>
          <ButtonsContainer>
            <CancelButton onClick={() => setEditInformationMode(false)}>
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
        </Dashboard>
      </Container>
    </Background>
  );
}
