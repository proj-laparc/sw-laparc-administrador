import React, {useState} from 'react';

import {
  Container,
  TitleContainer,
  ProfileContainer,
  SideBarContainer,
  LogoutContainer,
  
} from './styles';

import SideBarOption from '../SideBarOption';
import { useAuth } from '../../context/AuthContext';
 
export default function SideBar({ activeOption, activeSubOption, open}) {
  const { signOut, user } = useAuth();

  function isActive(icon) {
    if (activeOption === icon) {
      return true;
    }
  }

  const contentsSubOptions = [
    {
      id: 1,
      title: 'Notícias',
      route: "/noticias",
      name: 'news',
    },
    {
      id: 2,
      title: 'Publicações Científicas',
      route: "/publicacoes-cientificas",
      name: 'scientificPubs',
    },
  ];
  return (
    <Container open={open}>
      <TitleContainer open={open}>
        <h1>LapARC</h1>
        
      </TitleContainer>
      <ProfileContainer>
          <h1>{`${user.nome} ${user.sobrenome}`}</h1>
          <h3>{user.email}</h3>
        </ProfileContainer>
        <SideBarContainer>
          <SideBarOption
            title="Pacientes"
            route="/pacientes"
            icon="patients"
            stroke={true}
            active={isActive('patients')}
          />
          <SideBarOption
            title="Conteúdos"
            icon="contents"
            stroke={true}
            active={isActive('contents')}
            activeSubOption={activeSubOption}
            subOptions={contentsSubOptions}
          />
          <SideBarOption
            title="Perguntas Frequentes"
            route="/perguntas-frequentes"
            icon="faq"
            stroke={true}
            active={isActive('faq')}
          />
          <SideBarOption
            title="Nossa História"
            route="/nossa-historia"
            icon="folder"
            fill={true}
            active={isActive('folder')}
          />
          <SideBarOption
            title="Quem Somos"
            route="/quem-somos"
            icon="admin"
            fill={true}
            active={isActive('admin')}
          />
          <SideBarOption
            title="Configurações"
            route="/configuracoes"
            icon="config"
            fill={true}
            active={isActive('config')}
          />
        </SideBarContainer>
        <LogoutContainer>
          <button onClick={signOut}>
            <SideBarOption title="Sair" icon="logout" fill={true} />
          </button>
        </LogoutContainer>
    </Container>
  );
}
