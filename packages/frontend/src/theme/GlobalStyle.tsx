import { createGlobalStyle } from 'styled-components'
import { pixelSizes } from './breakpoints'
import { secondaryFontFamily } from './utils'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    margin: 0; 
    height: 100%; 
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    ${secondaryFontFamily}
    height: 100%; 
    padding: 0;
    margin: 0;
    font-size: ${({ theme }): string => theme.bodyFontSize};
    line-height: 2;
    color: ${({ theme }): string => theme.primaryFontColor};
    background: ${({ theme }): string => theme.primaryBackgroundColor};
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
    color: ${({ theme }): string => theme.primaryFontColor};
    line-height: 1;
    margin: 0;
  }
  
  @media screen and (max-width: ${pixelSizes.tablet}) {
    input, select, textarea {
      font-size: 16px;
    }
  }
`

export default GlobalStyle
