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

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`;

export const EditButton = styled.button`
  position: absolute;
  right: 10%;
  background-color: #fff;
  transition: opacity 0.2s;

  &:hover {
    filter: brightness(100%);
    opacity: 0.8;
  }
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

export const Description = styled.div`
  margin-top: 40px;
  padding: 0px 90px;
  @media(max-width: 800px){
    padding: 0 30px;
  }

  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 27px;
    letter-spacing: 0.01em;
    color: #323c47;
    text-align: justify;
  }
`;

function renderRightContainer(length) {
  if (length === 0) {
    return css`
      margin-bottom: 20px;
    `;
  } else if (length === 1) {
      return css`
        justify-content: center;
        margin-bottom: 60px;
      `;
  } else if (length === 2 ) {
      return css`
        justify-content: space-between;
        margin-bottom: 60px;
      `;
  } 
}

export const PicturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  ${props => renderRightContainer(props.length)}
  img + img {
    margin-top: 20px;
  }
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

export const Subtitle = styled.h1`
  text-align: center;
  font-size: 20px;
  color: #334d6e;
`;

export const LoadingContainer = styled.div`
  margin-top: 170px;
  display: flex;
  flex-direction: column;
`;
