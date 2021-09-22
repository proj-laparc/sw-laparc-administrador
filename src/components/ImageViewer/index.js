import React from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';

import {
  Container,
  ContentContainer,
  TitleContainer,
  ButtonsContainer,
  ViewButton,
  IconButton,
} from './styles';
import { icons } from '../../assets';

export default function ImageViewer({ data, route }) {
  return (
    <Container>
      <ContentContainer>
        <TitleContainer>
          <h1>{data.titulo}</h1>
          <Link
            to={{
              pathname: route,
              state: {
                data,
              },
            }}
          >
            <IconButton>{icons.edit}</IconButton>
          </Link>
        </TitleContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10,
            paddingBottom: 40,
          }}
        >
          <img
            src={`https://storage-fluxo.nyc3.digitaloceanspaces.com/laparc/${data.file_name}`}
            alt="new"
            
            key={data.id.toString()}
          />
        </div>
      </ContentContainer>
    </Container>
  );
}
