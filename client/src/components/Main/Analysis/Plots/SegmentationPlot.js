import React from 'react';
import styled from 'styled-components';
import Plot from 'react-plotly.js';

import colors from '../../../../styles/colors';

const StyledDiv = styled.div`
    width: 100%;
    padding: 20px 0;

    h3 {
      color: ${colors.darkblue_text};
      font-size: 18px;
      text-align: center;
      padding: 10px 0;
    }
`;

// barWidth is set to 0.5 becasuse 1 chromosome has 2 arms 
const barWidth = 0.5

// modifies the data for further rendering
const generatePlotData = (data) => {
  return data.map(el => ({chrom: el.chrom, width: el.locend - el.locstart, segmean: el.segmean, segsd: el.segsd, segz: el.segz, t: el.t}))
}

// creates bar structure for plotly to work with
const populateBars = data => {
  const output = []

  Object.entries(data).forEach(el => {
    // checks chromosome arm to know what side of the bin the data should be visualized on
    let positionCorrection
    if (el[0] === 'p') {
      positionCorrection = -barWidth / 2
    } else {
      positionCorrection = barWidth / 2
    }

    Object.entries(el[1]).forEach(chrom => {
      const row = { yPos: chrom[1].segsd}
      // uses chromosome # to determine its relative vposition on the plot
      if (!Number.isNaN(parseInt(chrom[0]))) row.xPos = parseInt(chrom[0]) + positionCorrection
      if (chrom[0].toUpperCase() === 'X') row.xPos = 22 + positionCorrection
      if (chrom[0].toUpperCase() === 'Y') row.xPos = 23 + positionCorrection
      output.push(row)
    })
  })

  return output
}

// creates bin structure for chromosomes, uses plotly shapes
const generateGrid = chromosomeNum => {
  const shapes = []
  let xPos = 0.5
  for (let i = 0; i < chromosomeNum; i++) {
    const line = {
      x0: xPos,
      x1: xPos,
      y0: -1,
      y1: 1,
      type: 'line',
      line: {
        color: colors.darkblue_text,
        opacity: 0.75
      }
    }
    shapes.push(line)
    xPos += barWidth * 2
  }
  return shapes
}

function SegmentationPlot(props) {
  const { data, name } = props;
  // const plotData = generatePlotData(data)
  // console.log(plotData);

  console.log(data);

  const sdData = populateBars(data)
  console.log(sdData);

  // mirrors data at the bottom
  const standardDeviationLayer = [{
    type: 'bar',
    x: sdData.map(el => el.xPos),
    y: sdData.map(el => el.yPos),
    // x: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8],
    // x: [0.75, 1.75, 2.75, 3.75, 4.75],
    // y: [0.3, 0.7, 0.24, 0.12, 0.08],
    width: barWidth,
    opacity: 0.5,
    marker: {
      color: colors.darkblue_bg
    }
  }, {
      type: 'bar',
      x: sdData.map(el => el.xPos),
      y: sdData.map(el => -el.yPos),
      // x: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8],
      // x: [0.25, 1.25, 2.25, 3.25, 4.25],
      // y: [0.1, 0.2, 0.14, 0.21, 0.13],
      width: barWidth,
      opacity: 0.5,
      marker: {
        color: colors.darkblue_bg
      }
  }]

  // combines all layers together to be sent to plotly
  const allLayers = [...standardDeviationLayer]

  const layout = {
    autosize: true,
    height: 450,
    hovermode: 'closest',
    bargap: 0,
    barmode: 'overlay',
    showlegend: false,
    margin: {
      l: 50,
      r: 30,
      t: 30,
      b: 75,
    },
    xaxis: {
      title: {
        text: 'Chromosome',
      },
      // type: 'category',
      // range: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
      // categoryorder: "array",
      // categoryarray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      // categoryarray: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
      color: colors.darkblue_text,
      tickcolor: colors.darkblue_text,
      linecolor: colors.darkblue_text,
      tickmode: 'array',
      tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      ticktext: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 'X'],
      // tickson: 'boundaries',
      // showgrid: true,
      // showdividers: true
    },
    yaxis : {
      fixedrange: true,
      mirror: true,
    },
    shapes: generateGrid(23)
  }
  
  return (
    <StyledDiv>
      <h3>{name}</h3>
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