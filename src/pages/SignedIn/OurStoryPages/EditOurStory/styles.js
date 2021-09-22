import styled, { css } from 'styled-components';

export const Background = styled.div`
  width: 100vw;

  display: inline-flex;
  flex-direction: row;
  background-color: #eaeaea;

  overflow-y: hidden;
`; 

export const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 79%;
  margin-left: 21%;
  overflow-y: scroll;
  
  @media(max-width:1000px){
    width: 100%;
  }
  @media(max-width: 800px){
    margin-left: 0;
    width: 100%;
  }
`;

export const Cover = styled.div`
  display: ${props => props.open? "block": "none"};
  position: fixed;
  left: 250px;
  top: 0;
  right: 0;
  z-index:1000;
  bottom: 0;
  background-color: rgba(33,33,33,0.3);
  z-index:99;
  @media(min-width: 800px){
    display: none;
  }

`
export const Header = styled.div`
  height: 60px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0px 34px 0px 50px;
  display: flex;
  justify-content: space-between;
  @media (max-width:800px){
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding:10px 0;
  } 
 
  h1 {
    color: #99a3ae;
    font-weight: 500;
    font-size: 30px;
    line-height: 45px;
  }
`;

export const Dashboard = styled.div`
  width: 90%;
  background-color: #fff;
  align-self: center;
  margin: 6.95vh auto 0;
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Title = styled.h1`
  margin-top: 40px;
  font-weight: 500;
  font-size: 35px;
  line-height: 45px;
  color: #99a3ae;
  align-self: center;
  @media(max-width: 600px){
    font-size: 30px;
  }
  @media(max-device-width: 568px){
    font-size: 25px;
  }
`;

export const Description = styled.textarea`
  border: 0.7px solid #818e9b;
  box-sizing: border-box;
  margin-top: 40px;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0.01em;
  color: #323c47;
  width: 85%;
  padding: 25px;
  min-height: 350px;
  resize: none;
  align-self: center;
  height: 60vh;
  text-align: justify;
  @media(max-width: 800px){
    padding: 10px;
    width: 90%;
  }
`;

export const PicturesContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Picture = styled.img`
  width: 400px;
  height: 300px;
  border-radius: 2px;
  align-self: center;
  @media(max-width: 600px){
    width: 280px;
    height: 210px;
  }
  @media(max-device-width: 568px){
    width: 240px;
    height: 180px;
  }
`;

export const ButtonsContainer = styled.div`
  flex: row;
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin: 20px 0;
  @media(max-width: 800px){
    flex-direction: column-reverse;
  }
`;

export const EditButton = styled.button`
  width: 160px;
  height: 42px;
  margin: 0 0 0 15px;
  background: var(--primary);
  box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
  border-radius: 4px;
  @media(max-width: 800px){
    margin: 0 0 15px 0;
  }
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

export const DropContainer = styled.div`
  border: 3px dashed #ababab;
  border-radius: 9px;
  width: 419px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: center;
  ${defineMarginTop()}
  @media(max-width: 600px){
    width: 280px;
    height: 210px;
  }
  @media(max-device-width: 568px){
    width: 240px;
    height: 180px;
  }

  svg {
    height: 65px;
    width: 65px;
  }
`;

export const UploadMessage = styled.span`
  font-size: 14px;
  text-align: center;
  color: #323c47;
  font-weight: normal;
`;

function defineMarginTop(index) {
  if (index === 0) {
    return css`
      margin-top: 0px;
    `;
  } else if (index === 1) {
    return css`
      margin-top: 0px;
    `;
  } else if (index === 2) {
    return css`
      margin-top: 40px;
    `;
  } else {
    return css`
      margin-top: 40px;
    `;
  }
}

export const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${defineMarginTop()}

  button {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a8a8b3;
    transition: filter 0.2s;
    position: relative;
    align-self: flex-end;
    right: -20px;
    background-color: transparent;

    :hover {
      filter: brightness(100%) opacity(0.7);
    }
  }
`;

export const LanguagesContainer = styled.div`
  height: 100%;
  width: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 9.8px 0px 0px 22.5px;
`;

export const LanguageButton = styled.button`
  background-color: transparent;
  opacity: ${props => (props.enabled ? 1 : 0.5)};
`;
