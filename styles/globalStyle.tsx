import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    margin: 0;
  } 

  body {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
