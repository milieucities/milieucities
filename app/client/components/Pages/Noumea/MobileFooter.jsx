import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/footer.scss'

export default class MobileFooter extends Component {

  render() {
    return (
      <div className={css.container}>
        <a href='#' title='a propos'>a propos</a>
        <a href='#' title='guide'>guide</a>
        <a href='/participez' title='participez'>participez</a>
      </div>
    )
  }
}
