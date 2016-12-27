import React, { Component } from 'react'
import { render } from 'react-dom'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import i18n from './locale'
import css from './show.scss'
import { debounce } from 'lodash'

export default class Show extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.loadUser = () => this._loadUser();
    this.loadUser();
  }
  _loadUser() {
    $.getJSON(`/users/${document.body.dataset.userId}`,
      user => this.setState({ user, loading: false })
    );
  }
  render() {
    const { user, loading } = this.state;
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
                <li><b><a href={`/${locale}/users/${userSlug}`}>{i18n.dashboard}</a></b></li>
                <li><a href={`/${locale}/users/${userSlug}/edit`}>{i18n.settings}</a></li>
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
                <a href={`/${locale}/users/${userSlug}/edit`} title='Edit your profile' className='btn right'>{i18n.edit}</a>
                <h2>{i18n.dashboard}</h2>

                <div className={css.meta}>
                  <div className={css.label}>{i18n.recentComments}</div>
                  <div className={css.data}>
                    {
                      user && user.comments.map((comment, i) => {
                        return <div className={css.entry} key={i}>{comment.body}</div>
                      })
                    }
                    {
                      user && user.comments.length == 0 &&
                      <i>{i18n.noComment}</i>
                    }
                  </div>
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
  const show = document.querySelector('#users-show');
  show && render(<Show/>, show);
})
