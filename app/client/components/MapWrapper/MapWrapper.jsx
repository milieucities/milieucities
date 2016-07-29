import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './map-wrapper.scss'
import MapSearch from '../MapSearch/MapSearch'
import MapFilter from '../MapFilter/MapFilter'
import DevSiteList from '../DevSiteList/DevSiteList'
import DevSite from '../DevSite/DevSite'
import Map from '../Map/Map'

export default class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, devSites: [], activeDevSiteId: null };
    this.loadDevSites = () => this._loadDevSites();
    this.loadDevSites();
  }
  _loadDevSites() {
    const scrollToTop = () => this.refs.sidebar.scrollTop = 0;
    $.getJSON(`/dev_sites`, {page: this.state.page} ,
      devSitesJson => this.setState({ devSites: devSitesJson }, scrollToTop)
    );
  }
  render() {
    return <div className={css.container}>
      <div className={css.sidebar} ref="sidebar">
        <MapSearch />
        <MapFilter />
        <DevSiteList devSites={this.state.devSites} page={this.state.page} parent={this} />
      </div>
      <div className={css.content}>
        {this.state.activeDevSiteId && <DevSite id={this.state.activeDevSiteId} parent={this} />}
        <Map devSites={this.state.devSites} />
      </div>
    </div>;
  }
}

document.addEventListener('page:change', () => {
  if(document.querySelector('#dev-site-map')){
    render(<MapWrapper/>, document.querySelector('#dev-site-map'))
  }
})
