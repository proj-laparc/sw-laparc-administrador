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
  right: 0;
  z-index:1000;
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
  display: flex;
  flex-direction: column;
  @media(max-width: 800px){
    margin-left: 0;
    width: 100%;
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
  @media (max-width:800px){
    flex-direction: column;
    justify-content: center;
    padding:0;
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
`;

export const AddUserButton = styled.button`
  background-color: var(--primary);
  box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
  border-radius: 4px;
  width: 205px;
  height: 43px;
  align-items: center;
  justify-content: center;
  margin-top: 4.7vh;
  @media(max-width: 800px){
    margin-top: 15px;
  }

  h1 {
    font-weight: 600;
    font-size: 13px;
    line-height: 19px;
    color: #ffffff;
    text-decoration: none;
  }
`;

export const Dashboard = styled.div`
  width: 75%;
  background-color: #fff;
  align-self: center;
  margin-top: 40px;
  display: flex;
  padding: 0 30px;
  flex-direction: column;
  border-radius: 5px 5px 0px 0px;
  border-bottom: 2.04px solid #ebeff2;
  @media(max-width: 800px){
    width: 90%;
    margin-top: 15px;
  }
`;

export const TitleContainer = styled.div`
  margin-top: 20px; 
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: #fff;
    transition: opacity 0.2s;
  }

  button:hover {
    filter: brightness(100%);
    opacity: 0.8;
  }
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
  color: #99a3ae;
`;

export const InformationContainer = styled.div`
  margin-top: 35px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  @media(max-width: 800px){
    grid-template-columns: 100%;
  }
`;


export const LabelContainer = styled.div`
  

  p {
    color: var(--primary);
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.01em;
  }

  h3 {
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #323c47;
    margin-top: 6px;
  }
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 85%;

  div {
    width: 22vw;
  }
`;

export const OptionsContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  button {
    width: 0px;
    width: fit-content;
    margin-top: 8px;

    h3 {
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      letter-spacing: 0.01em;
      color: var(--primary);
    }
  }

  button:hover {
    filter: brightness(100%);
    opacity: 0.8;
  }
`;
 
export const EditionDashboard = styled.div`
  background-color: #fff;
  width: 75%;
  align-self: center;
  padding: 10px 20px 0;
  
  display: flex;
  flex-direction: column;
  @media(max-width: 800px){
    width: 90%;
  }
`;

export const InputContainer = styled.div`
  width: 400px;
  @media(max-width:800px){
    width: 100%;
  }
  margin-top: ${props => props.marginTop && `${props.marginTop}vh`};

  p {
    color: var(--primary);
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.01em;
  }

  input {
    border-color: #818e9b90;
    border-width: 0px 0px 1.4px 0px;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #323c47;
    width: 400px;
    padding: 6px 0px 3px 0px;
    @media(max-width:800px){
    width: 100%;
  }
  }
`;

export const ButtonsContainer = styled.div`
  margin: 20px 0px;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-self: flex-start;
  @media(max-width:800px){
    flex-direction:column-reverse;
    align-self: center;
  }
`;

export const EditButton = styled.button`
  width: 160px;
  height: 42px;
  background: var(--primary);
  box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
  margin: 0 0 0 15px;
  border-radius: 4px;
  @media(max-width:800px){
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
