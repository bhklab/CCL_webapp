import React, { useMemo } from 'react';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';
import { Popup } from 'semantic-ui-react';
import colors from '../../../styles/colors';
import StyledAnalysisSection from './StyledAnalysisSection';
import DownloadButton from '../../utils/DownloadButton';

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
            Fraction of the genome that is drifted based on a z-score greater than X
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
        getTdProps={(state, rowInfo, column) => {
          console.log(state, rowInfo, column);
          if(column.id === 'zScore') {
            return {
              style: {
                backgroundcolor: 'gray'
              }
            }
          }
          return {}
         }
        }
      />
    </StyledAnalysisSection>
  )
}

export default Fraction;