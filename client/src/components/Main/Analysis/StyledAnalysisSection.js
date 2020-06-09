import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledAnalysisSection = styled.div`
  h3 {
    color: ${colors.darkblue_bg};
    text-align: left;
    font-size: calc(1vw + 0.5em);
    margin: 0;
  }

  .analysis-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
`;

export default StyledAnalysisSection;
