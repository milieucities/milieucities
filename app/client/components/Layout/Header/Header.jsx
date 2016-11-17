import React, { Component } from 'react'
import css from './header.scss'
import { debounce } from 'lodash'

export default class Header extends Component {
  constructor() {
    super()
    this.state = { isMobile: (window.innerWidth < 600) }
    this.currentUserId = document.body.dataset.userId
    this.locale = document.body.dataset.locale

    window.addEventListener('resize', () => {
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)()
    })
  }
  componentDidMount() {
    $('.modal-trigger').leanModal();

    $.getJSON(`/users/${this.currentUserId}/profile`,
      profile => this.setState({ profile })
    );
  }
  render() {
    const { profile } = this.state;

    return (
      <div className={css.container}>
        <a href={`/${this.locale}`} className={css.logo}>
          <img src={require('./images/dark-logo.svg')} />
        </a>
        <div className={css.linksAndLocale}>
          <div className={css.links}>
            {
              !this.currentUserId &&
              <div>
                <a href={`/${this.locale}/dev_sites`} title='Map'>Map</a>
                <a href={`/${this.locale}/users/new`} title='Sign Up'>Sign Up</a>
                <a href='#sign-in-modal' className='modal-trigger' title='Log In'>Log In</a>
              </div>
            }
            {
              this.currentUserId &&
              <div>
                <a href={`/${this.locale}/users/${this.currentUserId}/profile/edit`}>
                  <img className={css.profileImage} src={ profile && profile.avatar && profile.avatar.web.url || require('./images/default-avatar.png')} />
                </a>
                <a title='Sign Out' rel='nofollow' data-method='delete' href={`/${this.locale}/sessions/${this.currentUserId}`}>Log Out</a>
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
