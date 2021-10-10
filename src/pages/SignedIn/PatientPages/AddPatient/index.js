import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import Dropzone from 'react-dropzone';
import { Link, useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import axios from 'axios';
import chroma from 'chroma-js';

import SideBar from '../../../../components/SideBar';
import { useToast } from '../../../../context/ToastContext';
import {
  Background,
  Container,
  Header,
  BackLink,
  AddPatientDashboard,
  InfoContainer,
  InputContainer,
  FormsContainer,
  DropContainer,
  ReportContainer,
  ObsContainer,
  FormContainer,
  MedicalDateContainer,
  AddButton,
  UploadMessage,
  UploadedFile,
  ActionsContainer,
  StyledSelect,
  InputGroup
} from './styles';
import { icons, animations } from '../../../../assets';
import api from '../../../../services/api';

export default function AddPatient() {
  const history = useHistory();
  const { addToast } = useToast();

  const [patientData, setPatientData] = useState({});
  const [laudos, setLaudos] = useState([]);
  const [form, setForm] = useState({});
  const [laudoObservations, setLaudoObservations] = useState({
    0: null,
    1: null,
    2: null,
  });
  const [loading, setLoading] = useState(false);
  const [firstLaudo, setFirstLaudo] = useState({});
  const [secondLaudo, setSecondLaudo] = useState({});
  const [thirdLaudo, setThirdLaudo] = useState({});
  const [fourthLaudo, setFourthLaudo] = useState({});
  const [fifthLaudo, setFifthLaudo] = useState({});
  const [consultas, setConsultas] = useState([
    {
      categoria: '',
      descricao: '',
      data: '',
      horario: '',
    },
  ]);
  const [consultaIndex, setConsultaIndex] = useState(0);

  function addConsulta() {
    const newConsulta = {
      categoria: '',
      data: '',
      horario: '',
    };
    setConsultas([...consultas, ...[newConsulta]]);
    setConsultaIndex(consultaIndex + 1);
  }

  function renderCategory() {
    const categoryValue = renderConsulta().categoria;
    let categoryOption = null;
    categoriesOptions.forEach(option => {
      if (option.value === categoryValue) {
        categoryOption = option;
      }
    });
    return categoryOption;
  }

  function renderConsulta() {
    return consultas[consultaIndex];
  }

  function editConsulta(e) {
    let key;
    let value;
    if (
      e?.target?.name === 'data' ||
      e?.target?.name === 'horario' ||
      e?.target?.name === 'descricao'
    ) {
      key = e.target.name;
      value = e.target.value;
    } else {
      key = 'categoria';
      value = e?.value ? e.value : '';
    }
    let consultasEdited = consultas;
    consultasEdited[consultaIndex] = {
      ...consultas[consultaIndex],
      [key]: value,
    };
    setConsultas([...consultasEdited]);
  }

  function renderDragMessage(isDragActive) {
    if (!isDragActive) {
      return icons.upload;
    }
    if (isDragActive) {
      return <UploadMessage>Solte os arquivos aqui</UploadMessage>;
    }
  }

  function changeInput(e) {
    if (e.target.name.slice(0, 16) === 'laudoObservation') {
      const length = e.target.name.length;
      setLaudoObservations({
        ...laudoObservations,
        [e.target.name.slice(16, length + 1)]: e.target.value,
      });
    } else {
      setPatientData({ ...patientData, [e.target.name]: e.target.value });
    }
  }

  async function handleFile(file, fileType, number) {
    const fileObject = {
      filePart: file[0],
      preview: URL.createObjectURL(file[0]),
    };
    if (fileType === 'laudo') {
      setLaudos([...laudos, ...[fileObject]]);
      if (number === 0) {
        setFirstLaudo(fileObject);
      } else if (number === 1) {
        setSecondLaudo(fileObject);
      } else if (number === 2) {
        setThirdLaudo(fileObject);
      } else if (number === 3) {
        setFourthLaudo(fileObject);
      } else {
        setFifthLaudo(fileObject);
      }
    } else {
      setForm(fileObject);
    }
  }

  async function uploadToStorage(file, type) {
    const { filePart } = file;
    try {
      const firstResponse = await api.get('/pdf/put_url');
      const fileData =
        type === 'laudo'
          ? {
            file_name: firstResponse.data.file_name,
            descricao: file.descricao,
            type: 'laudo',
          }
          : {
            file_name: firstResponse.data.file_name,
            descricao: 'descricao',
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
            'Content-Disposition': 'attachment',
          },
        },
      );
      return fileData;
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar paciente',
      });
    }
  }

  function filterEmptyAppointments(appointments) {
    let filteredAppointments = [];
    appointments.forEach(appointment => {
      if (Object.values(appointment).every(value => value === '')) {
      } else {
        const {
          id,
          admin_id,
          paciente_id,
          data,
          ...appointmentInfo
        } = appointment;
        filteredAppointments.push({
          ...appointmentInfo,
          ['data']: data.split('-').reverse().join('-'),
        });
      }
    });
    return filteredAppointments;
  }

  async function sendPatientData(laudos, form) {
    try {
      const data = {
        nome: patientData.firstName ? patientData.firstName : null,
        sobrenome: patientData.lastName ? patientData.lastName : null,
        email: patientData.email ? patientData.email : null,
        telefone: patientData.phoneNumber ? patientData.phoneNumber : null,
        laudos: laudos.length === 0 ? [] : laudos,
        formulario: form.length === 0 ? null : form[0],
        projeto:patientData.project ?? null,
        consultas: filterEmptyAppointments(consultas),
        link: 'https://laparc.com.br/redefinir-senha/active/',
      };
      await api.post('/pacientes/cadastrar', data);
      addToast({
        type: 'info',
        title: 'Paciente adicionado com sucesso!',
        description: 'Confira o email cadastrado para confirmação',
      });
      history.push("/pacientes");
    } catch (err) {
      if (err.response?.data?.errors) {
        if (err.response.data.errors.slice(0, 13) === 'duplicate key') {
          addToast({
            type: 'error',
            title: 'Erro no ao cadastrar paciente',
            description:
              'Já existe um paciente cadastrado com esse mesmo email',
          });
        }
      } else if (err.response?.data?.email) {
        if (err.response.data.email[0] === 'Not a valid email address.') {
          addToast({
            type: 'error',
            title: 'Erro no ao cadastrar paciente',
            description: 'O endereço de email inserido não é válido',
          });
        }
      } else {
        addToast({
          type: 'error',
          title: 'Erro no ao cadastrar paciente',
        });
      }
    }
    setLoading(false);
  }

  function defineFilesToUpload(values, newLaudos) {
    if (values.length !== 0 && laudos.length !== 0) {
      return Promise.all([
        ...newLaudos.map(laudo => uploadToStorage(laudo, 'laudo')),
        ...[uploadToStorage(form, 'form')],
      ]);
    } else if (values.length !== 0 || laudos.length === 0) {
      return Promise.all([uploadToStorage(form, 'form')]);
    } else {
      return Promise.all(
        newLaudos.map(laudo => uploadToStorage(laudo, 'laudo')),
      );
    }
  }

  function laudosClassification() {
    let newLaudos = [];

    [firstLaudo, secondLaudo, thirdLaudo, fourthLaudo, fifthLaudo].forEach(
      (element, index) => {
        if (Object.keys(element).length === 0) {
          return;
        } else {
          let newElement = {
            ...element,
            descricao: laudoObservations[index]
              ? laudoObservations[index]
              : null,
          };
          newLaudos.push(newElement);
        }
      },
    );
    return newLaudos;
  }

  function validateConsultas() {
    let response = true;
    consultas.forEach(consulta => {
      const values = Object.values(consulta);
      if (values.includes('') && !values.every(value => value === '')) {
        response = false;
      }
    });
    return response;
  }

  function handleSubmit() {
    if (!validateConsultas()) {
      addToast({
        type: 'error',
        title: 'Erro ao cadastrar paciente',
        description: 'Todas as consultas marcadas devem estar completas',
      });
      return;
    }
    setLoading(true);
    const values = Object.keys(form);
    if (values.length !== 0 || laudos.length !== 0) {
      defineFilesToUpload(values, laudosClassification()).then(results => {
        let laudos = [];
        let form = [];
        results.forEach(file =>
          file?.type === 'laudo'
            ? laudos.push({
              file_name: file.file_name,
              descricao: file.descricao,
            })
            : form.push(file),
        );
        sendPatientData(laudos, form);
      });
    } else {
      sendPatientData([], []);
    }
  }

  function isEmpty(index) {
    if (index === 0) {
      return Object.keys(firstLaudo).length === 0;
    } else if (index === 1) {
      return Object.keys(secondLaudo).length === 0;
    } else if (index === 2) {
      return Object.keys(thirdLaudo).length === 0;
    } else if (index === 3) {
      return Object.keys(fourthLaudo).length === 0;
    } else {
      return Object.keys(fifthLaudo).length === 0;
    }
  }

  function validateInputs() {
    if (('firstName' && 'lastName') in patientData) {
      return false;
    } else if (loading) {
      return true;
    } else {
      return true;
    }
  }

  function handleDeleteLaudo(number) {
    if (number === 0) {
      setLaudos(laudos.filter(laudo => laudo !== firstLaudo));
      setFirstLaudo({});
    } else if (number === 1) {
      setLaudos(laudos.filter(laudo => laudo !== secondLaudo));
      setSecondLaudo({});
    } else if (number === 2) {
      setLaudos(laudos.filter(laudo => laudo !== thirdLaudo));
      setThirdLaudo({});
    } else if (number === 3) {
      setLaudos(laudos.filter(laudo => laudo !== fourthLaudo));
      setFourthLaudo({});
    } else {
      setLaudos(laudos.filter(laudo => laudo !== fifthLaudo));
      setFifthLaudo({});
    }
  }

  const categoriesOptions = [
    {
      value: '1ª consulta',
      label: '1ª consulta',
      color: '#3452C2',
    },
    {
      value: '2ª consulta baixo risco',
      label: '2ª consulta baixo risco',
      color: '#7C45A0',
    },
    {
      value: '2ª consulta alto risco',
      label: '2ª consulta alto risco',
      color: '#FF4643',
    },
    { value: 'MRPA entrega', label: 'MRPA entrega', color: '#CED834' },
    { value: 'MRPA devolução', label: 'MRPA devolução', color: '#47C355' },
    { value: 'ECG', label: 'ECG', color: '#D0BBFE' },
    { value: 'Entrega de exame', label: 'Entrega de exame', color: '#FF9138' },
  ];

  const dot = (color = '#ccc') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const appointmentSelectionStyles = {
    container: styles => ({
      ...styles,
      width: '19.825vw',
    }),
    control: styles => ({
      display: 'flex',
      border: 'none',
      borderBottom: '1.2px solid #00000037',
      borderRadius: 0,
      cursor: 'pointer',
      fontSize: 13,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        fontSize: 12,
        backgroundColor: isDisabled
          ? null
          : isSelected
            ? data.color
            : isFocused
              ? color.alpha(0.1).css()
              : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : data.color,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      };
    },
    menu: styles => ({ ...styles, backgroundColor: '#ffffff' }),
    input: styles => ({
      ...styles,
      ...dot(),
      fontSize: 12,
    }),
    placeholder: styles => ({
      ...styles,
      ...dot(),
      fontSize: 12,
      marginLeft: -7,
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      ...dot(data.color),
      marginLeft: -7,
      fontSize: 12,
      color: '#323c47',
      fontWeight: 500,
    }),
    dropdownIndicator: styles => ({
      ...styles,
    }),
  };

  return (
    <Background>
      <SideBar activeOption={'patients'} />
      <Container>
        <Header>
          <Link to="/pacientes">
            <IoIosArrowBack />
          </Link>
          <h1>Pacientes</h1>
          <div></div>
        </Header>
        <BackLink to="/pacientes">
          <FiArrowLeft color="#3F3F3F" size={'60%'} />
        </BackLink>
        <AddPatientDashboard>
          <h1>Informações do Paciente</h1>
          <FormContainer>
            <div>
              <InfoContainer>
                <InputGroup>
                  <InputContainer>
                    <p>Nome</p>
                    <input
                      onChange={changeInput}
                      value={patientData.firstName}
                      name="firstName"
                    />
                  </InputContainer>
                  <InputContainer>
                    <p>Sobrenome</p>
                    <input
                      onChange={changeInput}
                      value={patientData.lastName}
                      name="lastName"
                    />
                  </InputContainer>
                </InputGroup>
                <InputGroup>
                  <InputContainer>
                    <p>Email</p>
                    <input
                      onChange={changeInput}
                      value={patientData.email}
                      name="email"
                    />
                  </InputContainer>
                  <InputContainer>
                    <p>Telefone</p>
                    <input
                      onChange={changeInput}
                      value={patientData.phoneNumber}
                      name="phoneNumber"
                      type="tel"
                      placeholder="(21) 98761-4749"
                    />
                  </InputContainer>
                </InputGroup>
                <div>
                  <InputContainer>
                    <p>Projeto</p>
                    <select
                      name="project"
                      value={patientData.project}
                      defaultValue=""
                      onChange={changeInput}
                    >
                      <option value="" disabled hidden></option>
                      <option value="LapARC">LapARC</option>
                      <option value="CuidArt">CuidArt</option>
                      <option value="LapARC/CuidArt">LapARC/CuidArt</option>
                    </select>
                  </InputContainer>
                </div>
                <div></div>
                
                <div>
                  <FormsContainer>
                    <h2>Formulário</h2>
                    {Object.keys(form).length === 0 ? (
                      <Dropzone
                        onDrop={acceptedFiles =>
                          handleFile(acceptedFiles, 'form')
                        }
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
                    ) : (
                      <UploadedFile>
                        <button type="button" onClick={() => setForm({})}>
                          <AiOutlineCloseCircle size={15} />
                        </button>
                        <a href={form.preview} target="_blank">
                          <img src={icons.pdf} />
                        </a>
                      </UploadedFile>
                    )}
                  </FormsContainer>
                  <ReportContainer>
                    <h2>Laudos Médicos</h2>
                    {[
                      firstLaudo,
                      secondLaudo,
                      thirdLaudo,
                      fourthLaudo,
                      fifthLaudo,
                    ].map((laudo, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flex: 1,
                          flexDirection: 'row',
                          marginTop: '1vh',
                        }}
                      >
                        {!isEmpty(index) ? (
                          <>
                            <UploadedFile>
                              <button
                                type="button"
                                onClick={() => handleDeleteLaudo(index)}
                              >
                                <AiOutlineCloseCircle size={15} />
                              </button>
                              <a href={laudo.preview} target="_blank">
                                <img src={icons.pdf} />
                              </a>
                            </UploadedFile>
                          </>
                        ) : (
                          <Dropzone
                            onDrop={acceptedFiles =>
                              handleFile(acceptedFiles, 'laudo', index)
                            }
                          >
                            {({
                              getRootProps,
                              getInputProps,
                              isDragActive,
                            }) => (
                              <>
                                <input {...getInputProps()} />
                                <DropContainer {...getRootProps()}>
                                  {renderDragMessage(isDragActive)}
                                </DropContainer>
                              </>
                            )}
                          </Dropzone>
                        )}
                        <ObsContainer>
                          <p>Observação do Laudo</p>
                          <input
                            placeholder="Escreva aqui"
                            onChange={changeInput}
                            value={laudoObservations.index}
                            name={`laudoObservation${index}`}
                          />
                        </ObsContainer>
                      </div>
                    ))}
                  </ReportContainer>
                </div>
                <div style={{ height: '100%' }}>
                  <MedicalDateContainer>
                    <h1>Marcar Consulta</h1>
                    <InputContainer>
                      <p>Categoria</p>
                      <StyledSelect
                        placeholder="Selecionar..."
                        isSearchable={false}
                        isClearable
                        options={categoriesOptions}
                        styles={appointmentSelectionStyles}
                        onChange={e => editConsulta(e)}
                        value={renderCategory()}
                      />
                    </InputContainer>
                    <InputContainer marginTop={1.1}>
                      <p>Descrição</p>
                      <input
                        onChange={e => editConsulta(e)}
                        style={{
                          color: '#323c47',
                        }}
                        name="descricao"
                        value={
                          renderConsulta().descricao
                            ? renderConsulta().descricao
                            : ''
                        }
                      />
                    </InputContainer>
                    <InputContainer marginTop={1.1}>
                      <p>Dia</p>
                      <input
                        onChange={e => editConsulta(e)}
                        style={{
                          color: renderConsulta().data
                            ? '#323c47'
                            : '#323c4770',
                        }}
                        name="data"
                        type="date"
                        value={renderConsulta().data}
                      />
                    </InputContainer>
                    <InputContainer marginTop={1.1}>
                      <p>Horário</p>
                      <input
                        onChange={e => editConsulta(e)}
                        style={{
                          color: renderConsulta().horario
                            ? '#323c47'
                            : '#323c4770',
                        }}
                        type="time"
                        value={renderConsulta().horario}
                        name="horario"
                      />
                    </InputContainer>
                    <ActionsContainer appointment={consultaIndex}>
                      {consultaIndex !== 0 && (
                        <button
                          onClick={() => setConsultaIndex(consultaIndex - 1)}
                        >
                          <span>Voltar</span>
                        </button>
                      )}
                      <button
                        onClick={() =>
                          consultas.length === consultaIndex + 1
                            ? addConsulta()
                            : setConsultaIndex(consultaIndex + 1)
                        }
                      >
                        <span>
                          {consultas.length === consultaIndex + 1
                            ? 'Adicionar outra consulta'
                            : 'Próxima consulta'}
                        </span>
                      </button>
                    </ActionsContainer>
                  </MedicalDateContainer>
                </div>
              </InfoContainer>
            </div>
            <AddButton
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
                <p>Adicionar</p>
              )}
            </AddButton>
          </FormContainer>
        </AddPatientDashboard>
      </Container>
    </Background>
  );
}
