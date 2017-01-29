import React, { Component } from 'react'
import { render } from 'react-dom'
import TextInputWithLabel from '../../Common/FormFields/TextInputWithLabel'
import css from '../Index/index.scss'

export default class Show extends Component {
  constructor(props) {
    super(props)
    this.addMemberToOrganization = (e) => this._addMemberToOrganization(e);
    this.loadOrganizations = () => this._loadOrganizations();
  }

  _addMemberToOrganization(e) {
    const email = document.getElementById('member_email').value
    console.log(email);
  }

  render() {
    return(
      <div className="organizations-show">
        <p>{this.props.organization.name}</p>
        <div className={css.meta}>
          <div className={css.label}>
            Add a Member
          </div>
          <div className={css.data}>
            <div className='row'>
              <TextInputWithLabel
                classes='col s12 m12 l6'
                id='member_email'
                name='organization[member_attributes][email]'
                label="Email address"
              />
            </div>
            <div className='row'>
              <button
                name='commit'
                type='submit'
                className='btn'
                onClick={this.addMemberToOrganization}>
                Add member
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}