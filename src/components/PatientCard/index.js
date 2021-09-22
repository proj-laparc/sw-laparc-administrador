import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Name, Email, ViewButton } from './styles';

export default function PatientCard({ name, email, data }) {
  return (
    <Container>
      <Name>{name?.length > 30 ? `${name.slice(0, 30)}...` : name}</Name>
      <Email>
        {email
          ? email?.length > 62
            ? `${email.slice(0, 62)}...`
            : email
          : 'Paciente ainda não tem um email cadastrado'}
      </Email>
      <ViewButton>
        <Link
          to={{
            pathname: "/ver-paciente",
            state: {
              data,
            },
          }}
          style={{ textDecoration: 'none' }}
        >
          <h1>Visualizar</h1>
        </Link>
      </ViewButton>
    </Container>
  );
}
