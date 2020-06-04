import React from 'react';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';

import standardizeROutput from '../../utils/standardizeROutput'
import StyledAnalysisSection from './StyledAnalysisSection';


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
    <StyledAnalysisSection>
      <h3>Segmentation</h3>
      <ReactTable
        columns={columns}
        data={standardizedData}
        defaultPageSize={5}
      />
    </StyledAnalysisSection>
  )
}

export default Prediction;