import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from "react-icons/gi"
import HamburgerMenu from "react-hamburger-menu"
import {BiPlus} from "react-icons/bi"
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import Lottie from 'react-lottie';

import SideBar from '../../../../components/SideBar';
import HamburgerBtn from '../../../../components/HamburgerBtn';
import PatientCard from '../../../../components/PatientCard';
import api from '../../../../services/api';
import { animations } from '../../../../assets';
import {
  Background,
  Cover,
  Container,
  Header,
  HeaderContent,
  SearchBar,
  AddPatientButton,
  AddPatientPlusButtonButton,
  PatientDashboard,
  Subtitle,
  LoadingContainer,
  LabelsContainer,
  LoadMoreContainer,
  Label
} from './styles';
import { useToast } from '../../../../context/ToastContext';

export default function ViewPatients() {
  const { addToast } = useToast();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [numberOfPatients, setNumberOfPatients] = useState(0);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);


  async function loadPatients(loadMore) {
    !(numberOfPatients === 0) && setLoadingMore(true);
    searchText === '' && !loadMore && setLoading(true);
    try {
      const response = searchText
        ? await api.get(
            `/pacientes/search/${searchText}/${numberOfPatients}/${
              numberOfPatients + 15
            }?embed=laudos,formulario,consultas`,
          )
        : await api.get(
            `/pacientes/listar/${numberOfPatients}/${
              numberOfPatients + 15
            }?embed=laudos,formulario,consultas`
          );
      setTotal(response.data[0].quantidade);
      setNumberOfPatients(numberOfPatients + 15);
      setPatients([...patients, ...response.data[1]]);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar pacientes',
      });
    }
    numberOfPatients === 0 ? setLoading(false) : setLoadingMore(false);
    searchText === '' && setLoading(false);
  }

  const delayedQuery = useRef(
    debounce(text => {
      setNotFound(false);
      text ? searchPatient(text) : loadPatients();
    }, 1000),
  ).current;

  function handleChange(e) {
    delayedQuery(e.target.value);
    setNumberOfPatients(0);
    setTotal(0);
  }

  async function searchPatient(text) {
    setLoading(true);
    setNumberOfPatients(0);
    try {
      const response = await api.get(
        `/pacientes/search/${text}/${numberOfPatients}/${
          numberOfPatients + 15
        }?embed=laudos,formulario,consultas`,
      );
      if (response.data[1].length === 0) {
        setNotFound(true);
        return;
      }
      setPatients([...patients, ...response.data[1]]);
      setTotal(response.data[0].quantidade);
      setNumberOfPatients(numberOfPatients + 15);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar pacientes',
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <Background>
      <SideBar activeOption={'patients'} open={open} />
      <Cover open={open} onClick={() => setOpen(false)}/>
      <Container open={open} >
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
          
            <h1>Pacientes</h1>
          </HeaderContent>
          <SearchBar>
              <FiSearch color="#C2CFE0" size={15} />
              <input
                placeholder="Pesquisar paciente"
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
          <Link style={{ textDecoration: 'none' }} to="/adicionar-paciente">
            <AddPatientButton>
              <h1>Adicionar Paciente</h1>
            </AddPatientButton>
            <AddPatientPlusButtonButton>
              <BiPlus/>
            </AddPatientPlusButtonButton>
          </Link>
        </div>
        <PatientDashboard loading={loading} notFound={notFound}>
          {loading || notFound ? (
            <LoadingContainer notFound={notFound}>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: notFound
                    ? animations.medicine
                    : animations.doctor,
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
              <LabelsContainer>
                <Label>Nome</Label>
                  <Label email>Email</Label>
                  <Label project>Projeto</Label>
              </LabelsContainer>
              {patients.map(patient => (
                <PatientCard
                  key={patient.id.toString()}
                  name={`${patient.nome} ${patient.sobrenome}`}
                  email={patient.email}
                  project={patient.projeto}
                  data={patient}
                />
              ))}
              {numberOfPatients < total && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {loadingMore ? (
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
                    <LoadMoreContainer onClick={() => loadPatients(true)}>
                      Mais pacientes
                    </LoadMoreContainer>
                  )}
                </div>
              )}
            </section>
          )}
        </PatientDashboard>
      </Container>
    </Background>
  );
}
