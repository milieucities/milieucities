import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './map.scss'
import MapSearch from '../MapSearch/MapSearch'
import MapFilter from '../MapFilter/MapFilter'
import DevSiteList from '../DevSiteList/DevSiteList'
import DevSite from '../DevSite/DevSite'

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, devSites: [], activeDevSiteId: null };
    this.loadDevSites = () => this._loadDevSites();
    this.loadDevSites();
  }
  _loadDevSites() {
    fetch(`/dev_sites?limit=10&page=${this.state.page}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json()
    }).then(devSitesJson => {
      this.setState({ devSites: devSitesJson }, () => this.refs.sidebar.scrollTop = 0);
    })
  }
  render() {
    return <div className={css.container}>
      <div className={css.sidebar} ref="sidebar">
        <MapSearch />
        <MapFilter />
        <DevSiteList devSites={this.state.devSites} page={this.state.page} parent={this} />
      </div>
      <div className={css.content}>
        {this.state.activeDevSiteId ? <DevSite id={this.state.activeDevSiteId} /> : null}
      </div>
    </div>;
  }
}

document.addEventListener('page:change', () => {
  if(document.querySelector('#dev-site-map')){
    render(<Map/>, document.querySelector('#dev-site-map'))
  }
})
