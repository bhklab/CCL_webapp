import { createGlobalStyle } from 'styled-components';
import colors from './colors';
// import heroImg from '../images/cells-blue.jpg';
import heroImg from '../images/dark-blue-red-filtered.jpg';

const GlobalStyles = createGlobalStyle`
  
    h1 {
        margin: 0;
        color: ${colors.pink_main};
        text-align:left;
        font-size: calc(5vw + 5em);
        letter-spacing: 3px;
        font-family: 'Sen', sans-serif;
        font-weight: 700;
        font-size: calc(5vw + 8em);
    }
    main {
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 50%;
        // background:rgb(0,0,0,0.5);
    }
    .App {
        width: 100%;
    }
    .top-nav {
        h1 {
            text-align: left;
        }
    }
    #root {
        width: 100vw;
        min-height: 100vh;
        display: flex;
        background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0), 
        rgba(0, 0, 0, 0)
        ),url('${heroImg}');
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        display: flex;
        z-index: 0
        .main-wrapper {
        overflow-x:hidden;
        }
    }
}
`;

export default GlobalStyles;
