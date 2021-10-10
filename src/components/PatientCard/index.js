import React from 'react'; 
import { Link } from 'react-router-dom';

import { Container, Name, Email, Project,ViewButton, Group } from './styles';

export default function PatientCard({ name, email,project, data }) {
  return (
    <Container>
      <Name>{name}</Name>
      <Email>
        {email ?? 'Paciente ainda não tem um email cadastrado'}
      </Email>
      <Group>
        <Project>
          {project}
        </Project>
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
      </Group>
    </Container>
  );
}
