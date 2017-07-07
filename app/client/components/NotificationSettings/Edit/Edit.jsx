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
    console.log(notification_setting)
    i18n.setLanguage(document.body.dataset.locale);

    return(
      <Dashboard loading={loading} activeComponent='notification_setting'>
        {
          !loading &&
          <div className={css.content}>
            <form id='notification-setting-form'>
              <h2>{i18n.notifications}</h2>

              <div className={css.meta}>
                <div className={css.label}>
                  Subscribe to the Milieu Civic Engagement Platform
                </div>
                <div className={css.data}>
                  <div className='row'>

                    <div className='input-field col s12'>
                      <input
                        type='hidden'
                        name='notification_setting[project_comments]'
                        value={false}
                      />
                      <input
                        type='checkbox'
                        defaultChecked={notification_setting.project_comments}
                        id='notification_project_comments'
                        name='notification_setting[project_comments]'
                      />
                      <label htmlFor='notification_project_comments'>{i18n.projectComments}</label>
                    </div>

                    <div className='input-field col s12'>
                      <input
                        type='hidden'
                        name='notification_setting[comment_replies]'
                        value={false}
                      />
                      <input
                        type='checkbox'
                        defaultChecked={notification_setting.comment_replies}
                        id='notification_comment_replies'
                        name='notification_setting[comment_replies]'
                      />
                      <label htmlFor='notification_comment_replies'>{i18n.commentReplies}</label>
                    </div>

                    <div className='input-field col s12'>
                      <input
                        type='hidden'
                        name='notification_setting[newsletter]'
                        value={false} />
                      <input
                        type='checkbox'
                        defaultChecked={notification_setting.newsletter}
                        id='notification_newsletter'
                        name='notification_setting[newsletter]'
                      />
                      <label htmlFor='notification_newsletter'>{i18n.emailQ1S2}</label>
                    </div>

                </div>
              </div>
            </div>



            <div className={css.meta}>
              <div className={css.label}>
                Subscribe to Municipal Planning Notices
                <div><small>Only available to residents of Milieu Cities</small></div>
              </div>
              <div className={css.data}>
                <div className='row'>

                    <div className='input-field col s12'>
                      <input
                        type='hidden'
                        name='notification_setting[immediate_vicinity_scope]'
                        value={true}
                      />
                      <input
                        type='checkbox'
                        defaultChecked={true}
                        id='notification_immediate_vicinity_scope'
                        name='notification_setting[immediate_vicinity_scope]'
                        disabled={true}
                      />
                      <label htmlFor='notification_immediate_vicinity_scope'>{i18n.immediateVicinityScope}</label>
                    </div>

                    <div className='input-field col s12'>
                      <input
                        type='hidden'
                        name='notification_setting[ward_scope]'
                        value={false}
                      />
                      <input
                        type='checkbox'
                        defaultChecked={notification_setting.ward_scope}
                        id='notification_ward_scope'
                        name='notification_setting[ward_scope]'
                      />
                      <label htmlFor='notification_ward_scope'>{i18n.wardScope}</label>
                    </div>

                    <div className='input-field col s12'>
                      <input
                        type='hidden'
                        name='notification_setting[municipality_scope]'
                        value={false}
                      />
                      <input
                        type='checkbox'
                        defaultChecked={notification_setting.municipality_scope}
                        id='notification_municipality_scope'
                        name='notification_setting[municipality_scope]'
                      />
                      <label htmlFor='notification_municipality_scope'>{i18n.municipalityScope}</label>
                    </div>

                  </div>
                </div>
              </div>
            </form>
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
