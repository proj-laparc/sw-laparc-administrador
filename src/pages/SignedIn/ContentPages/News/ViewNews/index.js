import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import Lottie from 'react-lottie';

import SideBar from '../../../../../components/SideBar';
import HamburgerBtn from '../../../../../components/HamburgerBtn';
import {
  Background,
  Container,
  Header,
  HeaderContent,
  Cover,
  SearchBar,
  AddNewButton,
  AddNewPlusButton,
  NewsDashboard,
  LoadMoreContainer,
  LoadingContainer,
  Subtitle,
} from './styles';
import YoutubePlayer from '../../../../../components/YoutubePlayer';
import ImageViewer from '../../../../../components/ImageViewer';
import AudioPlayer from '../../../../../components/AudioPlayer';
import PdfViewer from '../../../../../components/PdfViewer';
import { useToast } from '../../../../../context/ToastContext';
import api from '../../../../../services/api';
import { animations } from '../../../../../assets';
import { BiPlus } from 'react-icons/bi';

export default function ViewNews() {
  const { addToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [numberOfNews, setNumberOfNews] = useState(0);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [open, setOpen] = useState(false)

  async function loadNews(loadMore) {
    !(numberOfNews === 0) && setLoadingMore(true);
    searchText === '' && !loadMore && setLoading(true);
    try {
      const response = searchText
        ? await api.get(
            `/noticias/search/${searchText}/${numberOfNews}/${
              numberOfNews + 6
            }`,
          )
        : await api.get(`/noticias/listar/${numberOfNews}/${numberOfNews + 6}`);
      setTotal(response.data[0].quantidade);
      setNumberOfNews(numberOfNews + 6);
      setNews([...news, ...response.data[1]]);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar notícias',
      });
    }
    numberOfNews === 0 ? setLoading(false) : setLoadingMore(false);
    searchText === '' && setLoading(false);
  }

  const delayedQuery = useRef(
    debounce(text => {
      setNotFound(false);
      text ? searchNew(text) : loadNews();
    }, 1000),
  ).current;

  function handleChange(e) {
    delayedQuery(e.target.value);
    setNumberOfNews(0);
    setTotal(0);
  }

  async function searchNew(text) {
    setLoading(true);
    setNumberOfNews(0);
    try {
      const response = await api.get(
        `/noticias/search/${text}/${numberOfNews}/${numberOfNews + 6}`,
      );
      if (response.data[1].length === 0) {
        setNotFound(true);
        return;
      }
      setNews([...news, ...response.data[1]]);
      setTotal(response.data[0].quantidade);
      setNumberOfNews(numberOfNews + 6);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar notícias',
      });
    }
    setLoading(false);
  }

  function renderRightType(data) {
    if (data.tipo === 'youtube') {
      return (
        <YoutubePlayer
          key={data.id.toString()}
          data={data}
          route={"/editar-noticia"}
        />
      );
    } else if (data.tipo === 'image') {
      return (
        <ImageViewer
          key={data.id.toString()}
          data={data}
          route={"/editar-noticia"} />
      );
    } else if (data.tipo === 'audio') {
      return (
        <AudioPlayer
          key={data.id.toString()}
          data={data}
          route={"/editar-noticia"} />
      );
    } else {
      return (
        <PdfViewer key={data.id.toString()}
          data={data}
          route={"/editar-noticia"} />
      );
    }
  }
 
  useEffect(() => {
    loadNews();
  }, []);
 
  return (
    <Background>
      <SideBar activeOption={'contents'} activeSubOption={'news'} open={open} />
      <Cover open={open} onClick={() => setOpen(false)}/>
      <Container>
        <Header>
          <HeaderContent>
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
            <h1>Notícias</h1>
            </HeaderContent>
          
          <SearchBar>
            <FiSearch color="#C2CFE0" size={15} />
            <input
              placeholder="Pesquisar notícia"
              value={searchText}
              onChange={e => (handleChange(e), setSearchText(e.target.value))}
            />
          </SearchBar>
        </Header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '3.4%',
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/adicionar-noticia">
            <AddNewButton>
              <h1>Adicionar Notícia</h1>
            </AddNewButton>
            <AddNewPlusButton>
              <BiPlus/>
            </AddNewPlusButton>
          </Link>
        </div>
        <NewsDashboard>
          {loading || notFound ? (
            <LoadingContainer notFound={notFound}>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: notFound
                    ? animations.medicine
                    : animations.new,
                }}
                height={notFound ? 400 : 350}
                width={notFound ? 400 : 350}
              />
              <Subtitle>
                {notFound ? 'Nenhum resultado encontrado...' : 'Carregando...'}
              </Subtitle>
            </LoadingContainer>
          ) : (
            <section>
              {news.map(userNew => renderRightType(userNew))}
              {numberOfNews < total &&
                (loadingMore ? (
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: animations.redLoadingBalls,
                    }}
                    height={60}
                    width={60}
                  />
                ) : (
                  <LoadMoreContainer>
                    <button onClick={() => loadNews(true)}>
                      Mais notícias
                    </button>
                  </LoadMoreContainer>
                ))}
            </section>
          )}
        </NewsDashboard>
      </Container>
    </Background>
  );
}
