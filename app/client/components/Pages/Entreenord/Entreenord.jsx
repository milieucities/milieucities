import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './entreenord.scss';
import './slider.less';
import './tooltip.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';



export default class Entreenord extends Component {
  render() {
    return(
      <div className={css.root}>
        <h2>Un project collaboratif de concertation citoyenne pour la nouvelle entrée nord du centre-ville de Nouméa</h2>

        <h1>À propos du projet de concertation citoyenne:</h1>

        <div>
      		4 Thématiques
      	</div>


      </div>
    )
  }
}



document.addEventListener('turbolinks:load', () => {
  const entreenord = document.querySelector('#entreenord');
  entreenord && render(<Entreenord/>, entreenord)
})