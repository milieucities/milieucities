import React, { Component } from 'react'
import { render } from 'react-dom'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import i18n from './locale'
import css from './edit.scss'
import { debounce } from 'lodash'

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.currentUserId = parseInt(document.body.dataset.userId);

    this.uploadAvatar = (e) => this._uploadAvatar(e);
    this.deleteAvatar = (e) => this._deleteAvatar(e);
    this.submitForm = (e) => this._submitForm(e);
    this.deleteAccount = (e) => this._deleteAccount(e);
    this.loadUser = () => this._loadUser();
    this.loadUser();
  }
  _loadUser() {
    $.getJSON(`/users/${this.currentUserId}`,
      user => this.setState({ user, loading: false })
    );
  }
  _deleteAvatar(e) {
    let form = new FormData();
    form.append('profile[remove_avatar]', true);

    this.setState({ avatarUploading: true });
    $.ajax({
      url: `/users/${this.currentUserId}/profile`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: user => {
        this.setState({ user, avatarUploading: false });
        window.flash('notice', 'Avatar successully deleted');
      },
      error: error => {
        this.setState({ avatarUploading: false });
        window.flash('alert', 'Failed to delete avatar')
      }
    });
  }
  _uploadAvatar(e) {
    let form = new FormData();
    form.append('profile[avatar]', this.refs.avatar.files[0]);

    this.setState({ avatarUploading: true });
    $.ajax({
      url: `/users/${this.currentUserId}/profile`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: user => {
        this.setState({ user, avatarUploading: false });
        window.flash('notice', 'Profile updated successfully');
      },
      error: error => {
        this.setState({ avatarUploading: false });
        window.flash('alert', 'Failed to save profile')
      }
    });
  }
  _submitForm(e) {
    const form = new FormData(document.querySelector('#user-form'));

    $.ajax({
      url: `/users/${this.currentUserId}`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: user => {
        this.setState({ user, error: null });
        window.flash('notice', 'Profile updated successfully');
      },
      error: error => {
        window.flash('alert', 'Failed to save profile')
        this.setState({ error: error.responseJSON });
      }
    });
  }
  _deleteAccount() {

    if(!confirm("Are you sure you would like to delete your account?")){
      return false;
    }

    $.ajax({
      url: `/users/${this.currentUserId}`,
      dataType: 'JSON',
      type: 'DELETE',
      success: () => {
        Turbolinks.visit('/');
        window.flash('notice', 'Account deleted');
      },
      error: error => {
        window.flash('alert', 'Failed to delete account')
      }
    });
  }
  render() {
    const { user, avatarUploading, loading, error } = this.state;
    const { userId, userAvatar, userName, locale } = document.body.dataset;
    i18n.setLanguage(locale);
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
              <div className={css.role}>{i18n.role}</div>
            </div>
          </div>
        </div>
        <div className={css.container}>
          <div className='container'>
            <div className={css.menu}>
              <ul>
                <li><a href={`/${locale}/users/${userId}`}>{i18n.dashboard}</a></li>
                <li><b><a href={`/${locale}/users/${userId}/edit`}>{i18n.settings}</a></b></li>
                <li><a href={`/${locale}/users/${userId}/notification/edit`}>{i18n.notification}</a></li>
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
                <h2>{i18n.settings}</h2>

                <div className={css.meta}>
                  <div className={css.label}>
                    <div className={css.avatar}>
                      {avatarUploading && <div className={css.loader}><i className='fa fa-spin fa-circle-o-notch fa-3x fa-fw' /></div>}
                      {user && user.profile.avatar && <div className={css.icon} onClick={this.deleteAvatar} ><i className='fa fa-trash-o'/></div>}
                      <input type='file' ref='avatar' id='profile_avatar' onChange={this.uploadAvatar} style={{display: 'none'}} />
                      <img src={ user && user.profile.avatar|| require('./images/default-avatar.png')} />
                      <label htmlFor='profile_avatar' className={css.changePhoto}>{i18n.changePhoto}</label>
                    </div>
                  </div>
                  <div className={css.data}>
                    <form id='user-form'>
                      <input type='hidden' name={'user[profile_attributes][id]'} value={user.profile.id}/>
                      <div className='row'>
                        <div className='input-field col s12 m8 l6'>
                          <input type='text' placeholder={i18n.name} defaultValue={user.profile.name} name='user[profile_attributes][name]'/>
                          {error && error.name && <div className='error-message'>{error.name}</div>}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='input-field col s12'>
                          <textarea placeholder={i18n.bio} defaultValue={user.profile.bio} name='user[profile_attributes][bio]'/>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className={css.meta}>
                  <div className={css.label}>
                    {i18n.contact}
                  </div>
                  <div className={css.data}>
                    <div className='row'>
                      <div className='input-field col s12 m8 l6'>
                        {
                          user.provider
                          ? <span className={css.provider}>
                              <i className='fa fa-user-circle-o'></i>
                              <i className={`fa fa-${user.provider}`}></i>
                            </span>
                          : <input type='text' placeholder={i18n.email} defaultValue={user.email} name='user[email]' />
                        }
                        {error && error.email && <div className='error-message'>{error.email}</div>}
                      </div>
                    </div>
                  </div>
                </div>
                {
                  !user.provider &&
                  <div className={css.meta}>
                    <div className={css.label}>
                      {i18n.password}
                    </div>
                    <div className={css.data}>
                      <div className='row'>
                        <div className='input-field col s12 m8 l6'>
                          <input type='password' placeholder={i18n.newPassword} name='user[password]' form='user-form'/>
                          {error && error.password && <div className='error-message'>{error.password}</div>}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='input-field col s12 m8 l6'>
                          <input type='password' placeholder={i18n.newPasswordConfirmation} name='user[password_confirmation]' form='user-form'/>
                          {error && error.password_confirmation && <div className='error-message'>{error.password_confirmation}</div>}
                      </div>
                      </div>
                    </div>
                  </div>
                }
                <div className={css.meta}>
                  <div className={css.label}>
                    {i18n.location}
                  </div>
                  <div className={css.data}>
                    <div className='row'>
                      <div className='input-field col s12 m8 l6'>
                        <input type='text' placeholder={i18n.street} form='user-form' defaultValue={user.profile.street} name='user[profile_attributes][street]'/>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='input-field col s12 m8 l6'>
                        <input type='text' placeholder={i18n.city} form='user-form' defaultValue={user.profile.city} name='user[profile_attributes][city]'/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <button name='commit' type='submit' className='btn' onClick={this.submitForm}>{i18n.save}</button>
                  <button name='commit' type='submit' className='btn cancel' style={{marginLeft: 10}} onClick={this.deleteAccount}>{i18n.delete}</button>
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
  const edit = document.querySelector('#users-edit')
  edit && render(<Edit/>, edit)
})
