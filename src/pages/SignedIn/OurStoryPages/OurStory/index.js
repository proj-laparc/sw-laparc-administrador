import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import HamburgerBtn from '../../../../components/HamburgerBtn';
import SideBar from '../../../../components/SideBar';
import {
  Background,
  Container,  
  Header,
  Cover,
  Dashboard,
  TitleContainer,
  Title,
  Description,
  PicturesContainer,
  Picture,
  LoadingContainer,
  Subtitle,
  LanguagesContainer,
  LanguageButton,
  EditButton,
} from './styles';
import { icons, animations } from '../../../../assets';
import EditOurStory from '../EditOurStory';
import api from '../../../../services/api';
import { useToast } from '../../../../context/ToastContext';

export default function OurStory() {
  const { addToast } = useToast();
  
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [language, setLanguage] = useState('portugues');
  const [open, setOpen] = useState(false);

  async function loadOurStory() {
    setLoading(true);
    try {
      const response = await api.get('/textos/5');
      const { data } = response;
      setData(data);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar nossa história',
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    loadOurStory();
  }, []);

  if (editMode) {
    return (
      <EditOurStory
        language={language}
        setLanguage={setLanguage}
        initialData={data}
        setInitialData={setData}
        setEditMode={setEditMode}
      />
    );
  }

  return (
    <Background>
      <SideBar activeOption={'folder'} open={open} />
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
          <h1>Nossa História</h1>
        </Header>
        {loading ? (
          <LoadingContainer>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animations.redLoadingBalls,
              }}
              height={150}
              width={150} 
            />
            <Subtitle>Carregando...</Subtitle>
          </LoadingContainer>
        ) : ( 
            <Dashboard>
              <LanguagesContainer>
                <LanguageButton
                  onClick={() => setLanguage('portugues')}
                  enabled={language === 'portugues'}
                >
                  <img src={icons.brazilian} alt="portugues" />
                </LanguageButton>
                <LanguageButton
                  onClick={() => setLanguage('espanhol')}
                  enabled={language === 'espanhol'}
                >
                  <img src={icons.spanish} alt="espanhol" />
                </LanguageButton>
                <LanguageButton
                  onClick={() => setLanguage('ingles')}
                  enabled={language === 'ingles'}
                >
                  <img src={icons.english} alt="ingles" />
                </LanguageButton>
              </LanguagesContainer>
              
            <TitleContainer>
              <div></div>
              <Title>{data.nome}</Title>
              <div>
                <EditButton onClick={() => setEditMode(true)}>
                  {icons.edit}
                </EditButton>
              </div>
            </TitleContainer>
            <Description>
              <h3>{data[language]}</h3>
            </Description>
            <div style={{marginTop: 20}}>
              <PicturesContainer length={data.fotos?.slice(0,2).length}>
              {data.fotos?.slice(0,2).map((foto) => (
                <Picture
                  src={
                    foto.preview
                      ? foto.preview
                      : foto.image_url
                  }
              />
              ))}
              </PicturesContainer>
              <PicturesContainer length={data.fotos?.slice(2,4).length}>
              {data.fotos?.slice(2,4).map((foto) => (
                <Picture
                  src={
                    foto.preview
                      ? foto.preview
                      : foto.image_url
                  }
              />
              ))}
              </PicturesContainer>
            </div>
          </Dashboard>
        )}
      </Container>
    </Background>
  );
}
