import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/noumea.scss'
import { Slider } from 'antd'
import 'antd/dist/antd.less'

const broken = <img src={require(`./images/1.svg`)}/>;
const sad = <img src={require(`./images/2.svg`)}/>;
const happy = <img src={require(`./images/3.svg`)}/>;
const love = <img src={require(`./images/4.svg`)}/>;
const muchlove = <img src={require(`./images/5.svg`)}/>;

const marks = {
  0: {
    label: broken,
  },
  1: {
    label: sad,
  },
  2: {
    label: happy,
  },
  3: {
    label: love,
  },
  4: {
    label: muchlove,
  },

};

export default class EmojiiSlider extends Component {
  constructor() {
    super();
    this.handleGetEmotion = this.handleGetEmotion.bind(this);
    this.handleShowSurvey = this.handleShowSurvey.bind(this);
  }

  handleGetEmotion(value) {
    console.log(value);
  }

  handleShowSurvey() {
    console.log('change location');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <Slider marks={marks} defaultValue={2} max={4} tipFormatter={false} onChange={this.handleGetEmotion} included={false}/>
          </div>
        </div>
      </div>
    )
  }
}
