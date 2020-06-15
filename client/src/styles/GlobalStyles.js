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
        font-weight: 400;
        font-size: calc(5vw + 8em);
    }
    h2 {
        color: ${colors.pink_main};
        font-family: 'Sen', sans-serif;
        font-weight: 400;
        font-size: calc(1vw + 1.5em);
        text-align: center;
        margin: 0;
    }
    main {
        width: 60%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 50%;
        // background:rgb(0,0,0,0.5);
    }
    .logo {
        width: calc(5vw + 7em);
        padding-top: 30px;

    }
    .header-container {
        display:flex;
        justify-content: center;
        align-items:center;
    }
    .App {
        width: 100%;
    }
    .top-nav {
        h1 {
            text-align: left;
        }
    }
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 300px;
        padding: 10px;
        margin: auto;
        width: 150px;
        text-align: center;
        h3 {
            color: white;
        }
    }

    // plotly styling
    .js-plotly-plot {
        width: 100%;
    }

    // react-table class styling
    .ReactTable {
        background:white;
        color: ${colors.darkblue_text};
    }
    
    .table-header {
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .arrow-container {
        display:flex;
        flex-direction:column;
        justify-content: space-between;
        height: 13px;
        img {
            width: 7px !important;
        }
    }
    .-sort-asc {
        box-shadow:none !important;
        .up-arrow {
            opacity:1;
        }
        .down-arrow {
            opacity:0;
        }
    }
    .-sort-desc {
        box-shadow:none !important;
        .up-arrow {
            opacity:0;
        }
        .down-arrow {
            opacity:1;
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
