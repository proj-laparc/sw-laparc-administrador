import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import ReactPlayer from 'react-player';

import {
  Container,
  ContentContainer,
  TitleContainer,
  ButtonsContainer,
  ViewButton,
  IconButton,
} from './styles';
import { icons, animations } from '../../assets';

export default function AudioPlayer({ data, route }) {
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
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animations.audio,
            }}
            height={300}
          />
          <ReactPlayer
            controls={true}
            key={data.id.toString()}
            width={"90%"}
            height={50}
            url={`https://storage-laparc.nyc3.digitaloceanspaces.com${data.file_name}`}
          />
        </div>
      </ContentContainer>
      {/*<ButtonsContainer>
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
        <a
          href={`https://storage-laparc.nyc3.digitaloceanspaces.com${data.file_name}`}
          target="_blank"
          style={{ display: 'inline-block' }}
        >
          <ViewButton>Visualizar</ViewButton>
        </a>
        </ButtonsContainer>*/}
    </Container>
  );
}
