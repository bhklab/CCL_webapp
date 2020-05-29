import React from 'react';
import styled from 'styled-components';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';

import colors from '../../../styles/colors';
import standardizeROutput from '../../utils/standardizeROutput'

const StyledPrediction = styled.div`
  margin: 10px;
  h3 {
    margin: 10px 0;
    color: ${colors.darkblue_bg};
    text-align: left;
  }
`;

const columns = [
  {
    Header: 'Var1',
    accessor: 'Var1',
  },
  {
    Header: 'Var2',
    accessor: 'Var2',
  },
  {
    Header: 'baf',
    accessor: 'baf',
  },
  {
    Header: 'baf.fit',
    accessor: 'baffit',
  },
  {
    Header: 'baf.p.fit',
    accessor: 'bafpfit',
  },
  {
    Header: 'p',
    accessor: 'p',
  },
  {
    Header: 'q',
    accessor: 'q',
  },
  {
    Header: 'z',
    accessor: 'z',
  },
  {
    Header: 'Row',
    accessor: '_row',
  },
]

function Prediction(props) {
  const { data } = props;
  // removes '.' from R generated object
  const standardizedData = standardizeROutput(data);
  return (
    <StyledPrediction>
      <h3>Segmentation</h3>
      <ReactTable
        columns={columns}
        data={standardizedData}
        defaultPageSize={5}
      />
    </StyledPrediction>
  )
}

export default Prediction;