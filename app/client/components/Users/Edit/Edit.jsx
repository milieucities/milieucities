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
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { avatarDelS, avatarDelF} = i18n;
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
        window.flash('notice', avatarDelS);
      },
      error: error => {
        this.setState({ avatarUploading: false });
        window.flash('alert', avatarDelF)
      }
    });
  }
  _uploadAvatar(e) {
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const {profileUploadF, profileUploadS} = i18n;
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
        window.flash('notice', profileUploadS);
      },
      error: error => {
        this.setState({ avatarUploading: false });
        window.flash('alert', profileUploadF)
      }
    });
  }
  _submitForm(e) {
    const form = new FormData(document.querySelector('#user-form'));
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const {profileUploadF, profileUploadS} = i18n;

    $.ajax({
      url: `/users/${this.currentUserId}`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: user => {
        this.setState({ user, error: null });
        window.flash('notice', profileUploadS);
      },
      error: error => {
        window.flash('alert', profileUploadF)
        this.setState({ error: error.responseJSON });
      }
    });
  }
  _deleteAccount() {
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { deleteConfirm, accountDeleteS, accountDeleteF } = i18n;
    if(!confirm(deleteConfirm)){
      return false;
    }

    $.ajax({
      url: `/users/${this.currentUserId}`,
      dataType: 'JSON',
      type: 'DELETE',
      success: () => {
        Turbolinks.visit('/');
        window.flash('notice', accountDeleteS);
      },
      error: error => {
        window.flash('alert', accountDeleteF)
      }
    });
  }
  render() {
    const { user, avatarUploading, loading, error } = this.state;
    const { userId, userSlug, userAvatar, userName, locale } = document.body.dataset;
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
                <li><a href={`/${locale}/users/${userSlug}`}>{i18n.dashboard}</a></li>
                <li><b><a href={`/${locale}/users/${userSlug}/edit`}>{i18n.settings}</a></b></li>
                <li><a href={`/${locale}/users/${userSlug}/notification/edit`}>{i18n.notification}</a></li>
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
                      <img alt='Editable Profile Avatar' src={ user && user.profile.avatar|| require('./images/default-avatar.png')} />
                      <label htmlFor='profile_avatar' className={css.changePhoto}>{i18n.changePhoto}</label>
                    </div>
                  </div>
                  <div className={css.data}>
                    <form id='user-form'>
                      <input type='hidden' name={'user[profile_attributes][id]'} value={user.profile.id}/>
                      <div className='row'>
                        <div className='input-field col s12 m8 l6'>
                          <label htmlFor='profile_name'>{i18n.name}</label>
                          <input type='text' id='profile_name' defaultValue={user.profile.name} name='user[profile_attributes][name]'/>
                          {error && error['profile.name'] && <div className='error-message'>{error['profile.name']}</div>}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='input-field col s12'>
                          <label htmlFor='profile_bio'>Bio</label>
                          <textarea id='profile_bio' defaultValue={user.profile.bio} name='user[profile_attributes][bio]'/>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {
                  !user.provider &&
                  <div className={css.meta}>
                    <div className={css.label}>
                      {i18n.contact}
                    </div>
                    <div className={css.data}>
                      <div className='row'>
                        <div className='input-field col s12 m8 l6'>
                          <label htmlFor='user_email'>{i18n.email}</label>
                          <input type='text' id='user_email' defaultValue={user.email} name='user[email]' form='user-form'/>
                          {error && error.email && <div className='error-message'>{error.email}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {
                  !user.provider &&
                  <div className={css.meta}>
                    <div className={css.label}>
                      {i18n.password}
                    </div>
                    <div className={css.data}>
                      <div className='row'>
                        <div className='input-field col s12 m8 l6'>
                          <label htmlFor='user_password'>{i18n.newPassword}</label>
                          <input id='user_password' type='password' name='user[password]' form='user-form'/>
                          {error && error.password && <div className='error-message'>{error.password}</div>}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='input-field col s12 m8 l6'>
                          <label htmlFor='user_password_confirmation'>{i18n.newPasswordConfirmation}</label>
                          <input id='user_password_confirmation' type='password' name='user[password_confirmation]' form='user-form'/>
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
                        <label htmlFor='profile_street'>{i18n.street}</label>
                        <input type='text' id='profile_street' form='user-form' defaultValue={user.profile.street} name='user[profile_attributes][street]'/>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='input-field col s12 m8 l6'>
                        <label htmlFor='profile_city'>{i18n.city}</label>
                        <input type='text' id='profile_city' form='user-form' defaultValue={user.profile.city} name='user[profile_attributes][city]'/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <button name='commit' type='submit' className='btn' onClick={this.submitForm}>{i18n.save}</button>
                  <a name='commit' type='submit' style={{marginLeft: 10, float: 'right'}} onClick={this.deleteAccount} href='#'>{i18n.delete}</a>
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
