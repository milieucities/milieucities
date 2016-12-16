import React, { Component } from 'react'
import css from './footer.scss'
import i18n from './locale'
import { debounce } from 'lodash'

export default class Footer extends Component {
  constructor() {
    super()
    this.state = { isMobile: (window.innerWidth < 600) }
    this.currentUserId = document.body.dataset.userId
    this.handleSubmit = (e) => this._handleSubmit(e);

    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }
  _handleSubmit(e) {
    if(e.which !== 13 && e.type !== 'click') {
      return false;
    }

    e.preventDefault();

    $.ajax({
      url: '/newsletter_subscriptions',
      dataType: 'JSON',
      type: 'POST',
      data: { newsletter_subscription: { email: this.refs.email.value } },
      success: () => {
        window.flash('notice', 'Thank you for subscribing to our newletter');
        this.refs.email.value = ''
      },
      error: error => {
        if(error.status == 422) {
          window.flash('alert', error.responseJSON.email.join('. '));
        } else {
          window.flash('alert', 'An error occured while attempting to subscribe your email. Refresh the page and try again.');
        }
        this.refs.email.value = ''
      }
    })
  }
  render() {
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    return (
      <div className={css.container}>
        <div className='row'>
          <div className='col s12 m3'>
            <div className={css.title}>
              {i18n.about}
            </div>
            <ul>
              <li><a href='http://about.milieu.io'>{i18n.ourVision}</a></li>
              <li><a href='http://about.milieu.io#large-image-1'>{i18n.ourTeam}</a></li>
              <li><a href='http://about.milieu.io#summary'>{i18n.ourServices}</a></li>
            </ul>
          </div>
          <div className='col s12 m3'>
            <div className={css.title}>
              {i18n.explore}
            </div>
            <ul>
              <li><a href={`/${locale}/dev_sites`}>{i18n.map}</a></li>
              <li><a href='https://medium.com/@milieucities'>{i18n.blog}</a></li>
              <li><a href={`/${locale}/legal/privacy`}>{i18n.privacy}</a></li>
            </ul>
          </div>
          <div className='col s12 m6'>
            <div className={css.title}>
              {i18n.followUs}
            </div>
            <div className={css.socialMediaLinks}>
              <a title='Find us on Twitter' href='https://twitter.com/milieucities'><i className='fa fa-twitter'></i></a>
              <a title='Find us on Instagram' href='https://www.instagram.com/milieucities/'><i className='fa fa-instagram'></i></a>
               <a title='Find us on Facebook' href='https://www.facebook.com/Milieucities/'><i className='fa fa-facebook'></i></a>
               <a title='Find us on Linkedin' href='https://www.linkedin.com/company/milieu.io'><i className='fa fa-linkedin'></i></a>
              <a title='Find us on Medium' href='https://medium.com/@milieucities'><i className='fa fa-medium'></i></a>
            </div>
            <div className={css.title}>
              {i18n.subscribe}
            </div>
            <div className={css.newsletterEmailContainer}>
              <input type='email' ref='email' placeholder='E-mail' onKeyPress={this.handleSubmit} />
              <button onClick={this.handleSubmit} className='btn'><i className='fa fa-envelope-o'></i></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
