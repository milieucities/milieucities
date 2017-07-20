import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './card.scss'
import i18n from './locale'

export default class Card extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return(
      <div className={css.cardContainer}>
        <div className={css.cardContent}>
          <div className="col s8">
            <div className={css.header}>
              <p className={css.appType}>{this.props.devSite.application_type_name}</p>
              <p className={css.address}>{this.props.devSite.address}</p>
            </div>
            <p>{this.props.devSite.applicant_first_nae}</p>
            <p>{this.props.devSite.application_type_name}</p>
          </div>
          <div className={`col s4 ${css.image}`}>
            <img src={this.props.devSite.image_url} />
          </div>
        </div>
      </div>
    )
  }
}