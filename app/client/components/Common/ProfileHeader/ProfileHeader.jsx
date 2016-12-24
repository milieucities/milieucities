import React, { Component } from 'react'
import Verification from './Verification'
import i18n from './locale'
import css from './profileHeader.scss'

export default class ProfileHeader extends Component {
  constructor() {
    super()
    this.verifiedStatus = () => this._verifiedStatus();
    this.requestVerification = () => this._requestVerification();
  }
  _userRoleandOrganization() {
    if (this.props.user && this.props.user.organization && this.props.user.community_role) {
      return `${this.props.user.community_role}, ${this.props.user.organization}`
    } else if (this.props.user) {
      return this.props.user.organization || this.props.user.community_role || i18n.communityMember
    }
  }

  _verifiedStatus() {
    if (this.props.user && (this.props.user.community_role || this.props.user.organization)) {
      return (
        <Verification 
          onRequestVerification={this.requestVerification}
          verifiedStatus={this.props.user.verification_status}
        />
      )
    }
  }

  _requestVerification() {
    const userId = document.body.dataset.userId

    $.ajax({
      url: `/users/${userId}/request_verification`,
      dataType: 'JSON',
      type: 'GET',
      success: (res, status) => {
        if (status === 'success') {
          this.props.verificationCallback();
          window.flash('notice', 'Requested verification');
        } else {
          window.flash('alert', `We weren\t able to make your request: ${res}`);
        }
      },
      error: error => {
        window.flash('alert', error)
      }
    });
  }

  render() {
    const userRole = this._userRoleandOrganization()
    const verifiedStatusComponent = this._verifiedStatus() || ''
    return(
      <div className={css.info}>
        <div className='container'>
          <div className={css.imgContainer}>
            <img alt='Profile Avatar' src={this.props.userAvatar || require('../images/default-avatar.png')} />
          </div>
          <div className={css.content}>
            <h1 className={css.name}>{this.props.userName}</h1>
            <h3 className={css.role}>{userRole}</h3>
            {verifiedStatusComponent}
          </div>
        </div>
      </div>
    )
  }
}