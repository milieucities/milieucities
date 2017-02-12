import React, { Component } from 'react'
import { render } from 'react-dom'
import TextInputWithLabel from '../../Common/FormFields/TextInputWithLabel'
import { ShowMember } from '../../Members/ShowMember'
import { Edit } from '../Edit/Edit'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../locale.js'

export default class Show extends Component {
  constructor(props) {
    super(props)
    this.addMemberToOrganization = (e) => this._addMemberToOrganization(e);
    this.toggleMunicipality = (e) => this._toggleMunicipality(e);
    this.loadOrganization = () => this._loadOrganization();
    this.handleDeleteMember = (id) => this._deleteMemberFromOrganization(id);
    this.updateOrganization = (e) => this._updateOrganization(e);
    this.deleteOrganization = (e) => this._deleteOrganization(e);
    this.state = { loading: true, organization: {} };
    this.loadOrganization();
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
        window.flash('alert', i18n.municipalityNotUpdated)
      }
    });
  }

  _addMemberToOrganization(e) {
    e.preventDefault()
    const form = e.target;
    const fd = new FormData(form);

    $.ajax({
      url: `/organizations/${this.props.organizationId}/memberships`,
      dataType: 'JSON',
      type: 'POST',
      data: fd,
      contentType: false,
      processData: false,
      success: res => {
        if (res.status === 'unprocessable_entity') {
          window.flash('alert', res.message);
        } else {
          this._loadOrganization();
          window.flash('notice', i18n.memberAdded);
          this.setState({ userEmail: '' })
        }
      },
      error: error => {
        window.flash('alert', error.message);
      }
    });
  }

  _deleteMemberFromOrganization(id) {
    const membershipId = id;

    $.ajax({
      url: `/organizations/${this.props.organizationId}/memberships/${membershipId}`,
      dataType: 'JSON',
      type: 'DELETE',
      success: res => {
        if (res.status === 'unprocessable_entity') {
          window.flash('alert', res.message);
        } else {
          this._loadOrganization();
          window.flash('notice', i18n.memberDeleted);
        }
      },
      error: error => {
        window.flash('alert', i18n.memberNotDeleted);
      }
    });
  }

  _deleteOrganization(event) {
    this.props.onDelete(this.props.organizationId)
  }

  _updateOrganization(event) {
    event.preventDefault()
    const form = event.target;

    this.props.onUpdate(form, this.props.organizationId)
  }

  render() {
    const { loading, organization } = this.state;
    i18n.setLanguage(document.body.dataset.locale);

    return(
      <div className='organizations-show'>
        <Edit organization={organization} updateOrganization={this.updateOrganization} />
        <div className={css.meta}>
          <div className={css.label}>
            {i18n.deleteOrganization}
          </div>
          <div className={css.data}>
            <div className='row'>
              <div className='col'>
                <button
                  className='btn cancel'
                  onClick={this.deleteOrganization}>
                  {i18n.delete}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={css.meta}>
          <div className={css.label}>
            {i18n.manageableMunicipalities}
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
            {i18n.addMember}
          </div>
          <div className={css.data}>
            <form onSubmit={ this.addMemberToOrganization } >
              <div className='row'>
                <TextInputWithLabel
                  classes='col s12 m12 l12'
                  id='user_email'
                  name='membership[user][email]'
                  label={i18n.emailAddress}
                />
              </div>
              <div className='row'>
                <div className='col'>
                  <button
                    name='commit'
                    type='submit'
                    className='btn'>
                    {i18n.save}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {
          !loading && organization.members.length > 0 &&
          <div className={ css.members }>
            <h3>{i18n.members}</h3>
            {
              organization.members.map(member => (
                <ShowMember
                  key={member.id}
                  member={member}
                  handleDeleteMember={ this.handleDeleteMember }
                />
              ))
            }
          </div>
        }
      </div>
    )
  }
}
