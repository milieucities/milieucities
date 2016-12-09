import React, { Component } from 'react'
import css from './header.scss'
import { debounce } from 'lodash'

export default class Header extends Component {
  constructor() {
    super()
    this.state = { isMobile: (window.innerWidth < 600) };

    window.addEventListener('resize', () => {
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)()
    })
  }
  componentDidMount() {
    $('.modal-trigger').leanModal();
  }
  render() {
    const { profile } = this.state;
    const { userId, userAvatar, userName, locale } = document.body.dataset;

    return (
      <div className={css.container}>
        <a href={`/${locale}`} className={css.logo}>
          <img src={require('./images/dark-logo.svg')} />
        </a>
        <div className={css.linksAndLocale}>
          <div className={css.links}>
            {
              !userId &&
              <div>
                <a href={`/${locale}/dev_sites`} title='Map'>Map</a>
                <a href={`/${locale}/users/new`} title='Sign Up'>Sign Up</a>
                <a href='#sign-in-modal' className='modal-trigger' title='Log In'>Log In</a>
                <a href='http://about.milieu.io/' title='About'>About</a>
              </div>
            }
            {
              userId &&
              <div>
                <a href={`/${locale}/users/${userId}`}>
                  <img className={css.profileImage} src={ userAvatar || require('./images/default-avatar.png')} />
                </a>
                <a title='Sign Out' rel='nofollow' data-method='delete' href={`/${locale}/sessions/${userId}`}>Log Out</a>
              </div>
            }
          </div>
          {
            !this.state.isMobile &&
            <div className={css.locale}>
              <a href='/en'>EN</a> | <a href='/fr'>FR</a>
            </div>
          }
        </div>
      </div>
    );
  }
}
