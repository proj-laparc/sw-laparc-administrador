import styled from 'styled-components';

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.14);
  width: 90%;
  display: flex;
  border-radius: 8px;
  margin-bottom: 36px;
  justify-content: center;
`;

export const TitleContainer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 80px 0px 40px;
  @media(max-width: 800px){
    padding: 20px 40px 0px 20px;
  }

  h1 {
    font-weight: bold;
    font-size: 23px;
    letter-spacing: 0.01em;
    color: #323c47;
    @media(max-width: 800px){
      font-size: 20px;
      
    }
  }
`;

export const IconButton = styled.button`
  width: 0px;
  height: 0px;

  button:hover {
    filter: brightness(100%);
  }

  path {
    transition: opacity 0.2s;
  }

  path:hover {
    opacity: 0.3;
  }
`;

export const ContentContainer = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;

  div {
    padding-bottom: 17px;
  }
  img{
    width: 100%;
    height: 100%;
  }
`;

export const ButtonsContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ViewButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.02em;
  background: var(--primary);
  border-radius: 4px;
  width: 150px;
  height: 35px;
  margin-bottom: 16px;
`;
