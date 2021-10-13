import React from 'react';
import { Switch, Route as ReactDOMRoute } from 'react-router-dom';

import axios from "axios";
import api from "../services/api"
import {useAuth} from "../context/AuthContext"
import { useToast } from '../context/ToastContext';
import Route from './Route';

import Login from '../pages/SignedOut/Login';
import ForgotPassword from '../pages/SignedOut/ForgotPassword';
import RedefinePassword from '../pages/SignedOut/RedefinePassword';

import ViewPatients from '../pages/SignedIn/PatientPages/ViewPatients';
import AddPatient from '../pages/SignedIn/PatientPages/AddPatient';
import ViewPatient from '../pages/SignedIn/PatientPages/ViewPatient';
import Register from '../pages/SignedIn/Register';

import ViewNews from '../pages/SignedIn/ContentPages/News/ViewNews';
import AddNew from '../pages/SignedIn/ContentPages/News/AddNew';
import EditNew from '../pages/SignedIn/ContentPages/News/EditNew';
import ViewScientificPubs from '../pages/SignedIn/ContentPages/ScientificPubs/ViewScientificPubs';
import AddScientificPubs from '../pages/SignedIn/ContentPages/ScientificPubs/AddScientificPubs';
import EditScientificPubs from '../pages/SignedIn/ContentPages/ScientificPubs/EditScientificPubs';

import Faq from '../pages/SignedIn/FaqPages/Faq';
import AddQuestion from '../pages/SignedIn/FaqPages/AddQuestion';
import EditQuestion from '../pages/SignedIn/FaqPages/EditQuestion';

import OurStory from '../pages/SignedIn/OurStoryPages/OurStory';

import AboutUs from '../pages/SignedIn/AboutUsPages/AboutUs';

import Configuration from '../pages/SignedIn/ConfigurationPages/Configuration';

export default function Routes() {
  const { signOut } = useAuth()
  const { addToast } = useToast();
  api.interceptors.response.use(
    response => {
      return response;
    },
    async err => {
      const originalReq = err.config;
      if (err.response.status === 401 && err.config && !err.config._retry) {
        const refreshToken = localStorage.getItem('@Laparc:refreshToken');
        try {
          const apiRefresh = axios.create({
            baseURL: 'https://api.laparc.com.br/',
          });
          const response = await apiRefresh.get('/refresh-token', {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });
          localStorage.setItem('@Laparc:token', response.data.token);
          localStorage.setItem('@Laparc:refreshToken', response.data.refresh_token);
          originalReq.headers['Authorization'] = `Bearer ${response.data.token}`;
        } catch (error) {
          console.log(error, 'error');
          addToast({
            type: 'error',
            title: 'Sessão expirada',
          });
          signOut()
          
        }
        return axios(originalReq);
      } else {
        throw err;
      }
    }
  );
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/esqueci-minha-senha" component={ForgotPassword} />

      <Route path="/pacientes" component={ViewPatients} isPrivate />
      <Route path="/adicionar-paciente" component={AddPatient} isPrivate />
      <Route path="/adicionar-usuario" component={Register} isPrivate />
      <Route path="/ver-paciente" component={ViewPatient} isPrivate />

      <Route path="/noticias" component={ViewNews} isPrivate />
      <Route path="/adicionar-noticia" component={AddNew} isPrivate />
      <Route path="/editar-noticia" component={EditNew} isPrivate />
      <Route
        path="/publicacoes-cientificas"
        component={ViewScientificPubs}
        isPrivate
      />
      <Route
        path="/adicionar-publicacao"
        component={AddScientificPubs}
        isPrivate
      />
      <Route
        path="/editar-publicacao"
        component={EditScientificPubs}
        isPrivate
      />

      <Route path="/perguntas-frequentes" component={Faq} isPrivate />
      <Route path="/adicionar-pergunta" component={AddQuestion} isPrivate />
      <Route path="/editar-pergunta" component={EditQuestion} isPrivate />

      <Route path="/nossa-historia" component={OurStory} isPrivate />

      <Route path="/quem-somos" component={AboutUs} isPrivate />

      <Route path="/configuracoes" component={Configuration} isPrivate />

      <ReactDOMRoute
        path="/redefinir-senha/:type/:token"
        component={RedefinePassword}
      />
    </Switch>
  );
}
