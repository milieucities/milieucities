import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/header.scss'


export default class Header extends Component {

  render() {
    return (
      <div className={css.container}>
        <ul>
          <li><a href='/' title='info'>Info</a></li>
          <li><a href='/utilisation' title='d’utilisation'>Guide</a></li>
          <li><a href='/participez' title='participez'>Participez</a></li>
        </ul>
      </div>
    )
  }
}
