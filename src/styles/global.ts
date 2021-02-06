import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  /* Change the white to any color ;) */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  body {
    background: #FFF;
    color: #312e38;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-family: 'Roboto', serif;
    font-size: 16px;
  }
  h1, h2, h3, h4, h5, h6 strong {
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }
`;
