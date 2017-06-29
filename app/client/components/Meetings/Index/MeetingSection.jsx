import React, { Component } from 'react'
import { render } from 'react-dom'
import Index from '../Index/Index'
import Edit from '../Edit/Edit'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../../DevSites/Form/locale.js'

export default class MeetingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSave = (d,m) => this._handleSave(d,m);
    this.handleDelete = (m) => this._handleDelete(m);
  }

  _handleSave(data, meetingId) {

    const { locale } = document.body.dataset;
    let [url, type] = [`/dev_sites/${this.props.devSite.id}/meetings`, 'POST'];

    if(meetingId) {
      [url, type] = [`/dev_sites/${this.props.devSite.id}/meeting/${meetingId}`, 'PATCH']
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

  _handleDelete(meetingId) {
    const { locale } = document.body.dataset;
    let [url, type] = [`/dev_sites/${this.props.devSiteId}/meeting/${meetingId}`, 'DELETE'];

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
        this.setState({ error: error.responseJSON })
      }
    });
  }

  render() {
    const meetings = this.props.devSite.meetings || [];

    return(
      <div>
        <Index
          { ...this.props }
          meetings={ meetings }
          handleSave={ this.handleSave }
          handleDelete={ this.handleDelete }
        />
        <Edit
          { ...this.props }
          meeting={ {} }
          handleSave={ this.handleSave }
          handleDelete={ this.handleDelete }
          error={ this.state.error }
        />
      </div>
    )
  }
}