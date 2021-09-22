import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Background = styled.div`
  width: 100vw;
  display: inline-flex;
  flex-direction: row;
  background-color: #eaeaea;
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
  @media(max-device-height: 568px){
    height: 10vh;
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
    top: 15px;

    color: #99a3ae;
    width: 35px;
    height: 35px;
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

export const AddQuestionDashboard = styled.div`
  width: 59vw;
  background-color: #fff;
  align-self: center;
  margin-top: 6.95vh;
  display: flex;
  flex-direction: column;
  @media(max-width: 800px){
    width: 90vw;
    margin-top: 10px;
  }
`;
/*
export const Header = styled.div`
  margin: 20px 70px 0px 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
*/
export const AddQuestionTitle = styled.h1`
  font-weight: 500;
  font-size: 30px;
  line-height: 60px;
  color: #99a3ae;
  margin: 20px 0px 0px 70px;
  @media(max-width: 800px){
    display: none;
  }
`;

export const InputContainer = styled.div`
  align-self: center;
  width: 85%;
  margin: 10px 0;

  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.01em;
    color: var(--primary);
  }

  input {
    border-color: #818e9b90;
    border-width: 0px 0px 1.4px 0px;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #323c47;
    width: 90%;
    padding: 4px 0px 3px 0px;
  }
`;

export const LargeInputContainer = styled.div`
  align-self: center;
  width: 85%;

  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.01em;
    color: var(--primary);
  }

  textarea {
    border: 0.7px solid #818e9b90;
    box-sizing: border-box;
    margin-top: 13px;
    font-weight: 500;
    border-radius:1%;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #323c47;
    width: 90%;
    padding: 15px;
    min-height: 350px;
    resize: none;
    text-align: justify;
  }
`;

export const Button = styled.button`
  box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
  border-radius: 4px;
  width: 160px;
  height: 38px;
  align-items: center;
  align-self: center;
  justify-content: center;
  background-color: #eb5757;
  margin: 20px 0;

  h3 {
    font-weight: 600;
    font-size: 13px;
    line-height: 19px;
    letter-spacing: 0.01em;
    color: #ffffff;
  }
`;

export const LanguagesContainer = styled.div`
  height: 100%;
  width: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: flex-end;
  margin: 9.8px 20px 0px 0;
`;

export const LanguageButton = styled.button`
  background-color: transparent;
  opacity: ${props => (props.enabled ? 1 : 0.5)};
`;

