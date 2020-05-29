import React, { useContext } from 'react';
import styled from 'styled-components';
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
  return data && !loading ? (
    <StyledAnalysis>
      <h2>Analysis Results</h2>
      <Fraction data={data.fraction}/>
      <Prediction data={data.pred}/>
      <Segmentation data={data.seg}/>
    </StyledAnalysis>
  ) : null
}

export default Analysis;