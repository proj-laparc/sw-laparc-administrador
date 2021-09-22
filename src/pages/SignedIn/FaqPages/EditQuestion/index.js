import React, { useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {IoIosArrowBack} from "react-icons/io"
import Lottie from 'react-lottie';

import SideBar from '../../../../components/SideBar';
import {
  Background,
  Container,
  BackLink,
  EditQuestionDashboard,
  Header,
  TitleContainer,
  EditQuestionTitle,
  InputContainer,
  LargeInputContainer,
  Button,
  LanguagesContainer,
  LanguageButton
} from './styles';
import { animations, icons } from '../../../../assets';
import api from '../../../../services/api';
import { useToast } from '../../../../context/ToastContext';
import DeleteQuestionAlert from '../../../../components/Alert';

export default function EditQuestion() {
  const { addToast } = useToast();
  const location = useLocation();
  const history = useHistory();

  const [data, setData] = useState(location.state.data);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
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
    if (!requiredKeys.every(key => data[`pergunta_${key}`] !== "" && data[`resposta_${key}`] !== "")) {
      return true;
    }
    else if (requiredKeys.every(key => data[`pergunta_${key}`] === location.state.data[`pergunta_${key}`] && data[`resposta_${key}`] === location.state.data[`resposta_${key}`])) {
      return true
    } else if (loading) {
      return true;
    } else {
      return false;
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const {id, admin_id, ...editedData} = data;
      const response = await api.put(`/faqs/${id}`, editedData);
      history.push("/perguntas-frequentes");
      addToast({
        type: 'success',
        title: 'Pergunta editada com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao editar pergunta',
      });
    }
    setLoading(false);
  }

  function handleOpenDeleteAlert() {
    setOpenDeleteAlert(true);
  }

  async function deleteQuestion() {
    try {
      const response = await api.delete(`/faqs/${data.id}`);
      addToast({
        type: 'success',
        title: 'Pergunta deletada com sucesso!',
      });
      history.push("/perguntas-frequentes");
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no ao deletar pergunta',
      });
    }
  }

  const deleteAlert = {
    title: 'Tem certeza que deseja deletar essa pergunta?',
    description:
      'Ao deletar a pergunta, sua resposta também será apagada... Além de que a visualização dessa pergunta pela plataforma externa e por essa plataforma será bloqueada.',
    options: ['Cancelar', 'Deletar'],
    functions: [null, deleteQuestion],
  };

  return (
    <Background>
      <SideBar activeOption={'contents'} activeSubOption={'faq'} />
      <DeleteQuestionAlert
        setOpen={setOpenDeleteAlert}
        open={openDeleteAlert}
        alert={deleteAlert}
      />
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
        <EditQuestionDashboard>
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
            
          <TitleContainer>
            <EditQuestionTitle>Editar Pergunta</EditQuestionTitle>
            
            <button onClick={handleOpenDeleteAlert}>{icons.trash}</button>
          </TitleContainer>
          <InputContainer>
            <p>Pergunta</p>
            <input
              value={chooseLanguage(true)}
              onChange={e => handleChange(`pergunta_${language}`, e)}
            />
          </InputContainer>
          <LargeInputContainer>
            <p>Resposta</p>
            <textarea
              value={chooseLanguage()}
              onChange={e => handleChange(`resposta_${language}`, e)}
            />
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
              <h3>Salvar Alterações</h3>
            )}
          </Button>
        </EditQuestionDashboard>
      </Container>
    </Background>
  );
}
