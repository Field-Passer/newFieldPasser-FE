import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  main, section {
    max-width: 1024px;
  }
  a{
      text-decoration: none;
      color: inherit;
  }
  input, textarea { 
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
  input:focus {
    outline: none;
  }
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  #root {
    font-family: 'NanumSquareNeo-Variable', 'Noto Sans KR', sans-serif;
    position:relative;
    min-height:100%;
    /* Color */
    --color-main: #5FCA7B;
    --color-font: #3A3A3A;
    --color-mint: #E2FFEA;
  }
`
export default GlobalStyles
