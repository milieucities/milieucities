import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/header.scss'


export default class Header extends Component {

  render() {
    const propos = 'à propos';
    return (
      <div className={css.container}>
        <ul>
          <li><a href='/' title='info'>{propos}</a></li>
          <li><a href='/utilisation' title='d’utilisation'>guide</a></li>
          <li><a href='/participez' title='participez'>participez</a></li>
        </ul>
      </div>
    )
  }
}
