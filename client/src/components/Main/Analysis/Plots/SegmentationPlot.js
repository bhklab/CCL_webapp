import React from 'react';
import styled from 'styled-components';
import Plot from 'react-plotly.js';

import colors from '../../../../styles/colors';

const StyledDiv = styled.div`
    width: 100%;
    padding: 20px 0;
`;

function SegmentationPlot(props) {
  const data = [{ type: 'bar', x: [1, 2, 3], y: [2, 5, 3] }]
  const layout = {
    autosize: true,
    height: 250,
    hovermode: 'closest',
    margin: {
      l: 50,
      r: 0,
      t: 30,
      b: 55,
    },
    xaxis: {
      title: {
        text: 'Chromosome',
      },
      color: colors.darkblue_text,
      tickcolor: colors.darkblue_text,
      linecolor: colors.darkblue_text,
    },
  }
  
  return (
    <StyledDiv>
      <Plot
        graphDiv="graph"
        config={{
          responsive: true,
          displayModeBar: false,
        }}
        data={data}
        layout={layout}
      />
    </StyledDiv>
  )
}

export default SegmentationPlot;