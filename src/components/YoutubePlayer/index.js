import React from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';

import {
  Container,
  ContentContainer,
  TitleContainer,
  IconButton,
  StyledReactPlayer
} from './styles';
import { icons } from '../../assets';
 
export default function YoutubePlayer({ data, route }) {
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
          }}
        >
          <StyledReactPlayer
            
            controls={true}
            key={data.id.toString()}
            url={data.file_name}
          />
        </div>
      </ContentContainer>
    </Container>
  );
}
