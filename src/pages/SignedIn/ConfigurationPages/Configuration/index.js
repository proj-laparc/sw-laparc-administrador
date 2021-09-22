import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import SideBar from '../../../../components/SideBar';
import HamburgerBtn from '../../../../components/HamburgerBtn/';
import {
  Background,
  Container,
  Header,
  AddUserButton,
  Dashboard,
  TitleContainer,
  Cover,
  Title,
  InformationContainer,
  LabelContainer, 
  OptionsContainer,
} from './styles';
import { icons } from '../../../../assets';
import { useAuth } from '../../../../context/AuthContext';
import { useToast } from '../../../../context/ToastContext';
import api from '../../../../services/api';
import InformationEdition from '../InformationEdition';
import PasswordEdition from '../PasswordEdition';
import DeleteUserAlert from '../../../../components/Alert';

export default function Configuration() {
  const { user, setUser, signOut } = useAuth();
  const { addToast } = useToast();

  const [editInformationMode, setEditInformationMode] = useState(false);
  const [editPasswordMode, setEditPasswordMode] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [open, setOpen] = useState(false)

  const deleteAlert = {
    title: 'Tem certeza que deseja deletar sua conta?',
    description:
      'Ao deletar sua conta, todos os seus dados serão perdidos e o seu acesso à plataforma será bloqueado.',
    options: ['Cancelar', 'Deletar'],
    functions: [null, deleteAccount],
  };
  function handleOpenDeleteAlert() {
    setOpenDeleteAlert(true);
  }
  async function deleteAccount() {
    signOut();
    try {
      const response = await api.get("/textos");
      addToast({
        type: 'success',
        title: 'Sua conta foi deletada com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no ao deletar conta',
      });
    }
  }




  if (editInformationMode) {
    return (
      <InformationEdition
        user={user}
        setUser={setUser}
        setEditInformationMode={setEditInformationMode}
      />
    );
  }

  if (editPasswordMode) {
    return <PasswordEdition setEditPasswordMode={setEditPasswordMode} />;
  }

  return (
    <Background>
      <SideBar activeOption={'config'} open={open}/>
      <DeleteUserAlert
        setOpen={setOpenDeleteAlert}
        open={openDeleteAlert}
        alert={deleteAlert}
      /> 
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
            <button
              onClick={() => setEditInformationMode(!editInformationMode)}
            >
              {icons.edit}
            </button>
          </TitleContainer>
          <InformationContainer>
            
              <LabelContainer>
                <p>Nome</p>
                <h3>{user.nome}</h3>
              </LabelContainer>
              <LabelContainer>
                <p>Sobrenome</p>
                <h3>{user.sobrenome}</h3>
              </LabelContainer>
    
            <LabelContainer>
              <p>Email</p>
              <h3>{user.email}</h3>
            </LabelContainer>
          </InformationContainer>
          <OptionsContainer>
            <button onClick={() => setEditPasswordMode(true)}>
              <h3>Alterar senha</h3>
            </button>
            <button onClick={handleOpenDeleteAlert}>
              <h3>Deletar conta</h3>
            </button>
          </OptionsContainer>
        </Dashboard>
      </Container>
    </Background>
  );
}
