import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';

import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Title,
  Subtitle,
  Footer,
  Button,
  AlternativeButton,
} from './styles';
import { animations } from '../../assets';

export default function Home() {
  const { signOut } = useAuth();
  return (
    <Container>
      <Title>
        Bem vindo ao <span style={{ color: '#A7A7A7' }}>Laparc</span>!
      </Title>
      <div>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animations.programming,
          }}
          height={330}
          width={330}
        />
        <Subtitle>Em desenvolvimento...</Subtitle>
      </div>
      <Footer>
        <AlternativeButton onClick={signOut}>Sair</AlternativeButton>
        <Link to="/adicionar-usuario">
          <Button>Cadastrar</Button>
        </Link>
      </Footer>
    </Container>
  );
}
