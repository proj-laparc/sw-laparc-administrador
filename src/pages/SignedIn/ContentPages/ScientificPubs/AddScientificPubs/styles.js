import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Background = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  background-color: #eaeaea;
`;
export const Cover = styled.div`
display: ${props => props.open? "block": "none"};
position: fixed;
left: 250px;
top: 0;
z-index:1000;
right: 0;
bottom: 0;
background-color: rgba(33,33,33,0.3);
z-index:99;
@media(min-width: 800px){
  display: none;
}

`
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
  justify-content: center;
}
@media(max-device-height: 568px){
  height: 10vh;
}

h1 {
  color: #99a3ae;
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
  @media(max-width: 800px){
    font-size: 25px;
  }
}
svg{
    position: absolute;
    left: 10px;
    top: 10px;

    color: #99a3ae;
    width: 35px;
    height: 35px;
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

export const AddPubDashboard = styled.div`
  width: 59vw;
  background-color: #fff;
  align-self: center;
  margin-top: 6.95vh;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  @media(max-width: 800px){
    width: 90vw;
    padding-top: 5px;
    margin-top: 10px;
  }
`;

export const AddPubTitle = styled.h1`
  font-weight: 500;
  font-size: 30px;
  line-height: 60px;
  color: #99a3ae;
  margin: 20px 0px 0px 70px;
  @media(max-width:800px){
    display: none;
  }
`;

export const AddPubDescription = styled.h3`
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 27px;
  letter-spacing: 0.01em;
  color: #323c47;
  width: 85%;
  text-align: justify;
  align-self: center;
`;

export const InputContainer = styled.div`
  align-self: center;
  width: 90%;

  p {
    font-weight: 500;
    font-size: 21.7578px;
    line-height: 33px;
    letter-spacing: 0.01em;
    color: #99a3ae;
    white-space:wrap;
    @media(max-width: 500px){
      font-size: 18px;
    }

  }

  input {
    border-color: #818e9b90;
    border-width: 0px 0px 1.4px 0px;
    font-style: normal;
    font-size: 20px;
    color: #323c47;
    width: 90%;
    padding: 11px 0px 3px 0px;
  }
`;

export const DropContainer = styled.div`
  border: 3px dashed #ababab;
  border-radius: 9px;
  width: 100px;
  height: 100px;
  margin-top: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: center;

  svg {
    height: 55px;
    width: 55px;
  }
`;

export const UploadedFile = styled.div`
  margin-top: 55px;
  align-self: center;

  a {
    margin-left: 10px;

    img {
      width: 200px;
      height: 200px;
    }
  }

  button {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a8a8b3;
    transition: filter 0.2s;
    margin-bottom: 7px;

    :hover {
      filter: brightness(100%) opacity(0.7);
    }
  }
`;

export const UploadMessage = styled.span`
  font-size: 14px;
  text-align: center;
  color: #323c47;
  font-weight: normal;
`;

export const ButtonsContainer = styled.div`
  align-self: center;
  display: flex;
  margin: 30px 0;
  justify-content: center;
  @media(max-width: 800px){
    flex-direction: column;
  }
  >button{
    margin: 0  0 0 15px;
    @media(max-width: 800px){
      margin: 15px 0 0 0;
    }
  }
`;

function renderButton(type) {
  if (type === 'submit') {
    return css`
      background-color: #ff0000;

      span {
        color: #ffffff;
      }
    `;
  } else {
    return css`
      background-color: white;
      color: black;
      border: 1.5px solid #ff0000;
      transition: filter 0.2s;

      span {
        color: #ff0000;
      }

      :hover {
        filter: brightness(100%) opacity(0.7);
      }
    `;
  }
}

export const Button = styled.button`
  box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
  border-radius: 4px;
  width: 260px;
  height: 43px;
  align-items: center;
  justify-content: center;
  ${props => renderButton(props.type)}

  span {
    font-weight: 500;
    font-size: 15px;
    text-decoration: none;
  }
`;
