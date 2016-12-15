import React, { Component } from 'react'
import css from './header.scss'
import { debounce } from 'lodash'
import LocalizedStrings from 'react-localization';

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
    let text = new LocalizedStrings({
      en:{
        map: "Map",
        about: "About",
        logIn: "Log In",
        logOut: "Log Out",
        signUp: "Sign Up"
      },
      fr: {
        map: "Carte",
        about: "À Propos",
        logIn: "Connexion",
        logOut: "Deconnexion",
        signUp: "S'inscrire"
      }
    });
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
                <a href={`/${locale}/dev_sites`} title={text.map}>{text.map}</a>
                <a href={`/${locale}/users/new`} title={text.signUp}>{text.signUp}</a>
                <a href='#sign-in-modal' className='modal-trigger' title={text.logIn}>{text.logIn}</a>
                <a href='http://about.milieu.io/' title={text.about}>{text.about}</a>
              </div>
            }
            {
              userId &&
              <div>
                <a href={`/${locale}/users/${userId}`}>
                  <img className={css.profileImage} src={ userAvatar || require('./images/default-avatar.png')} />
                </a>
                <a title={text.logOut} rel='nofollow' data-method='delete' href={`/${locale}/sessions/${userId}`}>{text.logOut}</a>
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
