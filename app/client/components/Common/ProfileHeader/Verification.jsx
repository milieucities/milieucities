import React, { Component } from 'react'
import i18n from './locale'
import css from './profileHeader.scss'

export default class Verification extends Component {
  render() {
    const status = `${i18n.status}${i18n[this.props.verifiedStatus]}`
    return(
      <span className={css.verified}>
        {status}
        {this.props.verifiedStatus === 'notVerified' && 
          <button 
            className={`btn ${css.verifyBtn}`}
            onClick={this.props.onRequestVerification}
          >{i18n.requestVerification}
          </button>
        }
      </span>
    )
  }
}