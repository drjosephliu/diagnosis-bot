import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';

class ResultsChart extends Component {
  componentDidUpdate() {
		let chart = this.refs.chart.getChart();
		chart.reflow = () => {};
	}

  render() {
    const config = {
      chart: {
        type: 'bar',
        height: '50%',
      },
      title: {
        text: this.props.title
      },
      subtitle: {
        text: 'Diagnoses sorted by common level then by probability score'
      },
      xAxis: {
        categories: this.props.xData
      },
      yAxis: {
        title: {
          text: 'Probability score'
        }
      },
      series: [{
        data: this.props.yData
      }],
      colors: ['#fdc02f'],
      legend: {
        enabled: false
      },
      credits: {
        text: ''
      },
      tooltip: {
        formatter: function() {
          return `${this.x}: <b>${this.y}</b>`
        }
      },
      plotOptions: {
        series: {
          animation: {
            duration: 500,
          }
        }
      }
    };

    return (
      <div className='results-chart'>
        <ReactHighCharts config={config} ref='chart'></ReactHighCharts>
      </div>
    );
  }

}

export default ResultsChart;
