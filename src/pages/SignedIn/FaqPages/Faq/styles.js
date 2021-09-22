import styled from 'styled-components';

export const Background = styled.div`
  width: 100vw;

  display: inline-flex;
  flex-direction: row;
  background-color: #eaeaea;

  overflow-y: hidden;
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
  width: 79%;
  margin-left: 21%;
  overflow-y: scroll;
  @media(max-width: 800px){
    width: 100%;
    margin: 0 auto;
  }
`;

export const Header = styled.div`
  height: 60px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0px 34px 0px 50px;
  display: flex;
  justify-content: space-between;
  


  h1 {
    color: #99a3ae;
    font-weight: 500;
    font-size: 30px;
    line-height: 45px;
    span{
      @media (max-width: 800px){
        display: none;
      }
    }
  }
`;

export const SearchBar = styled.div`
  height: 5.2vh;
  width: 24vw;
  background-color: #eeeeee;
  padding: 0 2.6vw;
  display: flex;
  align-items: center;

  input {
    border: 0px;
    margin-left: 0.95vw;

    width: 100%;
    height: 85%;
    font-size: 12px;
    color: #99a6b7;
    background-color: transparent;

    ::placeholder {
      font-size: 12px;
      line-height: 18px;
      letter-spacing: 0.01em;
      color: #99a6b7;
    }
  }
`;

export const AddQuestionButton = styled.button`
  background-color: var(--primary);
  box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
  border-radius: 4px;
  width: 160px;
  height: 42px;
  align-items: center;
  justify-content: center;
  margin-top: 4.7vh;
  @media(max-width: 640px){
    display: none;
  }

  h1 {
    font-weight: 600;
    font-size: 13px;
    line-height: 19px;
    color: #ffffff;
    text-decoration: none;
  }
`;
export const AddQuestionPlusButton = styled.button`
  background-color: var(--primary);
  box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
  width: 70px;
  height: 70px;
  border-radius:50%;
  position: fixed;
  bottom: 8vh;
  right: 30px;
  display: none;
  z-index: 100;
  @media(max-width:640px){
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg{
    width: 50px;
    height: 50px;
  }
` 
export const QuestionsDashboard = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  width: 100%;
  align-self: center;
  padding-bottom: 50px;
  @media(max-width: 800px){
    width: 100vw;
    padding-top: 5px;
    margin-top: 10px;
  }

  section {
    background-color: #fff;
    width: 80%;
    display: flex;
    flex-direction: column;
  }
`;

export const LoadingContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

export const Subtitle = styled.h1`
  text-align: center;
  font-size: 25px;
  color: #334d6e;
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
