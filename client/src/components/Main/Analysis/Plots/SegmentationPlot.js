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
const generateHighlightedBars = (data) => {
  // generates xArray positions
  const xArray = []
  Object.entries(data).forEach(el => {
    // checks chromosome arm to know what side of the bin the data should be visualized on
    let positionCorrection
    if (el[0] === 'p') {
      positionCorrection = -barWidth / 2
    } else {
      positionCorrection = barWidth / 2
    }

    Object.entries(el[1]).forEach(chrom => {
      // bars are only being highlighted if t is 3 or above
      if (chrom[1].t >= 3) {
        if (!Number.isNaN(parseInt(chrom[0]))) xArray.push(parseInt(chrom[0]) + positionCorrection)
        if (chrom[0].toUpperCase() === 'X') xArray.push(22 + positionCorrection)
        if (chrom[0].toUpperCase() === 'Y') xArray.push(23 + positionCorrection)
      }
    })
  })

  // trace object for the highlighted bar
  const trace = {
    type: 'bar',
    x: xArray,
    y: Array(xArray.length).fill(1),
    width: barWidth,
    opacity: 0.5,
    marker: {
      color: colors.red_main
    },
    hoverinfo: 'skip'
  }
  //return two mirrored traces
  return [{ ...trace, y: Array(xArray.length).fill(1) }, { ...trace, y: Array(xArray.length).fill(-1)}]
}

// creates bar structure for plotly to work with
const generateSDBars = data => {
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

  // trace object for the SD bar
  const trace = {
    type: 'bar',
    x: output.map(el => el.xPos),
    hoverinfo: 'text',
    hovertext: output.map(el => el.hoverText),
    width: barWidth,
    opacity: 0.5,
    marker: {
      color: colors.darkblue_bg
    }
  }
  return [{ ...trace, y: output.map(el => el.yPos) }, { ...trace, y: output.map(el => -el.yPos) }]
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
        opacity: 0.75,
        width: 1
      }
    }
    shapes.push(line)
    xPos += barWidth * 2
  }
  return shapes
}

function SegmentationPlot(props) {
  const { data, name } = props;
  const highlightedLayer = generateHighlightedBars(data)
  const standardDeviationLayer = generateSDBars(data)
  // combines all layers together to be sent to plotly
  const allLayers = [...standardDeviationLayer, ...highlightedLayer ]

  // layout structure of the plot
  const layout = {
    autosize: true,
    height: 500,
    hovermode: 'closest',
    bargap: 0,
    barmode: 'overlay',
    showlegend: false,
    margin: {
      l: 75,
      r: 30,
      t: 50,
      b: 75,
    },
    title: {
      text: name,
      font: {
        family: '"Sen", sans-serif',
        size: 20,
        color: colors.darkblue_text
      }
    },
    xaxis: {
      title: {
        text: 'Chromosome',
        font: {
          family: '"Sen", sans-serif',
          size: 18,
          color: colors.darkblue_text
        },
        standoff: 15
      },
      color: colors.darkblue_text,
      tickcolor: colors.darkblue_text,
      linecolor: colors.darkblue_text,
      tickmode: 'array',
      tickvals: Array.from({ length: 23 }, (v, k) => k + 1),
      // adds X and Y chromosomes as labels at the end
      ticktext: Array.from({ length: 21 }, (v, k) => k + 1).concat(['X', 'Y']),
      fixedrange: true,
    },
    yaxis : {
      title: {
        text: 'SD',
        font: {
          family: '"Sen", sans-serif',
          size: 18,
          color: colors.darkblue_text
        },
        standoff: 0
      },
      fixedrange: true,
      color: colors.darkblue_text,
      tickcolor: colors.darkblue_text,
      linecolor: colors.darkblue_text,
      tickmode: 'array',
      tickvals: [-0.5, 0, 0.5],
    },
    shapes: generateGrid(23)
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