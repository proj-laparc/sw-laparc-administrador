import styled from 'styled-components';
import {Page } from 'react-pdf';


export const StyledPage = styled(Page)`
  canvas{
    @media(max-width: 800px){
      width: 100% !important;
      height: 120vw !important;
    }
  }
`

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.14);
  width: 90%;
  display: flex;
  border-radius: 8px;
  margin-bottom: 36px;
  justify-content: center;
`;

export const TitleContainer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 80px 0px 40px;
  @media(max-width: 800px){
    padding: 20px 40px 0px 20px;
  }

  h1 {
    font-weight: bold;
    font-size: 23px;
    letter-spacing: 0.01em;
    color: #323c47;
    @media(max-width: 800px){
      font-size: 20px;
  }
  }
`;

export const IconButton = styled.button`
  width: 0px;
  height: 0px;

  button:hover {
    filter: brightness(100%);
  }

  path {
    transition: opacity 0.2s;
  }

  path:hover {
    opacity: 0.3;
  }
`;

export const ContentContainer = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
`;
 
export const PdfContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  flex-direction: column;
  width: 100%;
  div {
    display: flex;
    box-shadow: ${props =>
      props.loading
        ? '0px 0px 16px rgba(0, 0, 0, 0.14)'
        : '0px 0px 0px rgba(0, 0, 0, 0)'};
  }

  button {
    background-color: transparent;
    display: flex;
    align-items: center;
  }
`;



export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Subtitle = styled.h1`
  text-align: center;
  font-size: 19px;
  color: #334d6e;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  height: ${props => (props.error ? 350 : 745)}px;
  align-items: center;
`;
