import React from 'react';
import styled from 'styled-components';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';

import colors from '../../../styles/colors';
import standardizeROutput from '../../utils/standardizeROutput'
import StyledAnalysisSection from './StyledAnalysisSection';
import DownloadButton from '../../utils/DownloadButton';
import extractCellLine from '../../utils/extractCellLine';
import upArrow from '../../../images/utils/sort-up-arrow.png';
import downArrow from '../../../images/utils/sort-down-arrow.png';

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
  const { data, fileName, cellLines } = props;
  // removes '.' from R generated object
  const standardizedData = standardizeROutput(data);
  const columns = [
    {
      Header: () => (
        <span className="table-header">
          Var1
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: 'Var1',
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
          Var2
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: 'Var2',
    },
    {
      Header: () => (
        <span className="table-header">
          baf
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: 'baf',
    },
    {
      Header: () => (
        <span className="table-header">
          baf.fit
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: 'baffit',
    },
    {
      Header: () => (
        <span className="table-header">
          baf.p.fit
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: 'bafpfit',
    },
    {
      Header: () => (
        <span className="table-header">
          p
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: 'p',
    },
    {
      Header: () => (
        <span className="table-header">
          q
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: 'q',
    },
    {
      Header: () => (
        <span className="table-header">
          z
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: 'z',
    },
    {
      Header: () => (
        <span className="table-header">
          Row
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: '_row',
    },
  ]
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
        defaultSorted={[
          {
            id: "p",
            desc: false
          }
        ]}
        defaultPageSize={5}
      />
    </StyledAnalysisSection>
  )
}

export default Prediction;