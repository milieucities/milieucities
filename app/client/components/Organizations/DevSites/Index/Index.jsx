import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from '../../../Layout/Dashboard/Dashboard'
import DevSiteCard from '../../../DevSites/Card/Card'
import SearchForm from './SearchForm'
import css from '../../../Layout/Dashboard/dashboard.scss'
import indexCss from './index.scss'
import Pagination from '../../../Utility/Pagination/Pagination'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, page: 0 }
    this.loadDevSites = (q) => this._loadDevSites(q)
    this.handleDelete = (e) => this._handleDelete(e)
    this.loadDevSites()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.page !== this.state.page) {
      window.scrollTo(0,0);
      this.loadDevSites();
    }
  }

  _loadDevSites(query) {
    const { userPrimaryOrganizationId } = document.body.dataset;
    $.getJSON(`/organizations/${userPrimaryOrganizationId}/dev_sites`,
      { page: this.state.page, limit: this.state.limit, query },
      json => this.setState({ devSites: json.dev_sites, total: json.total, loading: false })
    );
  }

  _handleDelete(e) {
    e.preventDefault();
    $.ajax({
      url: `/dev_sites/${e.currentTarget.dataset.id}`,
      dataType: 'JSON',
      type: 'DELETE',
      success: () => {
        window.flash('notice', 'Development site successfully deleted')
        this.loadDevSites();
      },
      error: () => {
        window.flash('alert', 'Failed to delete development site')
      }
    });
  }

  render() {
    const { devSites, loading, page, total } = this.state
    const { locale } = document.body.dataset
    return(
      <Dashboard loading={loading} activeComponent='manage_dev_site'>
        {
          !loading &&
          <div className={css.content}>
            <h2>Manage Development Sites</h2>
            <div className={`row ${indexCss.addSites}`}>
              <div className="col s12">
                <a href={`/${locale}/dev_sites/new`} className='btn'>Add Development Site</a>
              </div>
            </div>
            <SearchForm handleSubmit={this.loadDevSites} />
            <div className='row'>
              {
                devSites && devSites.map(devSite => (
                  <div className={`col s12 m6 ${indexCss.devSite}`} key={`preview-${devSite.id}`}>
                    <a href={`/${locale}/dev_sites/${devSite.id}/edit`} className={`btn icon ${indexCss.edit}`}>
                      <i className='fa fa-pencil'></i>
                    </a>
                    <a href='#' onClick={this.handleDelete} data-id={devSite.id} className={`btn icon ${indexCss.delete}`}>
                      <i className='fa fa-trash'></i>
                    </a>
                    <a href={`/${locale}/dev_sites/${devSite.id}`}>
                      <DevSiteCard id={devSite.id} devSite={devSite} />
                    </a>
                  </div>
                ))
              }
            </div>
            <Pagination page={page} limit={18} total={total} parent={this} />
          </div>
        }
      </Dashboard>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const organizationDevSiteIndex = document.querySelector('#organizations-dev-sites-index');
  organizationDevSiteIndex && render(<Index/>, organizationDevSiteIndex);
})
