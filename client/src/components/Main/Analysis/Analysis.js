import React, { useContext } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

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
    font-size: calc(1.5vw + 1em);
    align-self: flex-start;
    margin: 0;
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
    color: ${colors.pink_main};
    font-weight: bold;
    margin: 0 0 10px;
    margin-right: auto;
  }
  .rt-th {
    text-align: left;
  }
`;


function Analysis() {
  const { analysisState } = useContext(AnalysisContext);
  const { data, loading } = analysisState
  console.log(analysisState);
  if (data && !loading) {
  return (
      <StyledAnalysis>
        <h2 className="analysis-header">Analysis Results</h2>
        <h3 className="fileName">{data.fileName}</h3>
        <div className="container">
          <Fraction data={data.fraction}/>
        </div>
        <div className="container">
          <Prediction data={data.pred}/>
        </div>
        <div className="container">
          <Segmentation data={data.seg}/>
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