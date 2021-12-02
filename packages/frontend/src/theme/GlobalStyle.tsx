import { createGlobalStyle } from 'styled-components'
import { pixelSizes } from './breakpoints'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    margin: 0; 

  }

  html, body, #__next {
     /* height: 100%;  */
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  body { 
    padding: 0;
    margin: 0; 
    line-height: 2; 
    font-family: ${(props: any) => props.theme.font.standard};
  }
  a {
    text-decoration: none;
    color: inherit;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
     line-height: 1;
    margin: 0;
    font-family: ${(props: any) => props.theme.font.standard};

  }

 
  
  @media screen and (max-width: ${pixelSizes.tablet}) {
    input, select, textarea {
      font-size: 16px;
    }
  }
`

export default GlobalStyle
