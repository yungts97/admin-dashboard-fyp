import React from 'react'
import { Line } from 'react-chartjs-2'
import PropTypes from 'prop-types'
import { useThemeProvider } from 'providers/ThemeProvider'

export class LineChartDataset {
  constructor (label, data, color) {
    this.label = label || 'My Chart'
    this.fill = false
    this.lineTension = 0.1
    this.backgroundColor = color || '#fff'
    this.borderColor = color || 'rgba(75,192,192,1)'
    this.borderDash = []
    this.borderDashOffset = 0.0
    this.pointBorderWidth = 1
    this.pointHoverRadius = 5
    this.pointHoverBackgroundColor = color || 'rgba(75,192,192,1)'
    this.pointHoverBorderColor = 'rgba(220,220,220,1)'
    this.pointHoverBorderWidth = 2
    this.pointRadius = 3
    this.spanGaps = true
    this.pointHitRadius = 10
    this.data = data || []
  }
}

export class LineChartData {
  constructor (labels, datasets) {
    this.labels = labels || []
    this.datasets = datasets || []
  }
}

// Testing Dummy Data
const DUMMYDATA = new LineChartData(
  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'], [
    new LineChartDataset('My First dataset', [65, 59, 80, 81, 56, undefined, 150, 100], '#6366F1'),
    new LineChartDataset('My Second dataset', [50, 80, 20, 10, undefined, 40, 20, 45], '#ed64a6')
  ]
)

function initializeOption (dark) {
  return {
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: false,
      text: 'Sales Charts',
      fontColor: dark ? '#fff' : '#000'
    },
    legend: {
      labels: {
        fontColor: dark ? '#fff' : '#000'
      },
      align: 'end',
      position: 'bottom'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: dark ? 'rgba(255,255,255,.7)' : 'rgba(0,0,0,.7)'
          },
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'Month',
            fontColor: dark ? '#fff' : '#000'
          },
          gridLines: {
            display: false,
            borderDash: [2],
            borderDashOffset: [2],
            color: dark ? 'rgba(33, 37, 41, 0.3)' : 'rgba(181, 182, 183, 0.3)',
            zeroLineColor: dark ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 1)',
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2]
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: dark ? 'rgba(255,255,255,.7)' : 'rgba(0, 0, 0, .7)'
          },
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'Value',
            fontColor: dark ? '#fff' : '#000'
          },
          gridLines: {
            borderDash: [3],
            borderDashOffset: [3],
            drawBorder: false,
            color: dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
            zeroLineColor: dark ? 'rgba(33, 37, 41, 0)' : 'rgba(181, 182, 183, 0)',
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2]
          }
        }
      ]
    }
  }
}

const LineGraphChart = ({ data, options }) => {
  // @ts-ignore
  const [themeState] = useThemeProvider()
  return (
    <div className=" relative rounded-2xl h-full w-full">
      <Line data={data || DUMMYDATA} options={options || initializeOption(themeState)}/>
    </div>
  )
}

LineGraphChart.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object
}

export default LineGraphChart
