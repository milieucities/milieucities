import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from '../../Layout/Dashboard/Dashboard'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from './locale'
import Collapse, { Panel } from 'rc-collapse'
import Show from '../Show/Show'
import New from '../New/New'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.loadOrganizations = () => this._loadOrganizations();
    this.createOrganization = (e) => this._createOrganization(e);
    this.onAccordionChange = (e) => this._onAccordionChange(e);
    this.loadOrganizations();
  }

  _loadOrganizations() {
    $.getJSON(`/organizations`,
      organizations => this.setState({ organizations, loading: false })
    );
  }

  _createOrganization(e) {
    const orgName = document.getElementById('organization_name').value

    $.ajax({
      url: `/organizations`,
      dataType: 'JSON',
      type: 'POST',
      data: { organization: { name: orgName } },
      success: () => {
        this.loadOrganizations();
        window.flash('notice', 'Organization added');
      },
      error: error => {
        window.flash('alert', error);
      }
    });
  }

  _onAccordionChange(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    const { organizations, loading } = this.state;
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
              organizations.map((org, index) => (
                <Panel header={org.name} key={index}>
                  <Show organization={org} />
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
