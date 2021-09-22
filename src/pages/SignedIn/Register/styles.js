import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
 
export const BackButton = styled(Link)`
  position: absolute;
  left: 20px;
  top: 20px;
`;

export const LogoLaparc = styled.img`
  width: 400px;
  align-self: center;
/*
  margin-top: 30px;
  height: 270px;
  @media(max-width:600px){
    height: 220px;
  }*/

`;

export const RegisterTitle = styled.h2`
  font-style: bold;
  font-size: 21px;
  line-height: 25px;
  color: #242424;
  align-self: center;
  margin-top: 53px;
  @media(max-width:800px){
    font-size: 18px;
  }
`;

export const RegisterSubtitle = styled.span`
  font-size: 18px;
  line-height: 25px;
  margin-top: 10px;
  color: #242424;
  align-self: center;
  text-align: center;
  width: 80%;
  max-width: 650px;
  @media(max-width:800px){
    font-size: 16px;
  }
`;

export const Inputs = styled.div`
  align-self: center;
  margin-top: 43px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)}px;
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
  width: 400px;
  height: 54px;
  margin-top: 4px;
  color: #666666;
  border: 0px none;
  padding: 0px 30px;
  font-size: 16px;
  @media(max-width:800px){
    width: 80vw;
    min-width: 270px;
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
  margin: 30px 0;
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  transition: filter 0.2s;
  align-items: center;
  justify-content: center;
  &:hover {
    filter: ${props => (props.disabled ? 'none' : 'brightness(90%)')};
  }
`;
