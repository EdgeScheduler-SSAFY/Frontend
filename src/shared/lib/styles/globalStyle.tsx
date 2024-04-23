import { createGlobalStyle } from "styled-components";

import { Color } from "@/src/shared/lib/styles/color";

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
    color: ${Color("black")};
  }
`;

export default GlobalStyle;
