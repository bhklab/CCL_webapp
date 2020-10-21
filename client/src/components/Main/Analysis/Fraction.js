import React, { useMemo } from 'react';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';
import { Popup } from 'semantic-ui-react';
import colors from '../../../styles/colors';
import StyledAnalysisSection from './StyledAnalysisSection';
import DownloadButton from '../../utils/DownloadButton';

// styling for the first column
const zScoreStyling = 
{
  style: {
    background: colors.highlight,
  }
}

// transforms fraction result data to the format readable by react table and adds z-score
const transformFractionData = (obj) => {
  const output = [];
  // adds custom z-score values
  const data = { zScore: ['0 < Z < 1', '1 < Z < 2', '2 < Z < 3', 'Z > 3'], ...obj }
  Object.entries(data).forEach(el => {
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

// generates columns variable for react-table 6 and headers for the downloadable csv file
const generateHeadersColumns = (data) => {
  const columns = [{
    Header: () => (
      <span className="table-header">
        z-score
      </span>
    ),
    accessor: 'zScore',
    getProps: () => zScoreStyling,
    getHeaderProps: () => zScoreStyling
  }];
  const headers = [{
    displayName: 'z-score',
    id: 'zScore',
  }];
  Object.keys(data).forEach(el => {
    columns.push({
      Header: () => (
        <span className="table-header">
          {el}
        </span>
      ),
      accessor: el,
    })
    headers.push({
      displayName: el,
      id: el,
    })
  })
  return {headers, columns}
}

function Fraction(props) {
  const { data, fileName } = props;
  // removes '.' from R generated object
  const standardizedData = useMemo(() => transformFractionData(data), [data]);
  const { headers, columns } = useMemo(() => generateHeadersColumns(data), [data]);
  return (
    <StyledAnalysisSection>
      <div className="analysis-wrapper">
        <Popup hoverable trigger={<h3>Fraction</h3>}>
          <Popup.Content>
            <p><b>Table Description</b>: Fraction of the genome that is drifted based on a z-score greater than X.</p> 
            <p><b>Column Description</b>: Each column corresponds to a matching cell line where the total fractions sum up to 1.  The fractions represented in each row is the fraction of the total genome that is drifted as estimated using a z-score method. For instance, a value of 0.901 in the first row of CCLE_A549 indicates that ~ 90.1% ( + 3.9%) of the genome is concordant between the input sample and thepredicted match. A total of 4.2% of the genome shows some evidence of genetic drift, and only 0.6% of the genome shows strong evidence of drift.</p>
          </Popup.Content>
        </Popup>
        <DownloadButton
          data={standardizedData}
          headers={headers}
          filename={`fraction(${fileName})`}
        />
      </div>
      <ReactTable
        columns={columns}
        data={standardizedData}
        defaultPageSize={4}
        showPagination={false}
        sortable={false}
      />
    </StyledAnalysisSection>
  )
}

export default Fraction;