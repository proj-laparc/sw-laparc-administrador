import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled(Link)`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props =>
    props.showSubOptions && props.subOptions ? '5px' : '2.4vh'};

  h1 {
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    margin-left: 12px;
    color: ${props =>
      props.active || props.showSubOptions ? 'var(--primary)' : '#242424'};
    transition: color 0.2s;
  }

  path {
    fill: ${props =>
      props.fill &&
      (props.active || props.showSubOptions) &&
      props.theme.colors.primary};
    stroke: ${props =>
      props.stroke &&
      (props.active || props.showSubOptions) &&
      props.theme.colors.primary};
    transition: opacity(0.2) 0.2s;
    transition: stroke 0.2s;
  }

  &:hover {
    h1 {
      color: var(--primary);
    }

    path {
      fill: ${props => props.fill && props.theme.colors.primary};
      stroke: ${props => props.stroke && props.theme.colors.primary};
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.6vw;
`;

export const SubOptions = styled.div`
  margin-bottom: 2.4vh;
  display: flex;
  flex-direction: column;
  padding-left: 32px;
`;

export const SubOption = styled(Link)`
  display: flex;
  justify-content: flex-start;
  transition: color 0.2s;
  color: ${props => (props.active ? 'var(--primary)' : '#242424')};
  text-decoration: none;

  :hover {
    color: var(--primary);
  }

  h2 {
    font-weight: 500;
    font-size: 11.5px;
    line-height: 16px;
    letter-spacing: 0.01em;
    margin-top: 8px;
    text-decoration: none;
  }
`;
