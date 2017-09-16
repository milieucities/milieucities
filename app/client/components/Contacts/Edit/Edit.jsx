import React, { Component } from 'react'
import { render } from 'react-dom'
import { TextInputWithLabel, SelectWithLabel } from '../../Common/FormFields/Form'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../locale.js'

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { contactType: this.props.contact.contact_type };

    this.onDelete = (d) => this._onDelete(d)
    this.onSave = (d) => this._onSave(d)
    this.onChangeContactType = (contactType) => this._onChangeContactType(contactType)
  }

  _onDelete(e) {
    e.preventDefault();
    this.props.handleDelete(this.props.contact.id);
  }

  _onSave(e) {
    e.preventDefault();
    const form = e.currentTarget;
    this.props.handleSave(form, this.props.contact.id);
  }

  _onChangeContactType(contactType) {
    console.log('contactType', contactType)
    this.setState({ contactType })
  }

  render() {
    return(
      <div className={css.meta}>
        <div className={css.label}>
          {i18n.contact}
        </div>

        <div className={css.data}>
          <form encType='multipart/form-data' onSubmit={this.onSave} acceptCharset='UTF-8'>
            <div className='row'>
              <SelectWithLabel
                classes='col s12'
                id='contact_type'
                name='contact[contact_type]'
                label={i18n.contactType}
                value={this.state.contactType}
                options={this.props.contactOptions.map(contact => [contact,contact])}
                onChange={this.onChangeContactType}
              />
            </div>

            <div className='row'>
              <TextInputWithLabel
                classes='col s12 m12 l6'
                id='contact_first_name'
                name='contact[first_name]'
                defaultValue={this.props.contact.first_name}
                label={i18n.firstName}
              />

              <TextInputWithLabel
                classes='col s12 m12 l6'
                id='contact_last_name'
                name='contact[last_name]'
                defaultValue={this.props.contact.last_name}
                label={i18n.lastName}
              />
            </div>

            <div className='row'>
              <TextInputWithLabel
                classes='col s12'
                id='contact_email_address'
                name='contact[email_address]'
                defaultValue={this.props.contact.email_address}
                label={i18n.email}
              />
            </div>

            <div className='row'>
              <div className="col">
                <input type='submit' value={i18n.save} className='btn submit' />
              </div>
              {
                !this.props.contact.id &&
                <div className="col">
                  <button className='btn cancel' onClick={this.props.toggleContactForm}>Cancel</button>
                </div>
              }
              {
                this.props.contact.id &&
                <div className="col">
                  <button className='btn cancel' onClick={this.onDelete}>Delete</button>
                </div>
              }
            </div>
          </form>
        </div>
      </div>
    )
  }
}

