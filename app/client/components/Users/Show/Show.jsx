import React, { Component } from 'react'
import { render } from 'react-dom'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
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
    const { userId, userAvatar, userName, locale } = document.body.dataset;

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
              <div className={css.role}>COMMUNITY MEMBER</div>
            </div>
          </div>
        </div>
        <div className={css.container}>
          <div className='container'>
            <div className={css.menu}>
              <ul>
                <li><b><a href={`/${locale}/users/${userId}`}>Dashboard</a></b></li>
                <li><a href={`/${locale}/users/${userId}/edit`}>Account Settings</a></li>
                <li><a href={`/${locale}/users/${userId}/notification/edit`}>Notification</a></li>
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
                <a href={`/${locale}/users/${userId}/edit`} className='btn right'>Edit</a>
                <h2>Dashboard</h2>

                <div className={css.meta}>
                  <div className={css.label}>Recent Comments</div>
                  <div className={css.data}>
                    {
                      user && user.comments.map((comment, i) => {
                        return <div className={css.entry} key={i}>{comment.body}</div>
                      })
                    }
                    {
                      user && user.comments.length == 0 &&
                      <i>You have not submitted a comment yet.</i>
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
