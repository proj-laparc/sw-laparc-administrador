import React, { useState } from 'react';
import Lottie from 'react-lottie';
import Dropzone from 'react-dropzone';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
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
  PictureContainer,
  Picture,
  ButtonsContainer,
  CancelButton,
  EditButton,
  DropContainer,
  UploadMessage,
  LanguagesContainer,
  LanguageButton,
} from './styles';
import { animations, icons } from '../../../../assets';
import { useToast } from '../../../../context/ToastContext';
import api from '../../../../services/api';

export default function EditAboutUs({
  setEditMode,
  initialData,
  setInitialData,
  language,
  setLanguage,
}) {
  const { addToast } = useToast();
  const { fotos, id, ...initialDescriptions } = initialData;
  const [loading, setLoading] = useState(false);
  const [descriptions, setDescriptions] = useState(initialDescriptions);
  const [firstPicture, setFirstPicture] = useState(
    fotos && fotos[0] ? fotos[0] : null,
  );
  const [secondPicture, setSecondPicture] = useState(
    fotos && fotos[1] ? fotos[1] : null,
  );
  const [open, setOpen] = useState(false)

  function renderDragMessage(isDragActive) {
    if (!isDragActive) {
      return icons.upload;
    } else {
      return <UploadMessage>Solte os arquivos aqui</UploadMessage>;
    }
  }

  function handleFile(file, first) {
    const fileObject = {
      filePart: file[0],
      preview: URL.createObjectURL(file[0]),
    };
    first ? setFirstPicture(fileObject) : setSecondPicture(fileObject);
  }

  function handleChange(e) {
    setDescriptions({
      ...descriptions,
      [language]: e.target.value,
    });
  }

  async function uploadToStorage(file) {
    const { filePart } = file;
    const type = filePart.type.split('/')[1];
    if (!["svg", "jpeg", "jpg", "png"].includes(type)) {
      addToast({
        type: 'error',
        title: 'O formato da foto não é suportado',
      });
      setLoading(false);
      return;
    }
    try {
      const firstResponse = await api.get(`/${type}/put_url`);
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
            'Content-Disposition': 'attachment',
          },
        },
      );
      return { file_name: firstResponse.data.file_name };
    } catch (err) {}
  }

  function definePicturesToUpload() {
    let validPictures = [firstPicture, secondPicture].filter(picture => picture !== null);
    let picturesToUpload = validPictures.filter(picture => picture.image_url === undefined);
    let picturesToNotUpload = validPictures.filter(picture => picture.image_url !== undefined);
    return [picturesToUpload, picturesToNotUpload, validPictures];
  }

  function formatPictures(uploadedPictures, validPictures) {
    let newPictures = validPictures;
    let newUploadedPictures = uploadedPictures;
    newPictures.forEach((picture, index) => {
      if (!picture.image_url) {
        newPictures[index] = newUploadedPictures.shift();
      } else {
        newPictures[index] = { 
          file_name: picture.file_name 
        };
      }
    });
    return newPictures;
  }

  async function sendAboutUs(newPictures, validPictures) {
    try {
      let data = {
        portugues: descriptions.portugues,
        espanhol: descriptions.espanhol,
        ingles: descriptions.ingles,
        fotos: newPictures
      };
      const response = await api.patch('/textos/2', data);
      const newData = {
        portugues: response.data.portugues,
        espanhol: response.data.espanhol,
        ingles: response.data.ingles,
        fotos: [firstPicture, secondPicture].filter(picture => picture !== null)
      };
      setInitialData({ ...initialData, ...newData });
      setEditMode(false);
      addToast({
        type: 'success',
        title: 'Quem somos editado com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao editar nossa história',
      });
    }
    setLoading(false);
  }

  function handleSubmit() {
    setLoading(true);
    let pictures = definePicturesToUpload();
    if (pictures[0].length === 0) {
      const newPictures = [];
      sendAboutUs(newPictures, pictures[2]);
    }
    else {
      Promise.all(pictures[0].map(picture => uploadToStorage(picture))).then(
      uploadedPictures => {
        const newPictures = formatPictures(uploadedPictures, pictures[2]);
        sendAboutUs(newPictures, pictures[2]);
      });
    }
  }

  function validateInputs() {
    if (!Object.keys(descriptions).every(key => descriptions[key] !== "")) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Background>
      <SideBar activeOption={'admin'} open={open} />
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
          <h1>Quem somos</h1>
        </Header>
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
            
            <Title>Projeto Laparc</Title>
          </TitleContainer>
          <Description
            value={descriptions[language]}
            onChange={e => handleChange(e)}
          />
          <PicturesContainer>
            {firstPicture ? (
              <PictureContainer>
                <button onClick={() => setFirstPicture(null)} type="button">
                  <AiOutlineCloseCircle size={27} />
                </button>
                <Picture
                  src={
                    firstPicture.preview ? firstPicture.preview : firstPicture.image_url
                  }
                />
                
              </PictureContainer>
            ) : (
              <Dropzone
                onDrop={acceptedFiles => handleFile(acceptedFiles, true)}
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <>
                    <input {...getInputProps()} />
                    <DropContainer {...getRootProps()}>
                      {renderDragMessage(isDragActive)}
                    </DropContainer>
                  </>
                )}
              </Dropzone>
            )}
            {secondPicture ? (
              <PictureContainer>
                <button onClick={() => setSecondPicture(null)} type="button">
                  <AiOutlineCloseCircle size={27} />
                </button>
                <Picture
                  src={
                    secondPicture.preview
                      ? secondPicture.preview
                      : secondPicture.image_url
                  }
                />
                
              </PictureContainer>
            ) : (
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
            )}
          </PicturesContainer>
          <ButtonsContainer>
            <CancelButton onClick={() => setEditMode(false)}>
              <p>Cancelar</p>
            </CancelButton>
            <EditButton
              disabled={validateInputs() ? true : false}
              onClick={handleSubmit}
            >
              {loading ? (
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: animations.loadingBalls,
                  }}
                  height={35}
                  width={30}
                />
              ) : (
                <p>Salvar Alterações</p>
              )}
            </EditButton>
          </ButtonsContainer>
        </Dashboard>
      </Container>
    </Background>
  );
}
