import React from 'react';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';
import { Popup } from 'semantic-ui-react';

import standardizeROutput from '../../utils/standardizeROutput'
import StyledAnalysisSection from './StyledAnalysisSection';
import DownloadButton from '../../utils/DownloadButton';
import extractCellLine from '../../utils/extractCellLine';
import upArrow from '../../../images/utils/sort-up-arrow.png';
import downArrow from '../../../images/utils/sort-down-arrow.png';

const headers = [
  {
    displayName: 'CCL ID',
    id: 'Var1',
  },
  {
    displayName: 'Input ID',
    id: 'Var2',
  },
  {
    displayName: 'BAF',
    id: 'baf',
  },
  {
    displayName: 'BAF-fit',
    id: 'baffit',
  },
  {
    displayName: 'Classification',
    id: 'bafpfit',
  },
  {
    displayName: 'p-value',
    id: 'p',
  },
  {
    displayName: 'q-value',
    id: 'q',
  }
]

function Prediction(props) {
  const { data, fileName, cellLines } = props;
  // removes '.' from R generated object
  const standardizedData = standardizeROutput(data);
  const columns = [
    {
      Header: () => (
        <span className="table-header">
          <Popup hoverable trigger={<span>CCL ID</span>}>
            <Popup.Content>
              Reference cell line identity that is a match
            </Popup.Content>
          </Popup>
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
          <Popup hoverable trigger={<span>Input ID</span>}>
            <Popup.Content>
              Input sample cell line extracted from the input VCF
            </Popup.Content>
          </Popup>
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
          <Popup hoverable trigger={<span>BAF</span>}>
            <Popup.Content>
              Cumulative euclidean distance between the BAFs for all SNPs in common between input and reference cell lines
            </Popup.Content>
          </Popup>
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
          <Popup hoverable trigger={<span>BAF-fit</span>}>
            <Popup.Content>
              Logistic regression predicted probability of nonmatching genotypes (NM)
            </Popup.Content>
          </Popup>
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
          <Popup hoverable trigger={<span>Classification</span>}>
            <Popup.Content>
              Binary classifier, either being matching genotypes (M) or nonmatching (NM)
            </Popup.Content>
          </Popup>
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
          <Popup hoverable trigger={<span>p-value</span>}>
            <Popup.Content>
              p-value for a non-matching genotype assigned from logistic regression
            </Popup.Content>
          </Popup>
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
          <Popup hoverable trigger={<span>q-value</span>}>
            <Popup.Content>
              FDR corrected p-value
            </Popup.Content>
          </Popup>
          <div className="arrow-container">
            <img className="up-arrow arrow" alt="up-arrow" src={upArrow} />
            <img className="down-arrow arrow" alt="down-arrow" src={downArrow} />
          </div>
        </span>
      ),
      accessor: 'q',
    }
  ]
  return (
    <StyledAnalysisSection>
      <div className="analysis-wrapper">
        <Popup hoverable trigger={<h3>Prediction</h3>}>
          <Popup.Content>
            <p><b>Table Description</b>: Top predicted cell lines identities based on a logistic regression trained on the distance between B-allele frequencies</p>
            <p><b><em>checkForConcordance()</em></b>: will do an all-by-all sample comparison of genotypes. Using cell line metadata stored in meta.df, a logistic regression is trained to identify cell lines with matching (M) annotations and nonmatching (NM). The input sample is then compared to allother cell lines and a probability is assigned using this trained model.</p>
          </Popup.Content>
        </Popup>
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