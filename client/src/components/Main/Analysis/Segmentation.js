import React from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors'

const StyledSegmentation = styled.div`
  margin: 10px;
  h3 {
    margin: 10px 0;
    color: ${colors.darkblue_bg};
    text-align: left;
  }
`;

function Segmentation(props) {

  return (
    <StyledSegmentation>
      <h3>Segmentation</h3>
    </StyledSegmentation>
  )
}

export default Segmentation;