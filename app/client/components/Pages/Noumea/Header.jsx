import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/header.scss'

export default class MobileFooter extends Component {

  render() {
    return (
      <div className={css.container}>
        <a href='/' title='info'>a propos</a>
        <a href='/utilisation' title='d’utilisation'>guide</a>
        <a href='/participez' title='participez'>participez</a>
      </div>
    )
  }
}
