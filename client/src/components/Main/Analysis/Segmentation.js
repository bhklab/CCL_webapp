import React from 'react';
import styled from 'styled-components';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';

import colors from '../../../styles/colors';
import standardizeROutput from '../../utils/standardizeROutput'

const StyledSegmentation = styled.div`
  margin: 10px;
  h3 {
    margin: 10px 0;
    color: ${colors.darkblue_bg};
    text-align: left;
  }
`;

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
  console.log(data);
  const standardizedData = standardizeROutput(data);
  console.log(standardizedData)
  return (
    <StyledSegmentation>
      <h3>Segmentation</h3>
      <ReactTable
        columns={columns}
        data={standardizedData}
        defaultPageSize={10}
      />
    </StyledSegmentation>
  )
}

export default Segmentation;