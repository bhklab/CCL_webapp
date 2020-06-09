import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import CsvDownloader from 'react-csv-downloader';
import PropTypes from 'prop-types';

import colors from '../../styles/colors';
import downloadIcon from '../../images/download.svg';
import transitions from '../../styles/transitions';

const StyledButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  float:right;
  // position:absolute;
  
  button {
    color: ${colors.darkblue_text};
    background: #fff;
    font-weight: bold;
    padding: 8px;
    border: 0;
    font-size: 14px;
    transition: ${transitions.main_trans};
    outline: none;
    border: 2px solid #fff;

    img {
      display: inline-block;
      height: 14px;
      width: auto;
      margin-left: 5px;
      margin-top: 1px;
    }

    &:hover {
      border: 2px solid ${colors.darkblue_text};
    }
  }
`;


const DownloadButton = (props) => {
  const { data, headers, filename } = props;
  return (
    <StyledButton>
      <CsvDownloader
        datas={data}
        columns={headers}
        filename={filename}
        bom={false}
      >
        <button type="button">
          Download CSV
          {'   '}
          <img src={downloadIcon} alt="download icon" />
        </button>
      </CsvDownloader>
    </StyledButton>
  );
};

DownloadButton.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  filename: PropTypes.string.isRequired,
};

export default DownloadButton;