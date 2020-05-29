import React from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors'

const StyledPrediction = styled.div`
  margin: 10px;
  h3 {
    margin: 10px 0;
    color: ${colors.darkblue_bg};
    text-align: left;
  }
`;

function Prediction(props) {

  return (
    <StyledPrediction>
      <h3>Prediction</h3>
    </StyledPrediction>
  )
}

export default Prediction;