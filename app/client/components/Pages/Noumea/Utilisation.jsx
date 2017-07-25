import React, { Component } from 'react'
import { render } from 'react-dom'
import Footer from '../../Layout/Footer/Footer'
import css from './css/utilisation.scss'
import { debounce, uniqueId } from 'lodash'

export default class Utilisation extends Component {
  constructor() {
    super()
    this.state = { loading: true };
    this.devSiteId = document.querySelector('#utilisation').dataset.id;
    this.surveySentiment = document.querySelector('#utilisation').dataset.surveySentiment;
  }

  render() {
    const { loading } = this.state;

    return (
      <div className={css.container}>
        <div className={css.utilisationContainer}>
          <h1>Guide d'utilisation</h1>
          </div>
        </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const noumea = document.querySelector('#utilisation');
  noumea && render(<Utilisation/>, noumea)
})
