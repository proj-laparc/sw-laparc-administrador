import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 21%;
  box-shadow: 6px 0px 18px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  min-width: 205px;
  z-index:90;
  @media(max-width: 800px){
    display: ${props => props.open? "block":"none"};
    position: fixed;
    width: 250px;
  }
  
`;
 
export const TitleContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: ${props => props.open? "40px":"1.8vw"};
  border-bottom: 1.5px solid #ebeff290;
  

  h1 {
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: var(--primary);
  }
`;

export const ProfileContainer = styled.div`
  padding-top: 3.5vh;
  padding-left: 2.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #242424;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h3 {
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    color: #919ca7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const SideBarContainer = styled.div`
  margin-top: 4.3vh;
  display: inline-block;
`;

export const LogoutContainer = styled.div`
  margin-top: 1vh;
  border-top: 1.5px solid #ebeff290;
  padding-top: 2.7vh;
  transition: 0;

  button {
    background-color: transparent;
  }
`;

