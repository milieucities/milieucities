import React, { Component } from 'react'
import { render } from 'react-dom'
import TextInputWithLabel from '../../Common/FormFields/TextInputWithLabel'
import css from '../Index/index.scss'

export default class Show extends Component {
  constructor(props) {
    super(props)
    this.userSlug = document.body.dataset.userSlug;
    this.addMemberToOrganization = (e) => this._addMemberToOrganization(e);
    this.loadMembers = () => this._loadMembers();
    this.state = { loading: true }
    this.loadMembers()
  }

  _loadMembers() {
    const url = `/organizations/${this.props.organization.id}`
    $.getJSON(url,
      organization => this.setState({ members: organization.users, loading: false })
    );
  }

  _addMemberToOrganization(e) {
    const email = document.getElementById('user_email').value

    $.ajax({
      url: `/organizations/${this.props.organization.id}/memberships`,
      dataType: 'JSON',
      type: 'POST',
      data: { membership: { user: { email } } },
      success: res => {
        if (res.status === 'unprocessable_entity') {
          window.flash('alert', res.message);
        } else {
          this._loadMembers();
          window.flash('notice', 'Member added');
        }
      },
      error: error => {
        window.flash('alert', error.message);
      }
    });
  }

  render() {
    return(
      <div className="organizations-show">
        <div className={css.meta}>
          <div className={css.label}>
            Add a Member
          </div>
          <div className={css.data}>
            <div className='row'>
              <TextInputWithLabel
                classes='col s12 m12 l12'
                id='user_email'
                name='user[email]'
                label="Email address"
              />
            </div>
            <div className='row'>
              <div className='col'>
                <button
                  name='commit'
                  type='submit'
                  className='btn'
                  onClick={this.addMemberToOrganization}>
                  Add member
                </button>
              </div>
            </div>
          </div>
        </div>
        {
          !this.state.loading && this.state.members.length > 0 &&
          <div className="organization-members">
            <h3>Members</h3>
            {
              this.state.members.map((member, index) => (
                <p key={index}>
                  {member.email}
                  {member.admin && <span> (admin) </span>}
                </p>
              ))
            }
          </div>
        }
      </div>
    )
  }
}