import React from 'react';
import styled from 'styled-components';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';

import colors from '../../../styles/colors';
import standardizeROutput from '../../utils/standardizeROutput'
import StyledAnalysisSection from './StyledAnalysisSection';
import DownloadButton from '../../utils/DownloadButton';


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
const headers = [
  {
    displayName: 'Var1',
    id: 'Var1',
  },
  {
    displayName: 'Var2',
    id: 'Var2',
  },
  {
    displayName: 'baf',
    id: 'baf',
  },
  {
    displayName: 'baf.fit',
    id: 'baffit',
  },
  {
    displayName: 'baf.p.fit',
    id: 'bafpfit',
  },
  {
    displayName: 'p',
    id: 'p',
  },
  {
    displayName: 'q',
    id: 'q',
  },
  {
    displayName: 'z',
    id: 'z',
  },
  {
    displayName: 'Row',
    id: '_row',
  },
]

function Prediction(props) {
  const { data, fileName } = props;
  // removes '.' from R generated object
  const standardizedData = standardizeROutput(data);
  return (
    <StyledAnalysisSection>
      <div className="analysis-wrapper">
        <h3>Prediction</h3>
        <DownloadButton
          data={standardizedData}
          headers={headers}
          filename={`prediction(${fileName})`}
        />
      </div>
      <ReactTable
        columns={columns}
        data={standardizedData}
        defaultPageSize={5}
      />
    </StyledAnalysisSection>
  )
}

export default Prediction;