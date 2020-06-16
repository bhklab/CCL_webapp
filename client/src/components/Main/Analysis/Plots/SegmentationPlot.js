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

// calculated band width based on arm length
const addWidth = (data) => {
  const outputObj = {p: {}, q: {}}
  // loops over q arms of the chromosome because they are always present unlinke p arms
  Object.entries(data.q).forEach(chrom => {
    const pLength = data.p[chrom[0]] ? data.p[chrom[0]].locend - data.p[chrom[0]].locstart : 0
    const qLength = chrom[1].locend - chrom[1].locstart
    const chromSize = pLength + qLength
    const pRelativeSize = pLength / chromSize
    const qRelativeSize = qLength / chromSize
    outputObj.q[chrom[0]] = {...chrom[1], width:qRelativeSize }
    if (data.p[chrom[0]]) outputObj.p[chrom[0]] = { ...data.p[chrom[0]], width: pRelativeSize}
  })
  return outputObj
} 

const generatePlot = (data) => {
  const output = []
  
  // declaring arrays that will be used in trace generation later on
  const xArraySD = []
  const yArraySD = []
  const baseArraySD = []
  const hoverTextSD = []
  const widthSD = []
  const xArrayHighlight = []
  const widthArrayHighlight = []
 
  // common trace structure that can be reused
  const traceMeanLine = {
    type: 'scatter',
    mode: 'lines',
    hoverinfo: 'skip',
    marker: {
      color: colors.darkblue_bg,
    }
  }
  const traceSD = {
    type: 'bar',
    hoverinfo: 'text',
    opacity: 0.5,
    marker: {
      color: colors.darkblue_bg
    }
  }
  const traceHighlight = {
    type: 'bar',
    base: -1,
    opacity: 0.5,
    marker: {
      color: colors.red_main
    },
    hoverinfo: 'skip'
  }

  Object.entries(data).forEach(arm => {
    Object.entries(arm[1]).forEach(chrom => {
      // checks chromosome arm to know what side of the bin the data should be visualized on
      let positionCorrection
      if (arm[0] === 'p') {
        positionCorrection = -(1 - chrom[1].width) / 2
      } else {
        positionCorrection = (1 - chrom[1].width) / 2
      }

      // updates SD trace position info
      yArraySD.push(2 * chrom[1].segsd)
      baseArraySD.push(chrom[1].segmean - chrom[1].segsd)
      hoverTextSD.push(`${chrom[1].segmean} (chromosome ${chrom[0]}, ${arm[0]} arm)`)
      widthSD.push(chrom[1].width)

      // x coordinates calculation for SD and mean line traces
      let xPos
      if (!Number.isNaN(parseInt(chrom[0]))) {
        xPos = parseInt(chrom[0]) + positionCorrection
        xArraySD.push(xPos)
      }
      if (chrom[0].toUpperCase() === 'X') {
        xPos = 23 + positionCorrection
        xArraySD.push(xPos)
      }
      if (chrom[0].toUpperCase() === 'Y') {
        xPos = 24 + positionCorrection
        xArraySD.push(xPos)
      }

      // adds individual mean lines as separate traces
      output.push({ ...traceMeanLine, x: [xPos - chrom[1].width / 2, xPos + chrom[1].width / 2], y: [chrom[1].segmean, chrom[1].segmean], width: chrom[1].width })

      // logic to update position of trace with highlighted bars
      if (chrom[1].t >= 3) {
        if (!Number.isNaN(parseInt(chrom[0]))) xArrayHighlight.push(parseInt(chrom[0]) + positionCorrection)
        // 22 pairs of autosomes and 2 different sex chromosomes
        if (chrom[0].toUpperCase() === 'X') xArrayHighlight.push(23 + positionCorrection)
        if (chrom[0].toUpperCase() === 'Y') xArrayHighlight.push(24 + positionCorrection)
        widthArrayHighlight.push(chrom[1].width)
      }
    })
  })
  // adds SD bar plot trace
  output.push({...traceSD, x: xArraySD, y: yArraySD, base: baseArraySD, hovertext: hoverTextSD, width: widthSD})
  // adds trace with highlighted bars
  output.push({ 
    ...traceHighlight,
    x: xArrayHighlight,
    // the bar runs from -1 to 1 on y axis
    y: Array(xArrayHighlight.length).fill(2),
    width: widthArrayHighlight
  })
  return output
}

// creates lines that represent segemntation mean
const generateMeanLines = (data) => {
  const output = []
  const traceMeanLine = {
    type: 'scatter',
    mode: 'lines',
    hoverinfo: 'skip',
    marker: {
      color: colors.darkblue_bg,
    }
  }

  Object.entries(data).forEach(arm => {
    Object.entries(arm[1]).forEach(chrom => {

      // checks chromosome arm to know what side of the bin the data should be visualized on
      let positionCorrection
      if (arm[0] === 'p') {
        positionCorrection = -(1 - chrom[1].width) / 2
      } else {
        positionCorrection = (1 - chrom[1].width) / 2
      }

      let xPos
      if (!Number.isNaN(parseInt(chrom[0]))) xPos = parseInt(chrom[0]) + positionCorrection
      if (chrom[0].toUpperCase() === 'X') xPos = 23 + positionCorrection
      if (chrom[0].toUpperCase() === 'Y') xPos = 24 + positionCorrection
      output.push({ ...traceMeanLine, x: [xPos - chrom[1].width / 2, xPos + chrom[1].width / 2], y: [chrom[1].segmean, chrom[1].segmean], width: chrom[1].width})
    })

  })
  return output
}

// creates bar structure for plotly to work with
const generateSDBars = data => {
  const output = []
  Object.entries(data).forEach(arm => {
    Object.entries(arm[1]).forEach(chrom => {

      // checks chromosome arm to know what side of the bin the data should be visualized on
      let positionCorrection
      if (arm[0] === 'p') {
        positionCorrection = -(1 - chrom[1].width) / 2
      } else {
        positionCorrection = (1 - chrom[1].width) / 2
      }

      const row = { yPos: 2 * chrom[1].segsd, base: chrom[1].segmean - chrom[1].segsd, hoverText: `${chrom[1].segmean} (chromosome ${chrom[0]}, ${arm[0]} arm)`, width: chrom[1].width}
      // uses chromosome # to determine its relative position on the plot
      if (!Number.isNaN(parseInt(chrom[0]))) row.xPos = parseInt(chrom[0]) + positionCorrection
      if (chrom[0].toUpperCase() === 'X') row.xPos = 23 + positionCorrection
      if (chrom[0].toUpperCase() === 'Y') row.xPos = 24 + positionCorrection
      output.push(row)
    })
  })

  // trace object for the SD bar
  const trace = {
    type: 'bar',
    x: output.map(el => el.xPos),
    y: output.map(el => el.yPos),
    hoverinfo: 'text',
    hovertext: output.map(el => el.hoverText),
    width: output.map(el => el.width),
    base: output.map(el => el.base),
    opacity: 0.5,
    marker: {
      color: colors.darkblue_bg
    }
  }
  return trace
}

// modifies the data for further rendering
const generateHighlightedBars = (data) => {
  // generates xArray positions
  const xArray = []
  const widthArray = []
  Object.entries(data).forEach(arm => {
    Object.entries(arm[1]).forEach(chrom => {
      // bars are only being highlighted if t is 3 or above
      if (chrom[1].t >= 3) {
        // checks chromosome arm to know what side of the bin the data should be visualized on
        let positionCorrection
        if (arm[0] === 'p') {
          positionCorrection = -(1 - chrom[1].width) / 2
        } else {
          positionCorrection = (1 - chrom[1].width) / 2
        }
        if (!Number.isNaN(parseInt(chrom[0]))) xArray.push(parseInt(chrom[0]) + positionCorrection)
        // 22 pairs of autosomes and 2 different sex chromosomes
        if (chrom[0].toUpperCase() === 'X') xArray.push(23 + positionCorrection)
        if (chrom[0].toUpperCase() === 'Y') xArray.push(24 + positionCorrection)
        widthArray.push(chrom[1].width)
      }
    })
  })

  // trace object for the highlighted bar
  const trace = {
    type: 'bar',
    x: xArray,
    // the bar runs from -1 to 1 on y axis
    y: Array(xArray.length).fill(2),
    base: -1,
    width: widthArray,
    opacity: 0.5,
    marker: {
      color: colors.red_main
    },
    hoverinfo: 'skip'
  }
  return trace
}

// creates bin structure for chromosomes, uses plotly shapes
const generateGrid = data => {
  const shapes = []
  let xPos = 0.5

  // checks for shape drawing boundaries 
  // let minY = 0
  // let maxY = 0
  // Object.values(data).forEach(arm => {
  //   Object.values(arm).forEach(chromosome => {
  //     const { segmean, segsd } = chromosome
  //     if (maxY < segmean + segsd) maxY = segmean + segsd
  //     if (minY < segmean - segsd) minY = segmean - segsd
  //   })
  // })

  // checks how many chromosome bins are there (depends on presence or absence of Y chromosomes)
  // the check is done on q arm because it's always present, compared to p arm
  const numberOfBins = data.q.Y ? 24 : 23
  for (let i = 0; i < numberOfBins; i++) {
    const line = {
      x0: xPos,
      x1: xPos,
      y0: -1.1,
      y1: 1.1,
      type: 'line',
      line: {
        color: colors.darkblue_text,
        opacity: 0.75,
        width: 1
      }
    }
    shapes.push(line)
    xPos += 1 
  }
  return shapes
}

function SegmentationPlot(props) {
  const { data, name } = props;

  const processedData = addWidth(data);
  // const meanLayers = generateMeanLines(processedData)
  // const standardDeviationLayer = generateSDBars(processedData)
  // const highlightedLayer = generateHighlightedBars(processedData)
  // combines all layers together to be sent to plotly
  // const allLayers = [...meanLayers, standardDeviationLayer, highlightedLayer]
  
  // generates an array of all traces used in the plot
  const allLayers = generatePlot(processedData) 

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
      tickvals: Array.from({ length: 24 }, (v, k) => k + 1),
      // adds X and Y chromosomes as labels at the end
      ticktext: Array.from({ length: 22 }, (v, k) => k + 1).concat(['X', 'Y']),
      fixedrange: true,
    },
    yaxis : {
      title: {
        text: 'Segmentation Mean',
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
    shapes: generateGrid(data)
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