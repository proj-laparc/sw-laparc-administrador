import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 100vw;
  max-height: 100vh;
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

export const ForgotPasswordTitle = styled.h2`
  font-style: bold;
  font-size: 21px;
  line-height: 25px;
  color: #242424;
  align-self: center;
  margin-top: 20px;
  @media(max-device-width:568px){
    margin-top: 10px;
  }
`;

export const ForgotPasswordSubtitle = styled.span`
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  max-width: 95vw;
  margin-top: 10px;
  color: #242424;
  align-self: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)}px;  
  align-self: center;
  margin-top: 38px;
`;

export const InputType = styled.span`
  font-size: 18px;
  line-height: 21px;
  color: rgba(0, 0, 0, 0.7);
  margin-left: 30px;
`;

export const Input = styled.input`
  background: #eeeeee;
  border-radius: 20px;
  width: 420px;
  height: 54px;
  margin-top: 4px;
  color: #666666;
  border: 0px none;
  padding: 0px 30px;
  font-size: 16px;
  @media(max-width: 640px){
    width: 75vw;
    min-width: 300px;
  }
`;

export const SubmitButton = styled.button`
  background: var(--primary);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  align-self: center;
  width: 211px;
  height: 54px;
  line-height: 21px;
  margin-top: 50px;
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  transition: filter 0.2s;
  &:hover {
    filter: ${props => (props.disabled ? 'none' : 'brightness(90%)')};
  }
`;

export const BackButton = styled(Link)`
  margin-top: 40px;
  margin-left: 70px;
  align-self: flex-start;
  svg{
      width: 40px;
      height: 40px;
    }
  @media(max-width: 500px){
    margin-left:20px;
  }
  @media(max-device-width:568px){
    margin-top: 10px;
    
    svg{
      width: 30px;
      height: 30px;
    }
  }
`;
