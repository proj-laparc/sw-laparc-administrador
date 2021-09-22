import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const toastTypeVariations = {
  info: css`
    background-color: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background-color: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background-color: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  /*sombra vai ficar com essa cor*/
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  ${props => toastTypeVariations[props.type || 'info']}
  /*isso é pra estilizar apenas o ícone que está diretamente
  dentro da div, o ícone do botão não vai ser estilizado*/
  > svg {
    margin: -0.3px 12px 0 0;
  }

  /*um toast que vem depois de outro toast...*/
  & + div {
    margin-top: 8px;
  }

  div {
    flex: 1;
  }

  p {
    margin-top: 4px;
    font-size: 14px;
    opacity: 0.8;
    line-height: 20px;
  }

  button {
    height: 40px;
    width: 50px;
    position: absolute;
    right: 3px;
    top: -3px;
    border: 0;
    background-color: transparent;
    /*escolhe a cor que está sendo utilizada no container*/
    color: inherit;
  }

  ${props =>
    props.noDescription &&
    css`
      align-items: center;

      > svg {
        margin-top: -2.5px;
      }
    `}
`;
