import { createGlobalStyle } from 'styled-components';
import colors from './colors';
// import heroImg from '../images/cells-blue.jpg';
import heroImg from '../images/cells-dark.jpg';

const GlobalStyles = createGlobalStyle`
  
    h1 {
        margin: 0;
        color: rgb(225, 225, 245);
        text-align:left;
        font-size: calc(5vw + 5em);
        letter-spacing: 3px;
    }
    header {
        padding: 20px 30px;
        min-height: 35px;
        background-color: rgb(0,0,0,0.5);
        width: 100%;
        text-align:left;
        border-bottom: 2px solid ${colors.header_color};

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
    .main-submit {
        background-color: rgb(0,0,0,0.5);
        // background-color: black;
        border: 2px solid ${colors.header_color};
        border-radius: 35px;
        width: 60%;
        height: 100%;
        margin: 50px 0px 80px 0px;
        padding: 20px;
        input {
            background-color: #fff
        }
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
        to top,
        rgba(255, 255, 255, 0.1), 
        rgba(0,0,0,0.8)
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
