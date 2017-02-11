import React, { Component } from 'react'
import { render } from 'react-dom'
import TextInputWithLabel from '../../Common/FormFields/TextInputWithLabel'
import { ShowMember } from '../../Members/ShowMember'
import css from '../../Layout/Dashboard/dashboard.scss'

export default class Show extends Component {
  constructor(props) {
    super(props)
    this.addMemberToOrganization = (e) => this._addMemberToOrganization(e)
    this.toggleMunicipality = (e) => this._toggleMunicipality(e)
    this.loadOrganization = () => this._loadOrganization()
    this.handleInputChange = (e) => this._handleInputChange(e);
    this.handleDeleteMember = (e) => this._handleDeleteMember(e);
    this.state = { loading: true, organization: {} }
    this.loadOrganization()
  }

  _loadOrganization() {
    const url = `/organizations/${this.props.organizationId}`
    $.getJSON(url,
      organization => this.setState({ organization, loading: false })
    );
  }

  _toggleMunicipality(e) {
    const municipalityIds = this.state.organization.municipalities.map(m => m.id)
    const municipalityId = parseInt(e.currentTarget.value)
    const type = municipalityIds.includes(municipalityId) ? 'DELETE' : 'PATCH'

    $.ajax({
      url: `/organizations/${this.props.organizationId}/municipalities/${e.currentTarget.value}`,
      dataType: 'JSON',
      type,
      success: organization => {
        this.setState({ organization })
      },
      error: () => {
        window.flash('alert', 'Failed to modify municipality.')
      }
    });
  }

  _addMemberToOrganization(e) {
    const email = this.state.userEmail;

    $.ajax({
      url: `/organizations/${this.props.organizationId}/memberships`,
      dataType: 'JSON',
      type: 'POST',
      data: { membership: { user: { email } } },
      success: res => {
        if (res.status === 'unprocessable_entity') {
          window.flash('alert', res.message);
        } else {
          this._loadOrganization();
          window.flash('notice', 'Member added');
          this.setState({ userEmail: '' })
        }
      },
      error: error => {
        window.flash('alert', error.message);
      }
    });
  }

  _deleteMemberFromOrganization(e) {
    const userId = 1;

    $.ajax({
      url: `/organizations/${this.props.organizationId}/memberships/`,
      dataType: 'JSON',
      type: 'DELETE',
      data: { membership: { user: { email } } },
      success: res => {
        if (res.status === 'unprocessable_entity') {
          window.flash('alert', res.message);
        } else {
          this._loadOrganization();
          window.flash('notice', 'Member deleted');
          this.setState({ userEmail: '' })
        }
      },
      error: error => {
        window.flash('alert', error.message);
      }
    });
  }

  _handleInputChange(event) {
    this.setState({ userEmail: event.target.value })
  }

  render() {
    const { loading, organization } = this.state;

    return(
      <div className='organizations-show'>
        <div className={css.meta}>
          <div className={css.label}>
            Manageable Municipalities
          </div>
          <div className={css.data}>
            <div className='row'>
              {
                !loading && this.props.municipalities.map(municipality => (
                  <label style={{display: 'block'}} key={`${organization.id}-${municipality.id}`}>
                    <input
                      type='checkbox'
                      value={municipality.id}
                      defaultChecked={organization.municipalities.map(m => m.id).includes(municipality.id)}
                      onChange={this.toggleMunicipality}
                      />
                    {municipality.name}
                  </label>
                ))
              }
            </div>
          </div>
        </div>

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
                label='Email address'
                value={this.state.userEmail}
                changeHandler={this.handleInputChange}
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
          !loading && organization.members.length > 0 &&
          <div className={ css.members }>
            <h3>Members</h3>
            {
              organization.members.map(member => (
                <ShowMember
                  key={member.id}
                  member={member}
                  onDelete={ this.handleDeleteMember }
                />
              ))
            }
          </div>
        }
      </div>
    )
  }
}
