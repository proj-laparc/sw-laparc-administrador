import React, { useEffect, useState, useRef } from 'react';
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
  AddPubButton,
  AddPubPlusButton,
  PubsDashboard,
  LoadMoreContainer,
  LoadingContainer,
  Subtitle,
} from './styles';
import YoutubePlayer from '../../../../../components/YoutubePlayer';
import ImageViewer from '../../../../../components/ImageViewer';
import PdfViewer from '../../../../../components/PdfViewer';
import AudioPlayer from '../../../../../components/AudioPlayer';
import { useToast } from '../../../../../context/ToastContext';
import api from '../../../../../services/api';
import { animations } from '../../../../../assets';
import { BiPlus } from 'react-icons/bi';

export default function ViewScientificPubs() {
  const { addToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [pubs, setPubs] = useState([]);
  const [numberOfPubs, setNumberOfPubs] = useState(0);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [open, setOpen] = useState(false)

  async function loadPubs(loadMore) {
    !(numberOfPubs === 0) && setLoadingMore(true);
    searchText === '' && !loadMore && setLoading(true);
    try {
      const response = searchText
        ? await api.get(
            `/pub_cientificas/search/${searchText}/${numberOfPubs}/${
              numberOfPubs + 6
            }`,
          )
        : await api.get(
            `/pub_cientificas/listar/${numberOfPubs}/${numberOfPubs + 6}`,
          );
      setTotal(response.data[0].quantidade);
      setNumberOfPubs(numberOfPubs + 6);
      setPubs([...pubs, ...response.data[1]]);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar publicações',
      });
    }
    numberOfPubs === 0 ? setLoading(false) : setLoadingMore(false);
    searchText === '' && setLoading(false);
  }

  const delayedQuery = useRef(
    debounce(text => {
      setNotFound(false);
      text ? searchPub(text) : loadPubs();
    }, 1000),
  ).current;

  function handleChange(e) {
    delayedQuery(e.target.value);
    setNumberOfPubs(0);
    setTotal(0);
  }

  async function searchPub(text) {
    setLoading(true);
    setNumberOfPubs(0);
    try {
      const response = await api.get(
        `/pub_cientificas/search/${text}/${numberOfPubs}/${numberOfPubs + 6}`,
      );
      if (response.data[1].length === 0) {
        setNotFound(true);
        return;
      }
      setPubs([...pubs, ...response.data[1]]);
      setTotal(response.data[0].quantidade);
      setNumberOfPubs(numberOfPubs + 6);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar publicações',
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
          route={"/editar-publicacao"}
        />
      );
    } else if (data.tipo === 'image') {
      return (
        <ImageViewer
          key={data.id.toString()}
          data={data}
          route={"/editar-publicacao"}
        />
      );
    } else if (data.tipo === 'audio') {
      return (
        <AudioPlayer
          key={data.id.toString()}
          data={data}
          route={"/editar-publicacao"}
        />
      );
    } else {
      return (
        <PdfViewer
          key={data.id.toString()}
          data={data}
          route={"/editar-publicacao"}
        />
      );
    }
  }

  useEffect(() => {
    loadPubs();
  }, []);

  return (
    <Background>
      <SideBar activeOption={'contents'} activeSubOption={'scientificPubs'} open={open} />
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
            <h1>Publicação Científica</h1>
          </HeaderContent>
          <SearchBar>
            <FiSearch color="#C2CFE0" size={15} />
            <input
              placeholder="Pesquisar publicação científica"
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
          <Link style={{ textDecoration: 'none' }} to="/adicionar-publicacao">
            <AddPubButton>
              <h1>Adicionar Publicação</h1>
            </AddPubButton>
            <AddPubPlusButton>
              <BiPlus/>
            </AddPubPlusButton>
          </Link>
        </div>
        <PubsDashboard>
          {loading || notFound ? (
            <LoadingContainer notFound={notFound}>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: notFound
                    ? animations.medicine
                    : animations.atom,
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
              {pubs.map(pub => renderRightType(pub))}
              {numberOfPubs < total &&
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
                    <button onClick={() => loadPubs(true)}>
                      Mais publicações
                    </button>
                  </LoadMoreContainer>
                ))}
            </section>
          )}
        </PubsDashboard>
      </Container>
    </Background>
  );
}
