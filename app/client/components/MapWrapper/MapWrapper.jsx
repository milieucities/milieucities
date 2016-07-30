import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './map-wrapper.scss'
import MapSearch from '../MapSearch/MapSearch'
import MapFilter from '../MapFilter/MapFilter'
import DevSiteList from '../DevSiteList/DevSiteList'
import DevSite from '../DevSite/DevSite'
import MapAwesome from '../Map/Map'
import { Map } from 'immutable'

export default class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, devSites: [], activeDevSiteId: null, search: Map() };
    this.loadDevSites = () => this._loadDevSites();
    this.search = () => this._search();
    this.loadDevSites();
  }
  _loadDevSites() {
    const scrollToTop = () => this.refs.sidebar.scrollTop = 0;
    $.getJSON(`/dev_sites`, {page: this.state.page, search:  this.state.search.toObject()},
      json => this.setState({ devSites: json.dev_sites, total: json.total }, scrollToTop)
    );
  }
  _search() {
    const scrollToTop = () => this.refs.sidebar.scrollTop = 0;
    $.getJSON(`/dev_sites`, {page: 0, search:  this.state.search.toObject()},
      json => this.setState({page: 0, devSites: json.dev_sites, total: json.total }, scrollToTop)
    );
  }
  render() {
    return <div className={css.container}>
      <div className={css.sidebar} ref="sidebar">
        <MapSearch parent={this} />
        <MapFilter parent={this} />
        <DevSiteList devSites={this.state.devSites} page={this.state.page} total={this.state.total} parent={this} />
      </div>
      <div className={css.content}>
        {this.state.activeDevSiteId && <DevSite id={this.state.activeDevSiteId} parent={this} />}
        <MapAwesome devSites={this.state.devSites} />
      </div>
    </div>;
  }
}

document.addEventListener('page:change', () => {
  if(document.querySelector('#dev-site-map')){
    render(<MapWrapper/>, document.querySelector('#dev-site-map'))
  }
})
