import React from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors'

const StyledFraction = styled.div`
  margin: 10px;
  h3 {
    margin: 10px 0;
    color: ${colors.darkblue_bg};
    text-align: left;
  }
`;

function Fraction(props) {

  return (
    <StyledFraction>
      <h3>Fraction</h3>
    </StyledFraction>
  )
}

export default Fraction;