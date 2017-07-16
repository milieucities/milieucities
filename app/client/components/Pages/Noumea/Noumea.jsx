import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './noumea.scss'
import Footer from '../../Layout/Footer/Footer'
import Comments from '../../Comments/Comments'
import Loader from '../../Common/Loader/Loader'
import Sentiment from '../../Common/Sentiment/Sentiment'
import { debounce, uniqueId } from 'lodash'

export default class Noumea extends Component {
  constructor() {
    super()
    this.state = { loading: true };
    this.devSiteId = document.querySelector('#noumea').dataset.id;
    this.surveySentiment = document.querySelector('#noumea').dataset.surveySentiment;
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <h1>sheeet</h1>
    </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const noumea = document.querySelector('#noumea');
  noumea && render(<Noumea/>, noumea)
})
