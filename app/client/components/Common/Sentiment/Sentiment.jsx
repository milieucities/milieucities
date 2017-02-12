import React, { Component } from 'react'
import i18n from './locale'

export default class Sentiment extends Component {
  constructor(props) {
    super(props);
    this.generateChart = () => this._generateChart();
  }

  componentDidMount() {
    this.generateChart();
  }

  _formatEmotion(str) {
    return (parseFloat(str) * 100).toFixed(0)
  }

  _generateChart() {
    const { anger, disgust, fear, joy, sadness } = this.props;
    const chart = document.getElementById('chart');
    new Chart(chart, {
      type: 'doughnut',
      animation: {
        animateScale: true
      },
      data: {
        labels: ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness'],
        datasets: [{
          label: 'Emotion',
          data: [
            this._formatEmotion(anger),
            this._formatEmotion(disgust),
            this._formatEmotion(fear),
            this._formatEmotion(joy),
            this._formatEmotion(sadness)
          ],
          backgroundColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)'
          ]
        }]
      },
      options: {
        legend: {
          position: 'left'
        }
      }
    });
  }

  render() {
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);

    return(
      <div style={{maxWidth: 500}}>
        <canvas id='chart' width='500' height='300'></canvas>
        <br/>
        <p>{i18n.sentiment}</p>
      </div>
    )
  }
}
