import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './noumea.scss'
import { Slider } from 'antd'
import 'antd/dist/antd.less'

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};

export default class Participez extends Component {
  constructor() {
    super()
    this.state = { loading: true };
    this.devSiteId = document.querySelector('#participez').dataset.id;
    this.surveySentiment = document.querySelector('#participez').dataset.surveySentiment;
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <h1>Participez page</h1>
        <img
          src={require(`./images/2.svg`)}
        />
        <img
            src={require(`./images/5.svg`)}
        />
        <h4>included=true</h4>
      <Slider marks={marks} defaultValue={37} />
      <Slider range marks={marks} defaultValue={[26, 37]} />

      <h4>included=false</h4>
      <Slider marks={marks} included={false} defaultValue={37} />

      <h4>marks & step</h4>
      <Slider marks={marks} step={10} defaultValue={37} />

      <h4>step=null</h4>
      <Slider marks={marks} step={null} defaultValue={37} />
    </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const participez = document.querySelector('#participez');
  participez && render(<Participez/>, participez)
})
