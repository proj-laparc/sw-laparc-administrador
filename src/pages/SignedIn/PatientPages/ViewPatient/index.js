import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useLocation } from 'react-router';
 
import SideBar from '../../../../components/SideBar';
import {
  Background,
  Container,
  BackLink,
  TitleContainer,
  AddPatientDashboard,
  InfoContainer,
  LabelContainer,
  FormsContainer,
  ReportContainer,
  ObsContainer,
  FormContainer,
  MedicalDateContainer,
  UploadedFile,
  Report,
  Appointments,
  Appointment,
  ActionsContainer,
  Header,
} from './styles';
import EditPatient from '../EditPatient';
import { icons } from '../../../../assets';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

export default function ViewPatient() {
  const location = useLocation();
  const [data, setData] = useState(location.state.data);
  const id = location.state.data.id;

  const [editMode, setEditMode] = useState(false);
  const [appointmentIndexToRender, setAppointmentIndexToRender] = useState(0);

  function renderAppointmentColor(description) {
    switch (description) {
      case '1ª consulta':
        return '#3452C2';
      case '2ª consulta baixo risco':
        return '#7C45A0';
      case '2ª consulta alto risco':
        return '#FF4643';
      case 'MRPA entrega':
        return '#CED834';
      case 'MRPA devolução':
        return '#47C355';
      case 'ECG':
        return '#C2AEEE';
      case 'Entrega de exame':
        return '#FF9138';
      default:
        return 'gray';
    }
  }

  if (editMode) {
    return (
      <EditPatient
        setInitialPatientData={setData}
        initialPatientData={data}
        setEditMode={setEditMode}
        id={id}
      />
    );
  }

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
          <TitleContainer>
            <h1>Informações do Paciente</h1>
            <button
              onClick={() => (setEditMode(true))}
            >
              {icons.edit}
            </button>
          </TitleContainer>
          <FormContainer>
            <div>
              <InfoContainer>
                <LabelContainer>
                  <p>Nome</p>
                  <h3>{data.nome}</h3>
                </LabelContainer>
                <LabelContainer>
                  <p>Sobrenome</p>
                  <h3>{data.sobrenome}</h3>
                </LabelContainer>
                <LabelContainer>
                  <p>Email</p>
                  <h3>
                    {data.email
                      ? data.email
                      : 'Paciente ainda não tem um email cadastrado'}
                  </h3>
                </LabelContainer>
                <LabelContainer >
                  <p>Telefone</p>
                  <h3>
                    {data.telefone
                      ? data.telefone
                      : 'Paciente ainda não tem um telefone cadastrado'}
                  </h3>
                </LabelContainer>
                <div>
                <FormsContainer>
                <h2>Formulário</h2>
                {data.formulario ? (
                  <UploadedFile form={true}>
                    <a
                      href={`https://storage-laparc.nyc3.digitaloceanspaces.com/laparc/${data.formulario.file_name}`}
                      target="_blank"
                    >
                      <img src={icons.pdf} />
                    </a>
                  </UploadedFile>
                ) : (
                  <h3>
                    Nenhum formulário adicionado...
                  </h3>
                )}
              </FormsContainer>
                  <ReportContainer>
                <h2>Laudos Médicos</h2>
                {data.laudos.length !== 0 ? (
                  data.laudos.map((laudo, index) => (
                    <Report
                      key={index}
                      
                    >
                      <UploadedFile>
                        <a
                          href={`https://storage-laparc.nyc3.digitaloceanspaces.com/laparc/${laudo.file_name}`}
                          target="_blank"
                        >
                          <img src={icons.pdf} />
                        </a>
                      </UploadedFile>
                      <ObsContainer>
                        <p>Observação do Laudo</p>
                        <h3>
                          {laudo.descricao
                            ? laudo.descricao
                            : 'Nenhuma observação...'}
                        </h3>
                      </ObsContainer>
                    </Report>
                  ))
                ) : (
                  <h3> Nenhum laudo adicionado...</h3>
                )}
              </ReportContainer>
            
                </div>
                <div style={{ width: '100%' }}>
              
              <MedicalDateContainer>
                <h1>Consultas Marcadas</h1>
                <Appointments>
                  {data.consultas.length !== 0 ? (
                    data.consultas
                      .slice(
                        appointmentIndexToRender,
                        appointmentIndexToRender + 4,
                      )
                      .map((consulta, index) => (
                        <Appointment
                          key={index}
                          
                        >
                          <LabelContainer

                          >
                            <p>Categoria</p>
                            <h3>
                              {consulta.categoria
                                ? consulta.categoria
                                : 'Não possui categoria'}
                            </h3>
                          </LabelContainer>
                          <LabelContainer>
                            <p>Descricao</p>
                            <h3>{consulta.descricao}</h3>
                          </LabelContainer>
                          <LabelContainer>
                            <p>Dia</p>
                            <h3>{consulta.data}</h3>
                          </LabelContainer>
                          <LabelContainer>
                            <p>Horário</p>
                            <h3>{consulta.horario}</h3>
                          </LabelContainer>
                        </Appointment>
                      ))
                  ) : (
                    <h3 style={{ marginTop: 10 }}>
                      Nenhum consulta marcada...
                    </h3>
                  )}
                </Appointments>
                <ActionsContainer appointment={appointmentIndexToRender}>
                  {appointmentIndexToRender !== 0 && (
                    <button
                      onClick={() =>
                        setAppointmentIndexToRender(
                          appointmentIndexToRender - 4,
                        )
                      }
                    >
                      <span>Voltar</span>
                    </button>
                  )}
                  {appointmentIndexToRender + 4 < data.consultas.length && (
                    <button
                      onClick={() =>
                        setAppointmentIndexToRender(
                          appointmentIndexToRender + 4,
                        )
                      }
                    >
                      <span>Ver mais consultas</span>
                    </button>
                  )}
                </ActionsContainer>
              </MedicalDateContainer>
            </div>
          
              </InfoContainer>
              
            </div>
            
          </FormContainer>
        </AddPatientDashboard>
      </Container>
    </Background>
  );
}
