import React from 'react';
import styled from 'styled-components';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';
import { Popup } from 'semantic-ui-react';

// import colors from '../../../styles/colors';
import standardizeROutput from '../../utils/standardizeROutput'
import StyledAnalysisSection from './StyledAnalysisSection';
import DownloadButton from '../../utils/DownloadButton';
import extractCellLine from '../../utils/extractCellLine';
import SegmentationPlot from './Plots/SegmentationPlot';

import upArrow from '../../../images/utils/sort-up-arrow.png';
import downArrow from '../../../images/utils/sort-down-arrow.png';

const headers = [
  {
    displayName: 'Cell line ID',
    id: 'ID',
  },
  {
    displayName: 'Chromosome Arm',
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
    displayName: '# of SNPs',
    id: 'nummark',
  },
  {
    displayName: 'Segment Diff',
    id: 'segmean',
  },
  {
    displayName: 'Segment SD',
    id: 'segsd',
  },
  {
    displayName: 'Segment Z',
    id: 'segz',
  }
]

function Segmentation(props) {
  const { data, fileName, cellLines } = props;
  // removes '.' from R generated object
  
  const columns = [
    {
      Header: () => (
        <span className="table-header">
          Cell line ID
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: 'ID',
      Cell: props => {
        const { value } = props
        const cellLineUrl = cellLines[extractCellLine(value)]
        return cellLineUrl ? (
          <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://pharmacodb.pmgenomics.ca/cell_lines/${cellLineUrl}`}>{value}</a>
        ) : <span>{value}</span>
      }
    },
    {
      Header: () => (
        <span className="table-header">
          Chromosome Arm
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
          <Popup hoverable trigger={<span>Locus Start</span>}>
            <Popup.Content>
              Genomic start position of BAF segment
            </Popup.Content>
          </Popup>
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
          <Popup hoverable trigger={<span>Locus End</span>}>
            <Popup.Content>
              Genomic end position of BAF segment
            </Popup.Content>
          </Popup>
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
          <Popup hoverable trigger={<span># of SNPs</span>}>
            <Popup.Content>
              Number of SNPs populating segment
            </Popup.Content>
          </Popup>
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
          <Popup hoverable trigger={<span>Segment Diff</span>}>
            <Popup.Content>
              Distance between the BAF segments from input compared to the reference (ID) cell lines
            </Popup.Content>
          </Popup>
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
          <Popup hoverable trigger={<span>Segment SD</span>}>
            <Popup.Content>
              Standard deviation of BAF distance for the SNPs populating the segment
            </Popup.Content>
          </Popup>
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
          <Popup hoverable trigger={<span>Segment Z</span>}>
            <Popup.Content>
              Z-score of BAF segment difference between input compared to reference (ID) cell lines
            </Popup.Content>
          </Popup>
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: 'segz',
    }
  ]

  const plotData = {}
  const standardizedData = standardizeROutput(data);
  standardizedData.forEach(el => {
    // reverse spread operator, 'data' object is 'el' but without ID
    const { ID, chrom, arm, ...data } = el
    // changes chromosome to number or X or Y value 
    const chromosome = Number.isNaN(parseInt(chrom.replace('chr', ''))) ? chrom.replace('chr', '') : parseInt(chrom.replace('chr', ''))
    // creates new data structure suitable for the plotly plot
    if (!plotData[ID]) plotData[ID] = {}
    if (!plotData[ID][arm]) plotData[ID][arm] = {}
    plotData[ID][arm][chromosome] = data
  })
  return (
    <StyledAnalysisSection>
      <div className="analysis-wrapper">
        <Popup hoverable trigger={<h3>Segmentation</h3>}>
          <Popup.Content>
            Segmentation of BAF segments when compared between isogenic cell lines
          </Popup.Content>
        </Popup>
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
        defaultSorted={[
          {
            id: "chrom",
            desc: false
          }
        ]}
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