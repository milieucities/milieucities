import React, { Component } from 'react'
import { render } from 'react-dom'
import Index from '../Index/Index'
import Edit from '../Edit/Edit'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../locale.js'

export default class ContactsSection extends Component {
  constructor(props) {
    super(props);
    this.state = { openContactForm: false };
    this.handleSave = (data,id) => this._handleSave(data,id);
    this.handleDelete = (id) => this._handleDelete(id);
    this.toggleContactForm = () => this._toggleContactForm();
  }

  _handleSave(data, contactId) {

    const { locale } = document.body.dataset;
    let [url, type] = [`/dev_sites/${this.props.devSite.id}/contacts`, 'POST'];

    if(contactId) {
      [url, type] = [`/dev_sites/${this.props.devSite.id}/contacts/${contactId}`, 'PATCH']
    }

    $.ajax({
      url,
      type,
      data,
      dataType: 'JSON',
      contentType: false,
      processData: false,
      success: contact => {
        window.flash('notice', 'Successfully saved!')
        Turbolinks.visit(`/${locale}/dev_sites/${this.props.devSite.id}`);
      },
      error: error => {
        window.flash('alert', 'Failed to save!')
        console.log(error.responseJSON)
        this.setState({ error: error.responseJSON })
      }
    });
  }

  _handleDelete(contactId) {
    const { locale } = document.body.dataset;
    let [url, type] = [`/dev_sites/${this.props.devSite.id}/contacts/${contactId}`, 'DELETE'];

    $.ajax({
      url,
      type,
      dataType: 'JSON',
      success: contact => {
        window.flash('notice', 'Successfully deleted!')
        Turbolinks.visit(`/${locale}/dev_sites/${this.props.devSite.id}`);
      },
      error: error => {
        window.flash('alert', 'Failed to delete!')
        this.setState({ error: error.responseJSON })
      }
    });
  }

  _toggleContactForm() {
    this.setState({ openContactForm: !this.state.openContactForm });
  }

  render() {
    const contacts = this.props.devSite.contacts || [];

    return(
      <div>
        <Index
          { ...this.props }
          contacts={ contacts }
          handleSave={ this.handleSave }
          handleDelete={ this.handleDelete }
        />
        {
          !this.state.openContactForm &&
          <div className="col">
            <button onClick={this.toggleContactForm} className='btn'>Add Contact</button>
          </div>
        }
        {
          this.state.openContactForm &&
          <Edit
            { ...this.props }
            contact={ {} }
            handleSave={ this.handleSave }
            handleDelete={ this.handleDelete }
            toggleContactForm={ this.toggleContactForm }
            error={ this.state.error }
          />
        }
      </div>
    )
  }
}