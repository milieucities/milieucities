import React, { Component } from 'react'
import css from './footer.scss'
import { debounce } from 'lodash'

export default class Footer extends Component {
  constructor() {
    super()
    this.state = { isMobile: (window.innerWidth < 600) }
    this.currentUserId = document.body.dataset.userId
    this.locale = document.body.dataset.locale
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
    return (
      <div className={css.container}>
        <div className='row'>
          <div className='col s12 m3'>
            <div className={css.title}>
              About Milieu
            </div>
            <ul>
              <li><a href='http://about.milieu.io'>Our Vision</a></li>
              <li><a href='http://about.milieu.io#large-image-1'>Our Team</a></li>
              <li><a href='http://about.milieu.io#summary'>Our Services</a></li>
            </ul>
          </div>
          <div className='col s12 m3'>
            <div className={css.title}>
              Explore
            </div>
            <ul>
              <li><a href={`/${this.locale}/dev_sites`}>Map</a></li>
              <li><a href='https://medium.com/@milieucities'>Blog</a></li>
              <li><a href={`/${this.locale}/legal/privacy`}>Privacy</a></li>
            </ul>
          </div>
          <div className='col s12 m6'>
            <div className={css.title}>
              Follow Us
            </div>
            <div className={css.socialMediaLinks}>
              <a title='Find us on Twitter' href='https://twitter.com/milieucities'><i className='fa fa-twitter'></i></a>
              <a title='Find us on Instagram' href='https://www.instagram.com/milieucities/'><i className='fa fa-instagram'></i></a>
               <a title='Find us on Facebook' href='https://www.facebook.com/Milieucities/'><i className='fa fa-facebook'></i></a>
               <a title='Find us on Medium' href='https://www.linkedin.com/company/milieu.io'><i className='fa fa-linkedin'></i></a>
              <a title='Find us on Medium' href='https://medium.com/@milieucities'><i className='fa fa-medium'></i></a>
            </div>
            <div className={css.title}>
              Subscribe to newsletter
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
