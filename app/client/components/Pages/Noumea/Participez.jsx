import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './noumea.scss'
import Footer from '../../Layout/Footer/Footer'
import Comments from '../../Comments/Comments'
import Loader from '../../Common/Loader/Loader'
import Sentiment from '../../Common/Sentiment/Sentiment'
import { debounce, uniqueId } from 'lodash'

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
    </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const participez = document.querySelector('#participez');
  participez && render(<Participez/>, participez)
})
