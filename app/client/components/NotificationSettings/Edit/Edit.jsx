import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from '../../Layout/Dashboard/Dashboard'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from './locale'

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: {} };

    this.loadNotification = () => this._loadNotification();
    this.submitForm = (e) => this._submitForm(e);
    this.loadNotification();
  }

  _loadNotification() {
    $.getJSON(`/users/${document.body.dataset.userSlug}/notification_setting`,
      notification_setting => this.setState({ notification_setting, loading: false })
    );
  }

  _submitForm(e) {
    const form = new FormData(document.querySelector('#notification-setting-form'));
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);

    $.ajax({
      url: `/users/${document.body.dataset.userSlug}/notification_setting`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: notification_setting => {
        this.setState({ notification_setting, error: {}});
        window.flash('notice', i18n.notiUpdateS);
      },
      error: error => {
        window.flash('alert', i18n.notiUpdateF)
        this.setState({ error: error.responseJSON });
      }
    });
  }

  render() {
    const { notification_setting, loading, error } = this.state;
    i18n.setLanguage(document.body.dataset.locale);

    return(
      <Dashboard loading={loading} activeComponent='notification_setting'>
        {
          !loading &&
          <div className={css.content}>
            <h2>{i18n.notifications}</h2>

            <div className={css.meta}>
              <div className={css.label}>
                Email
              </div>
              <div className={css.data}>
                <div className='row'>
                  <div className='input-field col s12'>
                    {i18n.emailQ1}
                  </div>
                  <form id='notification-setting-form'>
                    <div className='input-field col s12'>
                      <input type='hidden' name='notification_setting[updated_dev_site_near_me]' value={false} />
                      <input type='checkbox' defaultChecked={notification_setting.updated_dev_site_near_me} id='notification_updated_dev_site_near_me' name='notification_setting[updated_dev_site_near_me]'/>
                      <label htmlFor='notification_updated_dev_site_near_me'>{i18n.emailQ1S1}</label>
                    </div>
                    <div className='input-field col s12'>
                      <input type='hidden' name='notification_setting[newletter]' value={false} />
                      <input type='checkbox' defaultChecked={notification_setting.newletter} id='notification_newsletter' name='notification_setting[newletter]'/>
                      <label htmlFor='notification_newsletter'>{i18n.emailQ1S2}</label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='row'>
              <button name='commit' type='submit' className='btn' onClick={this.submitForm}>{i18n.save}</button>
            </div>
          </div>
        }
      </Dashboard>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const edit = document.querySelector('#notification-edit')
  edit && render(<Edit/>, edit)
})
