import React, { Component } from 'react';

import css from './cookies-notification.scss'

export default class CookiesNotification extends Component {
  render() {
    const text1 = 'We use cookies to ensure you get the best experience on our website. Please read our '
    const text2 = ' to find out more.'
    const anchorText = 'Privacy Policy'
    const privacyUrl = `/${document.body.dataset.locale}/legal/privacy`

    const acceptCookies = () => { 
      localStorage.setItem('acceptedMilieuCookies', 'true')
      document.querySelector(`.${css.cookiesNotification}`).style.display = 'none'
    }

    return(
      <div className={css.cookiesNotification}>
        <div className={css.notificationText}>
          <p>
            {text1}
            <a href={privacyUrl}>{anchorText}</a>
            {text2}
            <a className={`${css.okButton} btn`} onClick={acceptCookies}>Ok </a>
          </p>
        </div>
      </div>
    )
  }
}
