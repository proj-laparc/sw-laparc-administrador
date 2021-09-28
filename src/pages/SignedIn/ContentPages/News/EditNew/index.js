import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { FiArrowLeft } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Lottie from 'react-lottie';
 
import SideBar from '../../../../../components/SideBar';
import HamburgerBtn from '../../../../../components/HamburgerBtn';
import {
  Background,
  Container,
  TitleContainer,
  BackLink,
  EditNewDashboard,
  EditNewTitle,
  EditNewDescription,
  InputContainer,
  DropContainer,
  UploadMessage,
  Cover,
  Header,
  ButtonsContainer,
  Button,
  UploadedFile,
} from './styles';
import { icons, animations } from '../../../../../assets';
import api from '../../../../../services/api';
import { useToast } from '../../../../../context/ToastContext';
import DeleteNewAlert from '../../../../../components/Alert';
import { IoIosArrowBack } from 'react-icons/io';

export default function EditNew() {
  const history = useHistory();
  const { state } = useLocation();
  const { addToast } = useToast();

  const [userNew, setUserNew] = useState({
    title: state.data.titulo,
    youtubeLink: state.data.tipo === 'youtube' ? state.data.file_name : '',
    type: state.data.tipo,
  });
  const [file, setFile] = useState(
    state.data.tipo !== 'youtube' ? state.data.file_name : null,
  );
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [open, setOpen] = useState(false)
  function changeInput(e) {
    setUserNew({
      ...userNew,
      [e.target.name]: e.target.value,
    });
  }

  function renderIcon() {
    if (file === state.data.file_name) {
      const type = state.data.tipo;
      switch (type) {
        case 'image':
          return <img src={icons.image} />;
        case 'pdf':
          return <img src={icons.pdf} />;
        case 'audio':
          return <img src={icons.audio} />;
        default:
          return <img src={icons.file} />;
      }
    } else {
      let type = file.filePart.type.split('/');
      if (type[1] === 'pdf') {
        return <img src={icons.pdf} />;
      }
      switch (type[0]) {
        case 'image':
          return <img src={icons.image} />;
        case 'pdf':
          return <img src={icons.pdf} />;
        case 'audio':
          return <img src={icons.audio} />;
        default:
          return <img src={icons.file} />;
      }
    }
  }

  function handleFile(file) {
    const fileObject = {
      filePart: file[0],
      preview: URL.createObjectURL(file[0]),
    };
    setFile(fileObject);
  }

  function checkInputs() {
    if (
      !isEmpty(file) &&
      userNew.youtubeLink !== '' &&
      userNew.youtubeLink !== null
    ) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit() {
    if (checkInputs()) {
      addToast({
        type: 'error',
        title: 'Erro ao editar notícia',
        description:
          'A notícia deve conter apenas um link do youtube ou um arquivo',
      });
      return;
    }
    setLoading(true);
    if ('youtubeLink' in userNew && userNew.youtubeLink !== '') {
      sendNewData({
        file_name: userNew.youtubeLink,
        type: 'youtube',
      });
    } else if (state.data.file_name === file) {
      sendNewData(null);
    } else {
      uploadToStorage(file).then(result => {
        sendNewData(result);
      });
    }
  }

  async function uploadToStorage(file) {
    const { filePart } = file;
    const type = filePart.type.split('/')[1];
    const genericType =
      filePart.type.split('/')[1] === 'pdf'
        ? filePart.type.split('/')[1]
        : filePart.type.split('/')[0];
    try {
      const firstResponse = await api.get(`/${type}/put_url`);
      const fileData = {
        file_name: firstResponse.data.file_name,
        type: genericType,
      };
      /*para transformar o arquivo "file" do input em um arquivo
      binário (formato configurado no backend) é preciso fazer um 
      parse no arquivo, isto é, transformar em um Blob que contém
      apenas o dado, tamanho do arquivo e o tipo do arquivo. Por fim,
      é necessário criar um arquivo do tipo File (tipo de arquivo que é
      aceito por binary data) com o blob, o novo nome e o tipo do arquivo
      fonte: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data#Sending_binary_data*/
      let blob = filePart.slice(0, filePart.size, filePart.type);
      let binaryFile = new File([blob], firstResponse.data.file_name, {
        type: filePart.type,
      });
      const secondResponse = await axios.put(
        firstResponse.data.url,
        binaryFile,
        {
          headers: {
            'x-amz-acl': 'public-read',
            'Content-Type': filePart.type,
            'Content-Disposition': 'inline',
          },
        },
      );
      return fileData;
    } catch (err) {}
  }

  async function sendNewData(file) {
    try {
      const data = file
        ? {
            file_name: file.file_name,
            titulo: userNew.title,
            tipo: file.type,
          }
        : {
            titulo: userNew.title,
          };
      const response = await api.patch(`/noticias/${state.data.id}`, data);
      addToast({
        type: 'success',
        title: 'Notícia editada com sucesso!',
      });
      history.push("/noticias");
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no ao editar notícia, tente novamente',
      });
    }
    setLoading(false);
  }

  function renderDragMessage(isDragActive) {
    if (!isDragActive) {
      return icons.upload;
    } else {
      return <UploadMessage>Solte os arquivos aqui</UploadMessage>;
    }
  }

  function isEmpty(obj) {
    return obj ? Object.keys(obj).length === 0 : true;
  }

  function validateInputs() {
    if (loading) {
      return true;
    } else if (userNew.title === '') {
      return true;
    } else if (userNew.youtubeLink === '' && isEmpty(file)) {
      return true;
    } else if (
      userNew.title === state.data.titulo &&
      userNew.youtubeLink === state.data.file_name &&
      (file === null || isEmpty(file))
    ) {
      return true;
    } else if (
      file &&
      userNew.title === state.data.titulo &&
      file === state.data.file_name &&
      userNew.youtubeLink === ''
    ) {
      return true;
    } else {
      return false;
    }
  }

  function handleOpenDeleteAlert() {
    setOpenDeleteAlert(true);
  }

  async function deleteNew() {
    try {
      const response = await api.delete(`/noticias/${state.data.id}`);
      addToast({
        type: 'success',
        title: 'Notícia deletada com sucesso!',
      });
      history.push("/noticias");
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no ao deletar notícia',
      });
    }
  }

  const deleteAlert = {
    title: 'Tem certeza que deseja deletar essa notícia?',
    description:
      'Ao deletar a notícia, seu conteúdo também será apagado... Além de que a visualização dessa notícia pela plataforma externa e por essa plataforma também será bloqueada.',
    options: ['Cancelar', 'Deletar'],
    functions: [null, deleteNew],
  };

  return (
    <Background>
      <SideBar activeOption={'contents'} activeSubOption={'news'} open={open}/>
      <Cover open={open} onClick={() => setOpen(false)}/>
      <DeleteNewAlert
        setOpen={setOpenDeleteAlert}
        open={openDeleteAlert}
        alert={deleteAlert}
      /> 
      <Container>
        <Header>
          <Link to="/noticias">
            <IoIosArrowBack/>
          </Link> 
                
              <h1>Notícias</h1>
            
          </Header>
        <BackLink to="/noticias">
          <FiArrowLeft color="#3F3F3F" size={'60%'} />
        </BackLink>
        <EditNewDashboard>
          <TitleContainer>
            <EditNewTitle>Editar Notícia</EditNewTitle>
            <button onClick={handleOpenDeleteAlert}>{icons.trash}</button>
          </TitleContainer>
          <EditNewDescription>
            Para editar uma notícia na plataforma do Laparc, basta preencher o
            campo com o título da notícia e fazer o upload do arquivo nos
            formatos <strong>.pdf, .jpg, .png, .jpeg, .mp3, .mp4</strong>... Se
            o conteúdo que deseja adicionar é um{' '}
            <strong>vídeo do youtube</strong>, basta preencher o campo com o
            link do vídeo e não fazer upload de nenhum arquivo.
          </EditNewDescription>
          <InputContainer marginTop={45}>
            <p>Título da Notícia</p>
            <input
              name="title"
              value={userNew.title}
              onChange={e => changeInput(e)}
            />
          </InputContainer>
          <InputContainer marginTop={30}>
            <p>Link do vídeo do youtube</p>
            <input
              name="youtubeLink"
              value={userNew.youtubeLink}
              onChange={e => changeInput(e)}
            />
          </InputContainer>
          {isEmpty(file) ? (
            <Dropzone onDrop={acceptedFiles => handleFile(acceptedFiles)}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <>
                  <input {...getInputProps()} />
                  <DropContainer {...getRootProps()}>
                    {renderDragMessage(isDragActive)}
                  </DropContainer>
                </>
              )}
            </Dropzone>
          ) : (
            <UploadedFile>
              <button onClick={() => setFile({})} type="button">
                <AiOutlineCloseCircle size={27} />
              </button>
              <a href={file.preview} target="_blank">
                {renderIcon()}
              </a>
            </UploadedFile>
          )}
          <ButtonsContainer>
            <a href="https://www.youtube.com" target="_blank">
              <Button>
                <span>Acessar Youtube</span>
              </Button>
            </a>
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
                <span>Salvar Alterações</span>
              )}
            </Button>
          </ButtonsContainer>
        </EditNewDashboard>
      </Container>
    </Background>
  );
}
