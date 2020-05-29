import React from 'react';
import styled from 'styled-components';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';

import colors from '../../../styles/colors';
import standardizeROutput from '../../utils/standardizeROutput'


const StyledFraction = styled.div`
  margin: 10px;
  h3 {
    margin: 10px 0;
    color: ${colors.darkblue_bg};
    text-align: left;
  }
`;

// transforms fraction result data to the format readable by react table
const transformFractionData = (obj) => {
  const output = [];
  Object.entries(obj).forEach(el => {
    el[1].forEach((num, i) => {
      if (output.length < i + 1) {
        output.push({[el[0]]: num})
      } else {
        output[i][el[0]] = num;
      }
    })
  })
  return output
}

function Fraction(props) {
  const { data } = props;
  // removes '.' from R generated object
  const standardizedData = transformFractionData(data);
  const columns = Object.keys(data).map(el => ({
      Header: el,
      accessor: el,
  }))
  return (
    <StyledFraction>
      <h3>Fraction</h3>
      <ReactTable
        columns={columns}
        data={standardizedData}
        defaultPageSize={5}
      />
    </StyledFraction>
  )
}

export default Fraction;