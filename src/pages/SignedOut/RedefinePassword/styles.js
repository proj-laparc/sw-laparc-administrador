import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
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

export const RedefinePasswordTitle = styled.h2`
  font-style: bold;
  font-size: 21px;
  line-height: 25px;
  color: #242424;
  align-self: center;
  margin-top: 23px;
  @media(max-device-width:568px){
    margin-top: 10px;
  }
  
`;

export const Inputs = styled.div`
  align-self: center;
  margin-top: 33px;
  @media(max-device-width:568px){
    margin-top: 10px;
  }
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
  @media(max-device-width:568px){
    font-size: 16px;
  }
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
  border: none;
  @media(max-width: 640px){
    width: 75vw;
    min-width: 300px;
  }
`;

export const PasswordInput = styled.input`
  border: none;
  background: #eeeeee;
  color: #666666;
  height: 54px;
  width: 420px;
  border-radius: 20px;
  padding: 0px 50px 0px 30px;
  @media(max-width:500px){
    width: 90vw;
    min-width: 300px;
  }
  @media(max-device-width:568px){
    height: 45px;
    width: 280px;
    min-width: 200px;
    padding: 0 30px 0 10px;
    font-size: 14px;
  }
`;

export const PasswordContainer = styled.div`
  background: #eeeeee;
  border-radius: 20px;
  width: 420px;
  height: 54px;
  margin-top: 4px;
  border: 0px none;
  font-size: 16px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media(max-width:500px){
    width: 90vw;
    min-width: 300px;
  }
  @media(max-device-width:568px){
    height: 45px;
    width: 280px;
    min-width: 200px;
  }

  button {
    position: relative;
    right: 20px;
    @media(max-width:500px){
    right: 25px;
  }
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
  margin-top: 34px;
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  transition: filter 0.2s;
  &:hover {
    filter: ${props => (props.disabled ? 'none' : 'brightness(90%)')};
  }
`;
