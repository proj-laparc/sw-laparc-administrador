import styled from 'styled-components';
import HamburgerMenu from "react-hamburger-menu"

const HamburgerBtn = styled(HamburgerMenu)`
  background: transparent;
  border: none;
  display: none;
  z-index: 100;
  width: 35px;
  position: ${props=>props.open? "fixed":"absolute"} !important;
  cursor: pointer;
  left: 15px;
  @media(max-width:800px){
    display: block;
  }
`

export default HamburgerBtn;