import React from 'react';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';
import standardizeROutput from '../../utils/standardizeROutput'
import StyledAnalysisSection from './StyledAnalysisSection';

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

function Segmentation(props) {
  const { data } = props;
  // removes '.' from R generated object
  const standardizedData = standardizeROutput(data);
  return (
    <StyledAnalysisSection>
      <h3>Segmentation</h3>
      <ReactTable
        columns={columns}
        data={standardizedData}
        defaultPageSize={10}
      />
    </StyledAnalysisSection>
  )
}

export default Segmentation;