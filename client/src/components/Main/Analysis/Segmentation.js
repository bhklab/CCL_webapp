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
    Header: 'ID',
    accessor: 'ID',
  },
  {
    Header: 'Arm',
    accessor: 'arm',
  },
  {
    Header: 'Chromosome',
    accessor: 'chrom',
  },
  {
    Header: 'Locus Start',
    accessor: 'locstart',
  },
  {
    Header: 'Locus End',
    accessor: 'locend',
  },
  {
    Header: 'num.mark',
    accessor: 'nummark',
  },
  {
    Header: 'seg.diff',
    accessor: 'segdiff',
  },
  {
    Header: 'seg.mean',
    accessor: 'segmean',
  },
  {
    Header: 'sed.sd',
    accessor: 'segsd',
  },
  {
    Header: 'seg.z',
    accessor: 'segz',
  },
  {
    Header: 't',
    accessor: 't',
  },
]
const headers = [
  {
    displayName: 'ID',
    id: 'ID',
  },
  {
    displayName: 'Arm',
    id: 'arm',
  },
  {
    displayName: 'Chromosome',
    id: 'chrom',
  },
  {
    displayName: 'Locus Start',
    id: 'locstart',
  },
  {
    displayName: 'Locus End',
    id: 'locend',
  },
  {
    displayName: 'num.mark',
    id: 'nummark',
  },
  {
    displayName: 'seg.diff',
    id: 'segdiff',
  },
  {
    displayName: 'seg.mean',
    id: 'segmean',
  },
  {
    displayName: 'sed.sd',
    id: 'segsd',
  },
  {
    displayName: 'seg.z',
    id: 'segz',
  },
  {
    displayName: 't',
    id: 't',
  },
]

function Segmentation(props) {
  const { data, fileName } = props;
  // removes '.' from R generated object
  const standardizedData = standardizeROutput(data);
  return (
    <StyledAnalysisSection>
      <div className="analysis-wrapper">
        <h3>Segmentation</h3>
        <DownloadButton
          data={standardizedData}
          headers={headers}
          filename={`segmentation(${fileName})`}
        />
      </div>
      <ReactTable
        columns={columns}
        data={standardizedData}
        defaultPageSize={10}
      />
    </StyledAnalysisSection>
  )
}

export default Segmentation;