import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './noumea.scss'
import { Slider } from 'antd'
import 'antd/dist/antd.less'
import HeaderFooter from './HeaderFooter'

export default class SurveyIntro extends Component {
  constructor() {
    super()
    this.state = { loading: true };
    this.devSiteId = document.querySelector('#participez').dataset.id;
    this.surveySentiment = document.querySelector('#participez').dataset.surveySentiment;
    this.handleGetEmotion = this.handleGetEmotion.bind(this);
    this.handleShowSurvey = this.handleShowSurvey.bind(this);
  }

  handleGetEmotion() {
    console.log(this.props.value);
  }

  handleShowSurvey() {
    console.log('redirect');
  }

  render() {
    const { loading } = this.state;

    return (
        <div className="container">
          <div className="row">
            <h1>Thématique 1 - Usage temporaire</h1>
          </div>
          <div className="row">
            <div className="intro">
              <p>De part sa position privilégié en plein centre ville et sa dimension patrimoniale,
                la réutilisation immédiate de l’ancien site de l’hôpital Gaston-Bourret permettra d’insuffler une nouvelle vie à l’entrée nord et d’amorcer sa vision urbaine future,
                sans avoir à enclencher des travaux d’envergure.
              </p>
              <div className="row">
                <p className="intro">L’intégration d’une grande diversité de programmes, ponctués d’espaces d’exposition et de production artistique contemporaines et alternatives,
                transformeront l’ancien centre hospitalier territorial en une destination dynamique et attrayante. La majorité des structures et mobiliers déployés dans les espaces extérieurs,
                dont toutes les plantes, sera conçue afin d’être reutilisée dans les phases suivantes du projet.</p>
              </div>
            </div>
          </div>
          <div className="chapters">
            <div className="row">
              <h2>1.1. Usage temporaire de l'ancien complexe Gaston-Bourret</h2>
            </div>
            <br />
            <div className="row">
              <h2>1.2 Usage temporaire du parking et du terrain vague adjacent</h2>
            </div>
          </div>
          <div className="row">
            <button onClick={this.handleShowSurvey} className='btn' >
              Start
            </button>
          </div>
          <HeaderFooter />
      </div>

    )
  }
}
