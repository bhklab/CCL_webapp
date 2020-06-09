import React from 'react';
import styled from 'styled-components';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';

import colors from '../../../styles/colors';
import standardizeROutput from '../../utils/standardizeROutput'
import StyledAnalysisSection from './StyledAnalysisSection';
import DownloadButton from '../../utils/DownloadButton';

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
  const { data, fileName } = props;
  // removes '.' from R generated object
  const standardizedData = transformFractionData(data);
  const columns = [];
  const headers = [];
  Object.keys(data).forEach(el => {
    columns.push({
      Header: el,
      accessor: el,
    })
    headers.push({
      displayName: el,
      id: el,
    })
  })
  return (
    <StyledAnalysisSection>
      <div className="analysis-wrapper">
        <h3>Fraction</h3>
        <DownloadButton
          data={standardizedData}
          headers={headers}
          filename={`fraction(${fileName})`}
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

export default Fraction;