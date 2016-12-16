import React, { Component } from 'react'
import { render } from 'react-dom'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
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

    return(
      <div>
        <Header/>
        <div className={css.info}>
          <div className='container'>
            <div className={css.imgContainer}>
              <img src={userAvatar || require('./images/default-avatar.png')} />
            </div>
            <div className={css.content}>
              <h1 className={css.name}>{userName}</h1>
              <div className={css.role}>COMMUNITY MEMBER</div>
            </div>
          </div>
        </div>
        <div className={css.container}>
          <div className='container'>
            <div className={css.menu}>
              <ul>
                <li><a href={`/${locale}/users/${userId}`}>Dashboard</a></li>
                <li><a href={`/${locale}/users/${userId}/edit`}>Account Settings</a></li>
                <li><b><a href={`/${locale}/users/${userId}/notification/edit`}>Notification</a></b></li>
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
                <h2>Notifications</h2>

                <div className={css.meta}>
                  <div className={css.label}>
                    Email
                  </div>
                  <div className={css.data}>
                    <div className='row'>
                      <div className='input-field col s12'>
                        When would you like to receive emails from us?
                      </div>
                      <form id='notification-form'>
                        <div className='input-field col s12'>
                          <input type='hidden' name='notification[updated_dev_site_near_me]' value={false} />
                          <input type='checkbox' defaultChecked={notification.updated_dev_site_near_me} id='notification_updated_dev_site_near_me' name='notification[updated_dev_site_near_me]'/>
                          <label htmlFor='notification_updated_dev_site_near_me'>When there is a new development in your area</label>
                        </div>
                        <div className='input-field col s12'>
                          <input type='hidden' name='notification[newletter]' value={false} />
                          <input type='checkbox' defaultChecked={notification.newletter} id='notification_newsletter' name='notification[newletter]'/>
                          <label htmlFor='notification_newsletter'>Milieu newsletter and company updates</label>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <button name='commit' type='submit' className='btn' onClick={this.submitForm}>Save</button>
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
