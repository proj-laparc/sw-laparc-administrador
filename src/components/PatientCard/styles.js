import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.ul`
  height: 64px;
  border-bottom: 1.7px solid #ebeff290;
  width: 100%;
  display: flex;
  align-items: center;
  @media(max-width: 800px){
    justify-content: space-between;
  }
`;

export const Name = styled.h1`
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  margin-left: 6.8%;
  width: 26%;
  @media(max-width: 800px){
    width: 80%;
  }
`;

export const Email = styled.h1`
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  margin-left: 3.17%;
  color: #707683;
  width: 40%;
  @media(max-width: 800px){
    display: none;
  }
`;

export const ViewButton = styled.button`
  margin-left: 12%;
  height: 70%;
  width: 7%;
  transition: filter 0.2s;
  text-decoration: none;
  @media(max-width: 800px){
    width: 20%;
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
