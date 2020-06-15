import React from 'react';
import styled from 'styled-components';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';

// import colors from '../../../styles/colors';
import standardizeROutput from '../../utils/standardizeROutput'
import StyledAnalysisSection from './StyledAnalysisSection';
import DownloadButton from '../../utils/DownloadButton';
import SegmentationPlot from './Plots/SegmentationPlot';

import upArrow from '../../../images/utils/sort-up-arrow.png';
import downArrow from '../../../images/utils/sort-down-arrow.png';

const columns = [
  {
    Header: () => (
      <span className="table-header">
        ID
        <div className="arrow-container">
          <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
          <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
        </div>
      </span>
    ),
    accessor: 'ID',
  },
  {
    Header: () => (
      <span className="table-header">
        Arm
        <div className="arrow-container">
          <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
          <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
        </div>
      </span>
    ),
    accessor: 'arm',
  },
  {
    Header: () => (
      <span className="table-header">
        Chromosome
        <div className="arrow-container">
          <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
          <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
        </div>
      </span>
    ),
    accessor: 'chrom',
  },
  {
    Header: () => (
      <span className="table-header">
        Locus Start
        <div className="arrow-container">
          <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
          <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
        </div>
      </span>
    ),
    accessor: 'locstart',
  },
  {
    Header: () => (
      <span className="table-header">
        Locus End
        <div className="arrow-container">
          <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
          <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
        </div>
      </span>
    ),
    accessor: 'locend',
  },
  {
    Header: () => (
      <span className="table-header">
        num.mark
        <div className="arrow-container">
          <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
          <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
        </div>
      </span>
    ),
    accessor: 'nummark',
  },
  {
    Header: () => (
      <span className="table-header">
        seg.diff
        <div className="arrow-container">
          <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
          <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
        </div>
      </span>
    ),
    accessor: 'segdiff',
  },
  {
    Header: () => (
      <span className="table-header">
        seg.mean
        <div className="arrow-container">
          <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
          <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
        </div>
      </span>
    ),
    accessor: 'segmean',
  },
  {
    Header: () => (
      <span className="table-header">
        seg.sd
        <div className="arrow-container">
          <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
          <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
        </div>
      </span>
    ),
    accessor: 'segsd',
  },
  {
    Header: () => (
      <span className="table-header">
        seg.z
        <div className="arrow-container">
          <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
          <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
        </div>
      </span>
    ),
    accessor: 'segz',
  },
  {
    Header: () => (
      <span className="table-header">
        t
        <div className="arrow-container">
          <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
          <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
        </div>
      </span>
    ),
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
  console.log(data);
  // removes '.' from R generated object
  const standardizedData = standardizeROutput(data);

  const plotData = {}
  console.log(standardizedData);
  standardizedData.forEach(el => {
    // reverse spread operator, 'data' object is 'el' but without ID
    const { ID, chrom, arm, ...data } = el
    // changes chromosome to number or X or Y value 
    const chromosome = Number.isNaN(parseInt(chrom.replace('chr', ''))) ? chrom.replace('chr', '') : parseInt(chrom.replace('chr', ''))

    // creates new data structure suitable for the plotly plot
    if (!plotData[ID]) plotData[ID] = {}
    if (!plotData[ID][arm]) plotData[ID][arm] = {}
    plotData[ID][arm][chromosome] = data
    // if (!plotData[ID]) {
    //   if (arm === 'p') {

    //   } else {

    //   }
    //   plotData[ID] = [data]
    // } else {
    //   plotData[ID].push(data)
    // }
  })
  console.log(plotData);
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
      {Object.entries(plotData).map(el => (
        <SegmentationPlot
          name={el[0]}
          key={el[0]}
          data={el[1]}
        />
      ))}
    </StyledAnalysisSection>
  )
}

export default Segmentation;