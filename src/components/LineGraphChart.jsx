import React from 'react'
import { Line } from 'react-chartjs-2'
import PropTypes from 'prop-types'

export class LineChartDataset {
  constructor (label, data, color) {
    this.label = label || 'My Chart'
    this.fill = false
    this.lineTension = 0.1
    this.backgroundColor = '#fff'
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
    new LineChartDataset('My Second dataset', [50, 80, 20, 10, undefined, 40, 20, 45])
  ]
)

const OPTIONS = {
  maintainAspectRatio: false
}

const LineGraphChart = ({ data, options }) => {
  return (
    <div className="dark:bg-gray-300 relative rounded-2xl h-full w-full">
      <Line data={data || DUMMYDATA} options={options || OPTIONS}/>
    </div>
  )
}

LineGraphChart.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object
}

export default LineGraphChart
