import React, { useContext } from 'react';

import AnalysisContext from '../Context/AnalysisContext';

function Analysis() {
  const { analysisState} = useContext(AnalysisContext);
  console.log(analysisState);
  return (
    <div className="analysis">
      <h2>Analysis section</h2>
    </div>
  );
}

export default Analysis;