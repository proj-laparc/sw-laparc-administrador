import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 40px 20px 50px;
  min-height: 65px;
  border-bottom: 1.7px solid #ebeff290;
  word-wrap: break-word;
  @media(max-width:640px){
    padding: 10px 20px 10px 25px;
  }

  p {
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #323c47;
    width: 90%;
    text-align: justify;
    text-justify: inter-word;
  }

  span {
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #8f959d;
  }

  button {
    transition: opacity 0.2s;
  }

  button:hover {
    filter: brightness(100%);
    opacity: 0.8;
  }
`;

export const AnswerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 41.5px 20px 50px;
  min-height: 65px;
  border-bottom: 1.7px solid #ebeff290;
  word-wrap: break-word;
  background-color: #e0e0e0;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #323c47;
    width: 90%;
    text-align: justify;
    text-justify: inter-word;
  }

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #8f959d;
  }

  button {
    background-color: transparent;
    height: 20px;
    transition: opacity 0.2s;

    svg {
      height: 15px;
      width: 15px;
    }
  }

  button:hover {
    filter: brightness(100%);
    opacity: 0.8;
  }
`;
