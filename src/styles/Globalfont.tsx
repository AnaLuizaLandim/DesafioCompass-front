import { createGlobalStyle } from 'styled-components';
import PoppinsFont from './fonts';

const GlobalStyle = createGlobalStyle`
  ${PoppinsFont}
  body {
    font-family: 'Poppins', 'sans-serif';
  }
`;

export default GlobalStyle;