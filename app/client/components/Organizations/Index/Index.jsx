import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from '../../Layout/Dashboard/Dashboard'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../locale.js'
import Collapse, { Panel } from 'rc-collapse'
import Show from '../Show/Show'
import New from '../New/New'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.loadOrganizations = () => this._loadOrganizations();
    this.loadMunicipalities = () => this._loadMunicipalities()
    this.createOrganization = (e) => this._createOrganization(e);
    this.updateOrganization = (form, id) => this._updateOrganization(form, id);
    this.deleteOrganization = (id) => this._deleteOrganization(id);
    this.onAccordionChange = (e) => this._onAccordionChange(e);
    this.loadOrganizations();
    this.loadMunicipalities()
  }

  _loadOrganizations() {
    $.getJSON(`/organizations`,
      organizations => this.setState({ organizations, loading: false })
    );
  }

  _loadMunicipalities() {
    $.getJSON('/municipalities',
      municipalities => this.setState({ municipalities })
    );
  }

  _createOrganization(e) {
    const orgName = document.getElementById('organization_name').value

    $.ajax({
      url: `/organizations`,
      dataType: 'JSON',
      type: 'POST',
      data: { organization: { name: orgName } },
      success: res => {
        if (res.status === 'unprocessable_entity') {
          window.flash('alert', res.message);
        } else {
          this.loadOrganizations();
          window.flash('notice', i18n.organizationCreated);
        }
      },
      error: error => {
        window.flash('alert', i18n.organizationNotCreated);
      }
    });
  }

  _updateOrganization(form, id) {
    const fd = new FormData(form);

    $.ajax({
      url: `/organizations/${id}`,
      dataType: 'JSON',
      contentType: false,
      processData: false,
      type: 'PATCH',
      data: fd,
      success: res => {
        if (res.status === 'unprocessable_entity') {
          window.flash('alert', res.message);
        } else {
          this.loadOrganizations();
          window.flash('notice', i18n.organizationUpdated);
        }
      },
      error: error => {
        window.flash('alert', i18n.organisationNotUpdated);
      }
    });
  }

  _deleteOrganization(id) {
    $.ajax({
      url: `/organizations/${id}`,
      dataType: 'JSON',
      type: 'DELETE',
      success: () => {
        window.flash('alert', i18n.organizationDeleted)
        this.loadOrganizations();
      },
      error: () => window.flash('alert', i18n.organizationNotDeleted)
    });
  }

  _onAccordionChange(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    const { organizations, municipalities, loading } = this.state;
    i18n.setLanguage(document.body.dataset.locale);
    return(
      <Dashboard loading={loading} activeComponent='organizations'>
        {
          !loading &&
          <div className={css.content}>
            <h2>{i18n.organizations}</h2>
            <New onCreate={this.createOrganization} />
            <Collapse
              accordion={true}
              activeKey={this.state.activeKey}
              onChange={this.onAccordionChange}>
            {
              organizations.map(organization => (
                <Panel header={organization.name} key={`organization-${organization.id}`}>
                  <Show
                    organizationId={organization.id}
                    municipalities={municipalities}
                    onUpdate={this.updateOrganization}
                    onDelete={this.deleteOrganization}
                  />
                </Panel>
              ))
            }
            </Collapse>
          </div>
        }
      </Dashboard>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const index = document.querySelector('#organizations-index')
  index && render(<Index/>, index)
})
