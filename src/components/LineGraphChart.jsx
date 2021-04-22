import React from 'react'
import { Line } from 'react-chartjs-2'
import PropTypes from 'prop-types'

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
    new LineChartDataset('My First dataset', [65, 59, 80, 81, 56, undefined, 150, 100], 'rgba(75,50,192,1)'),
    new LineChartDataset('My Second dataset', [50, 80, 20, 10, undefined, 40, 20, 45], '#ed64a6')
  ]
)

const OPTIONS = {
  maintainAspectRatio: false,
  responsive: true,
  title: {
    display: false,
    text: 'Sales Charts',
    fontColor: 'white'
  },
  legend: {
    labels: {
      fontColor: 'white'
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
          fontColor: 'rgba(255,255,255,.7)'
        },
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Month',
          fontColor: 'white'
        },
        gridLines: {
          display: false,
          borderDash: [2],
          borderDashOffset: [2],
          color: 'rgba(33, 37, 41, 0.3)',
          zeroLineColor: 'rgba(0, 0, 0, 0)',
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2]
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: 'rgba(255,255,255,.7)'
        },
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Value',
          fontColor: 'white'
        },
        gridLines: {
          borderDash: [3],
          borderDashOffset: [3],
          drawBorder: false,
          color: 'rgba(255, 255, 255, 0.15)',
          zeroLineColor: 'rgba(33, 37, 41, 0)',
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2]
        }
      }
    ]
  }
}

const LineGraphChart = ({ data, options }) => {
  return (
    <div className=" relative rounded-2xl h-full w-full">
      <Line data={data || DUMMYDATA} options={options || OPTIONS}/>
    </div>
  )
}

LineGraphChart.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object
}

export default LineGraphChart
