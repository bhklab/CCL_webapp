import React from 'react';
import styled from 'styled-components';
import Plot from 'react-plotly.js';

import colors from '../../../../styles/colors';

const StyledDiv = styled.div`
    width: 100%;
    padding: 20px 0;
`;

// barWidth is set to 0.5 becasuse 1 chromosome has 2 arms 
const barWidth = 0.5

const generatePlotData = (data) => {
  return data.map(el => ({chrom: el.chrom, width: el.locend - el.locstart, segmean: el.segmean, segsd: el.segsd, segz: el.segz, t: el.t}))
}

const populateBars = data => {
  const output = []

  let xPosition = 1 - barWidth / 2

  data.forEach(el => {
    output.push({xPos: xPosition, yPos: el.segsd})
    xPosition += barWidth
  })

  return output
}

// const generate

function SegmentationPlot(props) {
  const { data } = props;
  const plotData = generatePlotData(data)
  console.log(plotData);

  const sdData = populateBars(data)

  const standardDeviationLayer = { type: 'bar', x: sdData.map(el => el.xPos), y: sdData.map(el => el.yPos), width: barWidth }
  const allLayers = [standardDeviationLayer]

  const layout = {
    autosize: true,
    height: 350,
    hovermode: 'closest',
    bargap: 0,
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
    yaxis : {
      fixedrange: true,
      mirror: true,
    }
  }
  
  return (
    <StyledDiv>
      <Plot
        graphDiv="graph"
        config={{
          responsive: true,
          displayModeBar: false,
        }}
        data={allLayers}
        layout={layout}
      />
    </StyledDiv>
  )
}

export default SegmentationPlot;