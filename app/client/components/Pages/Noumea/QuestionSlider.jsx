import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './noumea.scss'
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

export default class QuestionSlider extends Component {
  constructor() {
    super()
    this.state = { loading: true };
    this.devSiteId = document.querySelector('#participez').dataset.id;
    this.surveySentiment = document.querySelector('#participez').dataset.surveySentiment;
    this.handleGetEmotion = this.handleGetEmotion.bind(this);
  }

  handleGetEmotion() {
    console.log(this.props.value);
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="row">
        <div className="container">
          <h1>Thématique 1 - Usage temporaire</h1>
          <div className="row">
            <div className="intro">
              <p>De part sa position privilégié en plein centre ville et sa dimension patrimoniale, la réutilisation immédiate de l’ancien site de l’hôpital Gaston-Bourret permettra d’insuffler une nouvelle vie à l’entrée nord et d’amorcer sa vision urbaine future, sans avoir à enclencher des travaux d’envergure.

L’intégration d’une grande diversité de programmes, ponctués d’espaces d’exposition et de production artistique contemporaines et alternatives, transformeront l’ancien centre hospitalier territorial en une destination dynamique et attrayante. La majorité des structures et mobiliers déployés dans les espaces extérieurs, dont toutes les plantes, sera conçue afin d’être reutilisée dans les phases suivantes du projet. </p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <Slider marks={marks} defaultValue={2} max={4} tipFormatter={false} onChange={this.handleGetEmotion} included={false}/>
            </div>
          </div>
      </div>
    </div>
    )
  }
}
