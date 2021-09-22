import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';

import SideBar from '../../../../components/SideBar';
import HamburgerBtn from '../../../../components/HamburgerBtn';
import QuestionCard from '../../../../components/QuestionCard';
import api from '../../../../services/api';
import { animations, icons } from '../../../../assets';
import {
  Background,
  Container,
  Header,
  Cover,
  AddQuestionButton,
  QuestionsDashboard,
  LoadingContainer,
  Subtitle,
  LanguagesContainer,
  LanguageButton,
  AddQuestionPlusButton, 

} from './styles';
import { useToast } from '../../../../context/ToastContext';
import { BiPlus } from 'react-icons/bi';

export default function FaqDashboard() {
  const { addToast } = useToast();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('pt');
  const [open, setOpen] = useState(false)


  async function loadQuestions() {
    try {
      const response = await api.get('/faqs/listar-todos');
      setQuestions(response.data);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar perguntas',
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    loadQuestions();
  }, []);
  return ( 
    <Background>
      <SideBar activeOption={'faq'} open={open}/>
      <Cover open={open} onClick={() => setOpen(false)}/>
      <Container>
        <Header>
        <h1>FAQ<span> - Perguntas Frequentes</span></h1>
          <LanguagesContainer>
            <LanguageButton
              onClick={() => setLanguage('pt')}
              enabled={language === 'pt'}
            >
              <img src={icons.brazilian} alt="portugues" />
            </LanguageButton>
            <LanguageButton
              onClick={() => setLanguage('es')}
              enabled={language === 'es'}
            >
              <img src={icons.spanish} alt="espanhol" />
            </LanguageButton>
            <LanguageButton
              onClick={() => setLanguage('en')}
              enabled={language === 'en'}
            >
              <img src={icons.english} alt="ingles" />
            </LanguageButton>
          </LanguagesContainer>
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
          
        </Header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '3.4%',
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/adicionar-pergunta">
            <AddQuestionButton>
              <h1>Adicionar Perguta</h1>
            </AddQuestionButton>
            <AddQuestionPlusButton>
              <BiPlus/>
            </AddQuestionPlusButton>
          </Link>
        </div>
        <QuestionsDashboard>
          {loading ? (
            <LoadingContainer>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animations.heart,
                }}
                height={350}
                width={350}
              />
              <Subtitle>Carregando...</Subtitle>
            </LoadingContainer>
          ) : (
            <section>
              {questions.map((question, index) => (
                <QuestionCard
                  key={question.id.toString()}
                  language={language}
                  data={question}
                  index={index}
                />
              ))}
            </section>
          )}
        </QuestionsDashboard>
      </Container>
    </Background>
  );
}
