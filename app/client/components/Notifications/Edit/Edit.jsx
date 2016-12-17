import React, { Component } from 'react'
import { render } from 'react-dom'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import i18n from './locale'
import css from './edit.scss'

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.locale = document.body.dataset.locale;
    this.currentUserId = parseInt(document.body.dataset.userId);

    this.loadNotification = () => this._loadNotification();
    this.submitForm = (e) => this._submitForm(e);
    this.loadNotification();
  }
  _loadNotification() {
    $.getJSON(`/users/${this.currentUserId}/notification`,
      notification => this.setState({ notification, loading: false })
    );
  }
  _submitForm(e) {
    const form = new FormData(document.querySelector('#notification-form'));
    console.log(form.keys());
    $.ajax({
      url: `/users/${this.currentUserId}/notification`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: notification => {
        this.setState({ notification });
        window.flash('notice', 'Notification updated successfully');
      },
      error: error => {
        window.flash('alert', 'Failed to save notification changes')
        this.setState({ error: error.responseJSON });
      }
    });
  }
  render() {
    const { notification, loading, error } = this.state;
    const { userId, userAvatar, userName, locale } = document.body.dataset;
    i18n.setLanguage(locale);
    return(
      <div>
        <Header/>
        <div className={css.info}>
          <div className='container'>
            <div className={css.imgContainer}>
              <img alt='Profile Avatar' src={userAvatar || require('./images/default-avatar.png')} />
            </div>
            <div className={css.content}>
              <h1 className={css.name}>{userName}</h1>
              <h3 className={css.role}>{i18n.role}</h3>
            </div>
          </div>
        </div>
        <div className={css.container}>
          <div className='container'>
            <div className={css.menu}>
              <ul>
                <li><a href={`/${locale}/users/${userId}`}>{i18n.dashboard}</a></li>
                <li><a href={`/${locale}/users/${userId}/edit`}>{i18n.settings}</a></li>
                <li><b><a href={`/${locale}/users/${userId}/notification/edit`}>{i18n.notification}</a></b></li>
              </ul>
            </div>
            {
              loading &&
              <div className='loading-screen'>
                <div className='spinner'>
                  <div className='bounce1'></div>
                  <div className='bounce2'></div>
                  <div className='bounce3'></div>
                </div>
              </div>
            }
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
                      <form id='notification-form'>
                        <div className='input-field col s12'>
                          <input type='hidden' name='notification[updated_dev_site_near_me]' value={false} />
                          <input type='checkbox' defaultChecked={notification.updated_dev_site_near_me} id='notification_updated_dev_site_near_me' name='notification[updated_dev_site_near_me]'/>
                          <label htmlFor='notification_updated_dev_site_near_me'>{i18n.emailQ1S1}</label>
                        </div>
                        <div className='input-field col s12'>
                          <input type='hidden' name='notification[newletter]' value={false} />
                          <input type='checkbox' defaultChecked={notification.newletter} id='notification_newsletter' name='notification[newletter]'/>
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
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const edit = document.querySelector('#notification-edit')
  edit && render(<Edit/>, edit)
})
