import React, { useState } from 'react';

import UploadForm from './UploadForm';
import Analysis from './Analysis';
import AnalysisContext from '../Context/AnalysisContext'

function Home() {
    const [analysisState, setAnalysisState] = useState({ data: null, loading: false }) 
    return (
        <AnalysisContext.Provider value={{analysisState, setAnalysisState}}>
            <main className="home-form">
                <h1>CCLid</h1>
                <UploadForm />
                <Analysis></Analysis>
            </main>
        </AnalysisContext.Provider>
    );
}

export default Home;
