import React, { Component } from 'react'
import css from './header.scss'
import { debounce } from 'lodash'
import i18n from './locale'
import CookiesNotification from '../../Notifications/Cookies/CookiesNotification'

export default class Header extends Component {
  constructor() {
    super()
    this.state = { isMobile: (window.innerWidth < 600) };

    this.openModal = () => this._openModal();

    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }
  componentDidMount() {
    $('.modal-trigger').leanModal();
  }
  _openModal() {
    document.querySelector('#sign-in-modal .modal-content').focus();
  }
  handleChangeLocalization(locale) {
    const regex = /^\/en\/|\/en$|\/fr\/|\/fr$/;
    if(location.pathname.match(regex)) {
      return location.pathname.replace(regex, `/${locale}/`)
    } else {
      return `/${locale}/${location.pathname.length > 1 ? location.pathname : ''}`
    }
  }
  render() {
    const { profile } = this.state;
    const { userId, userSlug, userAvatar, userName, locale } = document.body.dataset;
    i18n.setLanguage(locale);

    return (
      <div className={css.container}>
        <a href={`/${locale}`} className={css.logo}>
          <img src={require('./images/dark-logo.svg')} title={'Milieu\'s Logo'} />
        </a>
        <div className={css.linksAndLocale}>
          <div className={css.links}>
            {
              !userId &&
              <div>
                <a href={`/${locale}/dev_sites`} title={i18n.map}>{i18n.map}</a>
                <a href='#sign-in-modal' className='modal-trigger' onClick={this.openModal} title={i18n.logIn}>{i18n.logIn}</a>
                <a href='http://about.milieu.io/' title={i18n.about}>{i18n.about}</a>
              </div>
            }
            {
              userId &&
              <div>
                <a href={`/${locale}/dev_sites`} title={i18n.map}>{i18n.map}</a>
                <a href='http://about.milieu.io/' className='hide-on-small-only' title={i18n.about}>{i18n.about}</a>
                <a href={`/${locale}/users/${userSlug}`} title='Go to your Dashboard'>
                  <img className={css.profileImage} src={ userAvatar || require('./images/default-avatar.png')} />
                </a>
                <a title={i18n.logOut} rel='nofollow' data-method='delete' href={`/${locale}/sessions/${userId}`}>{i18n.logOut}</a>
              </div>
            }
          </div>
          {
            !this.state.isMobile &&
            <div className={css.locale}>
              <a title='Change language to English' href={this.handleChangeLocalization('en')}>EN</a> | <a title='Change language to French' href={this.handleChangeLocalization('fr')}>FR</a>
            </div>
          }
        </div>
        {
          localStorage.getItem('acceptedMilieuCookies') !== 'true' &&
          <CookiesNotification />
        }
      </div>
    );
  }
}
