import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        -webkit-font-smoothing: antialiased;
        font: 500 14px Poppins, sans-serif;
    }

    body, input, button, textarea {
        font: 16px Poppins, sans-serif;
    }

    button {
        border: 0;
        border-radius: 8px;
        background-color: #fff;
        color: #fff;
        font-weight: 700;
        text-align: center;
        text-decoration: none;
        font-size: 18px;
        transition: filter 0.2s;
    }
    
    button:hover{
        filter: brightness(90%);
        cursor: pointer;
    }

    button:disabled{
        opacity: 0.5;
        cursor: not-allowed
    }

    :root {
        --primary: #F7685B;
    }
`;
