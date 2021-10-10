import styled from 'styled-components';

export const Container = styled.ul`
  height: 64px;
  border-bottom: 1.7px solid #ebeff290;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flext-start;
`;

export const Name = styled.h1`
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  width: calc(100%/12*4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media(max-width: 800px){
    width: 80%;
  }
`;

export const Email = styled.h1`
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  margin-left: 10px;
  color: #707683;
  width: calc(100%/12*5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media(max-width: 800px){
    display: none;
  }
`;

export const Project = styled.h1`
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  margin-left: 10px;
  color: #707683;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media(max-width: 1000px){
    display: none;
  }
`;



export const ViewButton = styled.button`
  height: 70%;
  transition: filter 0.2s;
  margin-left: 20px;
  text-decoration: none;
  @media(max-width: 800px){
    margin-right: 10px;
  }

  h1 {
    font-weight: 600;
    color: var(--primary);
    font-size: 13px;
    text-decoration: none;
  }

  &:hover {
    filter: opacity(0.7);
    cursor: pointer;
  }
`;
export const Group = styled.div`
  display: flex;
  justify-content: space-between;
  @media(min-width:800px){
    width: calc(100%/12*3);
  }
`