import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function Route({
  isPrivate = false,
  component: Component,
  ...rest
}) {
  const { token } = useAuth();

  /*Aqui nós estamos sobrescrevendo o componente Route
  do react-router-dom. Estamos fazendo isso para adicionar
  a propriedade isPrivate que significa se uma rota precisa
  de autenticação para ser acessada ou não. Mas não podemos 
  perder as propriedades padrão do componente Route do react-
  router-dom, por isso utilizamos o {...rest}. Já o render é 
  para nós passarmos uma lógica antes do componente ser 
  renderizado em tela, isto é, nessa hora faremos a verificação
  se a rota é privada, se o usuário está logado e etc.

  A lógica é a seguinte: temos duas variáveis (isPrivate e isSigned)
  e funciona da seguinte forma, se elas forem iguais, ele pode entrar
  se essas duas variáveis forem true ou false e não poderemos se elas 
  tiverem diferentes.
  
  true/true = OK
  true/false = Redirecionar pro login
  false/true = Redirecionar para o dashboard
  false/false = OK*/

  //location é para repassar o histórico

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) =>
        isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : "/pacientes",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
