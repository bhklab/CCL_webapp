import React from 'react';
import { Normalize } from 'styled-normalize';
import GlobalStyles from './styles/GlobalStyles';

import Home from './components/Main/Home';
import TopNav from './components/TopNav/TopNav';

function App() {
    return (
        <div className="App">
            <Normalize />
            <GlobalStyles />
            {/* <TopNav /> */}
            <Home />
        </div>
    );
}

export default App;
