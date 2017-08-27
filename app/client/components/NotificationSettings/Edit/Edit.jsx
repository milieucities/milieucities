import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from '../../Layout/Dashboard/Dashboard'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from './locale'
import { TextInputWithLabel } from '../../Common/FormFields/Form'


export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: {}, secondaryAddress: false };

    this.loadNotification = () => this._loadNotification();
    this.submitForm = (e) => this._submitForm(e);
    this.loadNotification();
    this.handleSecondaryAddress = (e) => this._handleSecondaryAddress(e);
    this.loadUser = () => this._loadUser();
  }

  _loadNotification() {
    $.getJSON(`/users/${document.body.dataset.userSlug}/notification_setting`,
      notification_setting => this.setState({ notification_setting, loading: false, secondaryAddress: notification_setting.secondary_address })
    );
  }

  _loadUser() {
    $.getJSON(`/users/${document.body.dataset.userSlug}`,
      user => this.setState({ user, loading: false })
    );
  }

  _handleSecondaryAddress(e) {
    const secondaryAddress = e.target.checked;
    this.setState({ secondaryAddress });
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
    const { user, notification_setting, loading, error, secondaryAddress } = this.state;
    console.log(notification_setting)
    i18n.setLanguage(document.body.dataset.locale);
    if (user && !user.address) user.address = {};

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

                    <div className='input-field col s12'>
                      <input
                        type='hidden'
                        name='notification_setting[secondary_address]'
                        value={false}
                      />
                      <input
                        type='checkbox'
                        defaultChecked={notification_setting.secondary_address}
                        id='notification_secondary_address'
                        name='notification_setting[secondary_address]'
                        onChange={this.handleSecondaryAddress}
                      />
                      <label htmlFor='notification_secondary_address'>{i18n.secondaryAddress}</label>
                    </div>
                    {
                      (secondaryAddress) &&
                        <div className={css.data}>
                          <input type='hidden' name={'user[addresses_attributes][0][id]'} />
                          <div className='row'>
                            <TextInputWithLabel
                              classes='col s12 m12 l6'
                              id='address_street'
                              name='user[addresses_attributes][0][street]'
                              label={i18n.street}
                              error={error['address.street']}
                              form='notification-setting-form'
                              defaultValue={notification_setting.address && notification_setting.address.street}
                            />
                          </div>
                          <div className='row'>
                            <TextInputWithLabel
                              classes='col s12 m12 l6'
                              id='address_city'
                              name='user[addresses_attributes][0][city]'
                              label={i18n.city}
                              form='notification-setting-form'
                              defaultValue={notification_setting.address && notification_setting.address.city}
                            />
                          </div>
                        </div>
                   }
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
