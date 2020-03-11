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
    .main-submit {
        background-color: ${colors.pink_main};
        border-radius: 25px;
        width: 50%;
        height: 100%;
        margin: 50px 0px 80px 0px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Open Sans', sans-serif;
        font-size: calc(0.5vw + 0.5em);
        
        .input {
            display:none;
        }
        button {
            background: ${colors.darkblue_bg};
            color: white;
            border: none;
            cursor: pointer;
            padding: 8px 10px;
            border-radius:10px;
            font-weight: 600;
        }
        .choose-file {
            background: ${colors.darkblue_bg};
            color: white;
            cursor: pointer;
            padding: 8px 10px;
            border-radius:10px;
            font-weight: 600;
        }
        .file-uploaded {
            color: ${colors.darkblue_text};
            font-size: calc(0.5vw + 0.6em);
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
