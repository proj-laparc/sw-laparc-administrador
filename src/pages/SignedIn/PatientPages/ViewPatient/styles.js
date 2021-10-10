import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';

export const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  display: inline-flex;
  flex-direction: row;
  background-color: #eaeaea;

  h3 {
    font-weight: 500;
    font-size: 12px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #323c47;
  }
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
  padding: 0px 30px;
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

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  padding-right: 25px;
  margin-bottom: 20px;
  @media(max-width: 800px){
      padding-top: 10px;
      margin-bottom:0;
      justify-content: flex-end;
    }

  h1{
    padding-left: 30px;
    @media(max-width: 800px){
      display: none;
    }
  }
 
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

export const InfoGroup = styled.div`
  div + div{
    margin-top: 20px;
  }
`

export const AddPatientDashboard = styled.div`
  width: 59vw;
  background-color: #fff;
  align-self: center;
  height: 108vh;
  margin-top: 5vh;
  border-radius: 5px;
  @media(max-width: 800px){
    width: 90vw;
    margin: 10px auto 0;
    height: 100%;
    padding-top:5px;
  }

  h1 {
    font-size: 30px;
    line-height: 45px;
    color: #99a3ae;
    font-weight: 500;
    
  }
`;

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 0 20px;
  align-items: baseline;
  >*{
    padding-bottom: 10px;
  }
  padding-bottom: 20px;
  >*:nth-child(2n){
    padding-left: 20px;
    
  }
  >*:nth-child(2n+1){
    padding-right: 20px;
    border-right: 1px solid #e6e6e6;
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
  >*:nth-child(2n+1){
    padding-right: 20px;
    border-right: none;
  }
  }
`;


export const LabelContainer = styled.div`
  height:100%;
  p {
    color: #818e9b;
    font-weight: 500;
    font-size: 11px;
    line-height: 100%;
  }
  
`;

export const FormsContainer = styled.div`
  padding: 0;
  width: 29vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media(max-width: 800px){
    height: 100%;
    margin-bottom:15px;
    h3{
      white-space: nowrap;
    }
    
  }

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
  width: 4.2vw;
  height: 4.2vw;
  margin-left: 0.95vw;
  margin-top: 1.8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ReportContainer = styled.div`
  padding: 0;
  width: 29vw;
  height: 30vh;
  @media(max-width: 800px){
    height: 100%;
    h3{
      white-space: nowrap;
    }
  }

  h2 {
    color: #919ca7;
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    width: 80%;
    white-space: nowrap;
    margin: 20px 0 0 0;
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
      @media(max-width: 800px){
        width: 80%;
      }
    }
  }
`;

export const ObsContainer = styled.div`
  width: 19.8vw;
  margin-left: 20px;
  align-self: flex-end;
  @media(max-width: 800px){
      width: 90%;
      align-self: flex-end;
      height: 100%;
    }

  p {
    color: #818e9b;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    white-space: nowrap;
  }

  h3 {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #323c47;
    margin-bottom: 15px;
    @media(max-width: 800px){
      width: 60vw;
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  h2{
    margin-bottom: 20px;
  }
`;

export const MedicalDateContainer = styled.div`
  h1 {
    color: #919ca7;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
  }
`;

export const Appointments = styled.div`
  display: flex;
  flex-direction:column;

`;

export const Appointment = styled.div`
  margin-top : 20px;
`

export const AddButton = styled.button`
  margin-top: 25vh;
  margin-left: 14.5vw;
  width: 160px;
  height: 42px;

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

export const UploadedFile = styled.div`
  margin-top: ${props => (props.form ? 1.8 : 0)}vh;
  height: 4.2vw;
  width: 4.2vw;
  margin-left: 0.95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media(max-width: 800px){
    margin-left: 20px;
  }

  img {
    height: 68px;
  }
`;

export const Report = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`

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
  margin-top: 20px;
  align-self: center;
  margin-left: 3.3vw;

  display: flex;
  ${props => renderActions(props.appointment)}

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
