import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {IoIosArrowBack} from "react-icons/io"
import Lottie from 'react-lottie';

import SideBar from '../../../../components/SideBar';
import {
  Background,
  //Header,
  Container,
  BackLink,
  AddQuestionDashboard,
  Header,
  AddQuestionTitle,
  InputContainer,
  LargeInputContainer,
  Button,
  LanguagesContainer, 
  LanguageButton
} from './styles';
import { animations, icons } from '../../../../assets';
import api from '../../../../services/api';
import { useToast } from '../../../../context/ToastContext';

export default function AddQuestion() {
  const { addToast } = useToast();
  const history = useHistory();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('pt');

  function handleChange(key, e) {
    setData({
      ...data,
      [key]: e.target.value,
    });
  }

  function chooseLanguage(question) {
    let valueToReturn;
    if (question) {
      valueToReturn = data[`pergunta_${language}`]
    } else {
      valueToReturn = data[`resposta_${language}`]
    }
    return valueToReturn === undefined ? "" : valueToReturn;
  }

  function validateInputs() {
    const requiredKeys = ["pt", "es", "en"];
    if (!requiredKeys.every(key => data[`pergunta_${key}`] !== "" && `pergunta_${key}` in data && data[`resposta_${key}`] !== "" && `resposta_${key}` in data)) {
      return true;
    } else if (loading) {
      return true;
    }
    return false;
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await api.post('/faqs/cadastrar', data);
      history.push("/perguntas-frequentes");
      addToast({
        type: 'success',
        title: 'Pergunta adicionada com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar pergunta',
      });
    }
    setLoading(false);
  }
  return (
    <Background>
      <SideBar activeOption={'contents'} activeSubOption={'faq'} />
      <Container>
        <Header>
          <Link to="/perguntas-frequentes">
            <IoIosArrowBack />
          </Link>  
          <h1>FAQ</h1>
          <div></div>
    
        </Header>
        <BackLink to="/perguntas-frequentes">
          <FiArrowLeft color="#3F3F3F" size={'60%'} />
        </BackLink>
        <AddQuestionDashboard>
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
          {/*<Header>
            <AddQuestionTitle>Adicionar Pergunta</AddQuestionTitle>
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
          </Header>*/}
          
          <InputContainer>
            <p>Pergunta</p>
            <input value={chooseLanguage(true)} onChange={e => handleChange(`pergunta_${language}`, e)} />
          </InputContainer>
          <LargeInputContainer>
            <p>Resposta</p>
            <textarea value={chooseLanguage()} onChange={e => handleChange(`resposta_${language}`, e)} />
          </LargeInputContainer>
          <Button
            disabled={validateInputs() ? true : false}
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? (
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animations.loadingBalls,
                }}
                height={37}
                width={37}
              />
            ) : (
              <h3>Adicionar</h3>
            )}
          </Button>
        </AddQuestionDashboard>
      </Container>
    </Background>
  );
}
