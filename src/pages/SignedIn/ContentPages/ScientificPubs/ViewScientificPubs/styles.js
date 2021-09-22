import styled from 'styled-components';

export const Background = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: row;
  background-color: #eaeaea;
`;
 
export const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 79%;
  margin-left: 21%;
  display: flex;
  flex-direction: column;
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
    height: 120px;
    padding:0;
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
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media(max-width:800px){
    justify-content: center;
  }
`

 

export const SearchBar = styled.div`
  height: 36px;
  width: 24vw;
  background-color: #eeeeee;
  padding: 0 2.6vw;
  border-radius: 5px;
  display: flex;
  align-items: center;
  @media(max-width: 800px){
    width: 95vw ;
    margin: 15px 10px 5px;
    height: 40px;
  }

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

export const AddPubButton = styled.button`
  background-color: var(--primary);
  box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
  border-radius: 4px;
  width: 180px;
  height: 42px;
  align-items: center;
  justify-content: center;
  margin-top: 4.7vh;
  @media(max-width:640px){
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
export const AddPubPlusButton = styled.button`
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
export const PubsDashboard = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  align-self: center;
  width: 90%;
  align-self: center;
  padding-bottom: 50px;
  @media(max-width: 800px){
    margin-top: 10px;
  }

  section {
    background-color: #fff;
    width: 80%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 44px;
    @media(max-width: 800px) {
      width: 95vw;
    }
  }
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: 'center';
  align-items: 'center';

  button {
    height: 5vh;
    display: flex;
    align-self: center;
    font-weight: 500;
    font-size: 14.5px;
    color: var(--primary);
    transition: filter 0.2s;

    :hover {
      filter: brightness(100%) opacity(0.7);
    }
  }
`;

export const LoadingContainer = styled.div`
  margin-top: ${props => (props.notFound ? 0 : 30)}px;
  display: flex;
  flex-direction: column;
`;

export const Subtitle = styled.h1`
  text-align: center;
  font-size: 25px;
  color: #334d6e;
`;
