import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';
import Select from 'react-select';

export const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: #eaeaea;
`;

export const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 79%;
  margin-left: 21%;
  @media(max-width: 800px){
    width: 100%;
    margin: 0 auto;
  }
`;


export const Header = styled.div`
  height: 60px;
  width: 100%;
  background-color: #fff;
  display: none;
  align-items: center;
  @media (max-width:800px){
    display: flex;
    justify-content: space-between;
  }

  h1 {
    color: #99a3ae;
    font-weight: 500;
    font-size: 30px;
    line-height: 45px;
    
  }
  svg{
    position: absolute;
    left: 10px;
    top: 10px;
    color: #99a3ae;
    width: 40px;
    height: 40px;
  }
`;


export const BackLink = styled(Link)`
  margin-left: 2.6vw;
  margin-top: 2vh;
  height: 8vh;
  width: 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  @media(max-width: 800px){
    display: none;
  }
`;

export const AddPatientDashboard = styled.div`
  width: 59vw;
  background-color: #fff;
  align-self: center;
  height: 100%;
  margin-top: 5vh;
  border-radius:5px;
  @media(max-width: 800px){
    width: 90%;
    margin: 10px auto 0;
    padding-top:5px;
  }

  h1 {
    margin-top: 2.08vh;
    margin-left: 3.3vw;
    font-size: 30px;
    line-height: 45px;
    color: #99a3ae;
    font-weight: 500;
    @media(max-width: 800px){
      display: none;
    }
  }
`;

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  align-items: baseline;
  >*{
    padding-bottom: 10px;
  }
  padding-bottom: 20px;
  >*:nth-child(2n){
    padding-left: 20px;
    border-left: 1px solid #e6e6e6;
  }

  @media(max-width: 800px){
    grid-template-columns: 1fr;
    >*{
      width: 100%;
    }
    >*:nth-child(2n){
    padding-left: 0;
    border-left: none;
  }
  }
`;

export const InputContainer = styled.div`
  width: 22vw;
  @media(max-width: 800px){
    width: 100%;
    display: block;
  }

  p {
    color: var(--primary);
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
  }

  input {
    border-color: #818e9b90;
    border-width: 0px 0px 1.4px 0px;
    font-weight: 500;
    font-size: 12px;
    line-height: 22px;
    color: #323c47;
    width: 22vw;
    padding: 4px 0px 3px 0px;
    @media(max-width: 800px){
      width: 100%;
      display: block;
    }
  }
`;

export const FormsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    color: #919ca7;
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
  }

  p {
    color: #000000;
    font-size: 12px;
    font-weight: 400;
    width: 100px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
`;

export const DropContainer = styled.div`
  border: 3px dashed #ababab;
  border-radius: 9px;
  width: 50px;
  height: 50px;
  margin-left: 0.95vw;
  margin-top: 1.8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
`;

export const ReportContainer = styled.div`

  h2 {
    color: #919ca7;
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    margin-top: 30px;
  }

  a {
    p {
      color: #000000;
      font-size: 12px;
      font-weight: 400;
      width: 95px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
`;

export const ObsContainer = styled.div`
  width: 19.8vw;
  margin: 0 0 10px 10px;
  align-self: center;
  @media(max-width: 800px){
      width: 90%;
      align-self: flex-end;
    }

  p {
    color: var(--primary);
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
  }

  input {
    border-color: #818e9b90;
    border-width: 0px 0px 1.4px 0px;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.01em;
    color: #323c47;
    width: 19.8vw;
    padding: 4px 0px 5px 0px;
    margin-bottom: 7px;
    @media(max-width: 800px){
      width: 100%;
    }

    ::placeholder {
      font-size: 13px;
      line-height: 15px;
      letter-spacing: 0.01em;
      color: #323c4770;
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 30px;
`;
export const StyledSelect = styled(Select)`
  @media(max-width: 800px){
    width: 100% !important;
  }
`
export const MedicalDateContainer = styled.div`
  h1 {
    margin-left: 0px;
    color: #919ca7;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
  }

  input {
    border-color: #818e9b90;
    border-width: 0px 0px 1.4px 0px;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.01em;
    color: #323c47;
    width: 19.8vw;
    padding: 4px 0px 5px 0px;
    margin-bottom: 7px;
    @media(max-width: 800px){
      width: 100%;
    }

    ::placeholder {
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 0.01em;
      color: #323c4770;
    }
  }
`;

export const AddButton = styled.button`
  width: 160px;
  height: 42px;
  margin: 0 0 0 15px;
  @media(max-width: 800px){
    margin: 0 0 15px 0;
  }
  background: var(--primary);
  box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
  border-radius: 4px;

  p {
    font-weight: 600;
    font-size: 12px;
    line-height: 19px;
    text-align: center;
    letter-spacing: 0.01em;
  }
`;

export const CancelButton = styled.button`
  width: 160px;
  height: 42px;

  background-color: white;
  color: black;
  border: 1.5px solid var(--primary);
  box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
  border-radius: 4px;
  transition: filter 0.2s;

  p {
    color: var(--primary);
    font-weight: 600;
    font-size: 12px;
    line-height: 19px;
    text-align: center;
    letter-spacing: 0.01em;
  }

  :hover {
    filter: brightness(100%) opacity(0.7);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
  @media(max-width: 800px){
    justify-content: center;
    flex-direction: column-reverse;
    align-self: center;
  }
`;

export const UploadMessage = styled.span`
  font-size: 12.5px;
  text-align: center;
  color: #323c47;
  font-weight: normal;
`;

export const UploadedFile = styled.div`
  display: flex;

  img {
    border-radius: 34px;
    height: 68px;
  }

  button {
    color: #a8a8b3;
    transition: filter 0.2s;
    display: flex;
    position: absolute;

    :hover {
      filter: brightness(100%) opacity(0.7);
    }
  }
`;

function renderActions(appointment) {
  if (appointment === 0) {
    return css`
      justify-content: flex-end;
    `;
  } else {
    return css`
      justify-content: space-between;
    `;
  }
}

export const ActionsContainer = styled.div`
  width: 20vw;
  margin-top: 3px;
  align-self: center;
  display: flex;
  ${props => renderActions(props.appointment)}
  @media(max-width: 800px){
    width: 100%;
  }

  span {
    font-weight: 500;
    font-size: 11px;
    color: #919ca7;
  }

  button {
    transition: filter 0.2s;

    :hover {
      filter: brightness(100%) opacity(0.7);
    }
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  padding-right: 25px;
  @media(max-width: 800px){
    justify-content: flex-end;
    padding-top: 10px;
  }

  button:hover {
    filter: brightness(100%);
  }

  path {
    transition: opacity 0.2s;
  }

  path:hover {
    opacity: 0.8;
  }
`;
