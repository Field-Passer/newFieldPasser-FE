import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
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
    border-radius: 10px;
    cursor: pointer;
  }

  #root {
    font-family: 'Pretendard-Regular', 'Noto Sans KR', sans-serif;
    position:relative;
    min-height:100%;

    /* Screen max-width */
    $screen-pc: 360px;
    $screen-tab: 834px;
    $screen-m: 1440px;

  }
`
export const COLORS = {
  green: '#5FCA7B',
  font: '#3A3A3A',
  gray40: '#AAAAAA',
  gray30: '#CCCCCC',
  gray20: '#D9D9D9',
  gray10: '#FAFAFA',
}

export const FONT = {
  pc: '16px',
  'pc-lg': '20px',
  m: '14px',
  'm-lg': '16px',
}

export default GlobalStyles
