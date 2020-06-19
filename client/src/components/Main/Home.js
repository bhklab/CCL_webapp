import React, { useState, lazy, Suspense, } from 'react';

import UploadForm from './UploadForm';
// import Analysis from './Analysis/Analysis';
import AnalysisContext from '../Context/AnalysisContext'
import logo from '../../images/cclid-final-logo.png'

const Analysis = lazy(() => import('./Analysis/Analysis'))

function Home() {
    const [analysisState, setAnalysisState] = useState({ data: null, loading: false })
    const { data, loading } = analysisState
    return (
        <AnalysisContext.Provider value={{analysisState, setAnalysisState}}>
            <main className="home-form">
                <div className="header-container">
                    <img className="logo" src={logo}/>
                    <h1>CCLid</h1>
                </div>
                <h2>A toolkit to authenticate the genotype and stability of cancer cell lines</h2>
                <UploadForm />
                {/* Lazy loading */}
                <Suspense fallback={<div />}>
                    {data || loading ? (<Analysis></Analysis>) : null}
                </Suspense>
            </main>
        </AnalysisContext.Provider>
    );
}

export default Home;
