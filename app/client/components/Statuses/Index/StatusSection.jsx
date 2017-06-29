import React, { Component } from 'react'
import { render } from 'react-dom'
import Index from '../Index/Index'
import Edit from '../Edit/Edit'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../../DevSites/Form/locale.js'

export default class StatusSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSave = (d,m) => this._handleSave(d,m);
    this.handleDelete = (m) => this._handleDelete(m);
  }

  _handleSave(data, statusId) {
    const { locale } = document.body.dataset;
    let [url, type] = [`/dev_sites/${this.props.devSite.id}/statuses`, 'POST'];

    if(statusId) {
      [url, type] = [`/dev_sites/${this.props.devSite.id}/statuses/${statusId}`, 'PATCH']
    }

    $.ajax({
      url,
      type,
      data,
      dataType: 'JSON',
      contentType: false,
      processData: false,
      success: meeting => {
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

  _handleDelete(statusId) {
    const { locale } = document.body.dataset;
    let [url, type] = [`/dev_sites/${this.props.devSite.id}/statuses/${statusId}`, 'DELETE'];

    $.ajax({
      url,
      type,
      dataType: 'JSON',
      success: status => {
        window.flash('notice', 'Successfully deleted!')
        Turbolinks.visit(`/${locale}/dev_sites/${this.props.devSite.id}`);
      },
      error: error => {
        window.flash('alert', 'Failed to delete!')
        this.setState({ error: error.responseJSON })
      }
    });
  }

  render() {
    console.log('this.props.devSite', this.props.devSite)
    const statuses = this.props.devSite.statuses || [];

    return(
      <div>
        <Index
          { ...this.props }
          statuses={ statuses }
          handleSave={ this.handleSave }
          handleDelete={ this.handleDelete }
        />
        <Edit
          { ...this.props }
          status={ {} }
          handleSave={ this.handleSave }
          handleDelete={ this.handleDelete }
          error={ this.state.error }
        />
      </div>
    )
  }
}