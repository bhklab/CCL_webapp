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
  background-color: ${colors.pink_main};
  border-radius: 25px;
  h2 {
    color: ${colors.darkblue_text};
    text-align: center;
  }
`;


function Analysis() {
  const { analysisState } = useContext(AnalysisContext);
  const { data, loading } = analysisState
  console.log(analysisState);
  if (data && !loading) {
  return (
      <StyledAnalysis>
        <h2>Analysis Results</h2>
        <Fraction data={data.fraction}/>
        <Prediction data={data.pred}/>
        <Segmentation data={data.seg}/>
      </StyledAnalysis>
    ) 
  }
  if (loading) {
    return (
      <StyledAnalysis>
        {loading ? (
          <div className="loading-container">
            <h3>Please wait, we are processing your data...</h3>
            <ReactLoading type="spokes" width={150} height={150} color={colors.darkblue_bg} />
          </div>
        ) : null}
      </StyledAnalysis>
    )
  }
  return null
}

export default Analysis;