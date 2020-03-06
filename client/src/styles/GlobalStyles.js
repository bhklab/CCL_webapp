import { createGlobalStyle } from 'styled-components';
// import colors from './colors';
import heroImg from '../images/cells-blue.jpg';

const GlobalStyles = createGlobalStyle`
  #root {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    background: linear-gradient(
      to right top,
      rgba(255, 255, 255, 0.3), 
      rgba(255, 255, 255, 0.3)
    ),url('${heroImg}');
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    flex-wrap: wrap;
    display: flex;
    z-index: 0
    .main-wrapper {
      overflow-x:hidden;
    }
  }
}
`;

export default GlobalStyles;
