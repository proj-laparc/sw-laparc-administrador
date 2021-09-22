import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100vw;
  max-height: 100vh;
  @media(max-width:641px){
    align-items: center;
    justify-content: center;
  }
`;
 
export const ArcosImage = styled.img`
  width: 65%;
  @media(max-width:1007px){
    width: 60%;
  }
  @media(max-width:641px){
    display: none;
  }
`;
 
export const MainLogin = styled.div`
  display: flex;
  width: 35%;
  justify-content: flex-start;
  align-items:center;
  flex-direction: column;
  @media(max-width:1007px){
    width: 400px;
  }
  
`;

export const LogoLaparc = styled.img`
  height: 212px;
  align-self: center;
  @media(max-width:1007px){
    width: 70%;
  }
  @media(max-device-width:568px){
    width: 60%;
  }
`;

export const Inputs = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)}px;
  width: 90%;
  min-width: 300px;
  margin-bottom: 20px;
  @media(max-device-width:568px){
    margin-top: 0;
  }
`;

export const InputType = styled.span`
  font-size: 18px;
  line-height: 21px;
  color: rgba(0, 0, 0, 0.7);
  padding-left: 30px;
  width: 100%;
`;

export const Input = styled.input`
  background: #eeeeee;
  border-radius: 20px;
  width: 100%;
  height: 54px;
  margin-top: 4px;
  color: #666666;
  border: 0px none;
  padding: 0px 30px;
  font-size: 16px;
  border: none;
`;

export const PasswordInput = styled.input`
  border: none;
  background: #eeeeee;
  color: #666666;
  height: 54px;
  width: 100%;
  border-radius: 20px;
  padding: 0px 50px 0px 30px;
`;

export const PasswordContainer = styled.div`
  background: #eeeeee;
  border-radius: 20px;
  width: 100%;
  height: 54px;
  margin-top: 4px;
  border: 0px none;
  font-size: 16px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button{
    position: relative;
    right: 20px;
  }

  
`;

export const LoginButton = styled.button`
  background: var(--primary);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  align-self: center;
  width: 211px;
  height: 54px;
  margin-top: 10px;
  line-height: 21px;
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  transition: filter 0.2s;
  &:hover {
    filter: ${props => (props.disabled ? 'none' : 'brightness(90%)')};
  }
`;

export const ForgotPasswordContainer = styled(Link)`
  text-decoration: none;
  align-self: center;
  transition: opacity 0.2s;
  margin-top: 20px;
  &:focus,
  &:hover {
    opacity: 0.8;
  }
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const ForgotPassword = styled.span`
  color: #666666;
  line-height: 21px;
  font-size: 18px;
  border-bottom: 1px solid #66666690;
`;
