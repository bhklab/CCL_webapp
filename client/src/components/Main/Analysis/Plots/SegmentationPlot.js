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
      const row = { yPos: chrom[1].segsd, hoverText: `${chrom[1].segsd} (chromosome ${chrom[0]}, ${el[0]} arm)`}
      // uses chromosome # to determine its relative position on the plot
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

  // mirrors data at the bottom
  const standardDeviationLayer = [{
    type: 'bar',
    x: sdData.map(el => el.xPos),
    y: sdData.map(el => el.yPos),
    hoverinfo: 'text',
    hovertext: sdData.map(el => el.hoverText),
    width: barWidth,
    opacity: 0.5,
    marker: {
      color: colors.darkblue_bg
    }
  }, {
      type: 'bar',
      x: sdData.map(el => el.xPos),
      y: sdData.map(el => -el.yPos),
      hoverinfo: 'text',
      hovertext: sdData.map(el => el.hoverText),
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
      color: colors.darkblue_text,
      tickcolor: colors.darkblue_text,
      linecolor: colors.darkblue_text,
      tickmode: 'array',
      tickvals: Array.from({ length: 23 }, (v, k) => k + 1),
      ticktext: Array.from({ length: 21 }, (v, k) => k + 1).concat(['X', 'Y']),
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