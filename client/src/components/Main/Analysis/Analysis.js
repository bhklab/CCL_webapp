import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import axios from 'axios';

import colors from '../../../styles/colors'
import AnalysisContext from '../../Context/AnalysisContext';
import Fraction from './Fraction';
import Prediction from './Prediction';
import Segmentation from './Segmentation';

const StyledAnalysis = styled.div`
  width: 100%;
  display:flex;
  flex-direction:column;
  align-items: center;

  .analysis-header {
    color: ${colors.pink_main};
    align-self: flex-start;
    margin: 0 0 10px;
  }

  .container {
    width: 100%;
    background-color: ${colors.pink_main};
    border-radius: 25px;
    display:flex;
    flex-direction:column;
    justify-content: center;
    padding: 40px;
    margin-bottom: 30px;
  }

  .fileName {
    font-size: calc(1.5vw + 1em);
    color: ${colors.pink_main};
    font-weight: bold;
    margin: 0;
    margin-right: auto;
  }

  .rt-th {
    text-align: left;
  }
`;

function Analysis() {
  const { analysisState } = useContext(AnalysisContext);
  const { data, loading } = analysisState

  const [cellLines, setCellLines] = useState(null)
  useEffect(() => {
    axios.get('/api/cells')
      .then(data => console.log(data))
  }, [])

  if (data && !loading) {
  const { fileName, fraction, pred, seg } = data;
  return (
      <StyledAnalysis>
        <h2 className="fileName">{fileName}</h2>
        <h3 className="analysis-header">Analysis Results</h3>
        <div className="container">
          <Fraction data={fraction} fileName={fileName}/>
        </div>
        <div className="container">
          <Prediction data={pred} fileName={fileName}/>
        </div>
        <div className="container">
          <Segmentation data={seg} fileName={fileName}/>
        </div>
        
      </StyledAnalysis>
    ) 
  }
  if (loading) {
    return (
      <StyledAnalysis>
        {loading ? (
          <div className="loading-container">
            <h3>Please wait, we are processing your data...</h3>
            <ReactLoading type="spokes" width={150} height={150} color="white" />
          </div>
        ) : null}
      </StyledAnalysis>
    )
  }
  return null
}

export default Analysis;