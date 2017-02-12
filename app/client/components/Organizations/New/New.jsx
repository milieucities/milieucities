import React, { Component } from 'react'
import { render } from 'react-dom'
import TextInputWithLabel from '../../Common/FormFields/TextInputWithLabel'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../locale.js'

export default class New extends Component {
  render() {
    return(
      <div className={css.meta}>
        <div className={css.label}>
          {i18n.addOrganization}
        </div>
        <div className={css.data}>
          <div className='row'>
            <TextInputWithLabel
              classes='col s12 m12 l12'
              id='organization_name'
              name='organization[name]'
              label={i18n.nameOfOrganization}
            />
          </div>
          <div className='row'>
            <div className='col'>
              <button
                name='commit'
                type='submit'
                className='btn'
                onClick={this.props.onCreate}>
                {i18n.save}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
