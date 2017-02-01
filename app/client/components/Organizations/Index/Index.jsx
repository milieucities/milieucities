import React, { Component } from 'react'
import { render } from 'react-dom'
import Collapse, { Panel } from 'rc-collapse'

import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import ProfileHeader from '../../Common/ProfileHeader/ProfileHeader'
import ProfileMenu from '../../Common/ProfileMenu/ProfileMenu'
import Show from '../Show/Show'
import New from '../New/New'
import i18n from './locale'
import css from './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.userSlug = document.body.dataset.userSlug;
    this.loadUser = () => this._loadUser();
    this.loadOrganizations = () => this._loadOrganizations();
    this.createOrganization = (e) => this._createOrganization(e);
    this.onAccordionChange = (e) => this._onAccordionChange(e);
    this.loadUser();
    this.loadOrganizations();
  }

  _loadUser() {
    $.getJSON(`/users/${this.userSlug}`,
      user => this.setState({ user })
    );
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
      success: user => {
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
    const { user, organizations, loading } = this.state;
    const { userSlug, userAvatar, userName, locale } = document.body.dataset;
    i18n.setLanguage(locale);
    return(
      <div>
        <Header/>
        <ProfileHeader
          userName={userName}
          userAvatar={userAvatar}
          user={user}
        />
        <div className={css.container}>
          <div className='container'>
            <ProfileMenu active='organizations' user={user} />
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
                <h2>{i18n.organizations}</h2>
                <New
                  onCreate={this.createOrganization}
                />
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
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const index = document.querySelector('#organizations-index')
  index && render(<Index/>, index)
})
