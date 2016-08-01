import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './map-wrapper.scss'
import MapSearch from '../MapSearch/MapSearch'
import MapFilter from '../MapFilter/MapFilter'
import DevSiteList from '../DevSiteList/DevSiteList'
import DevSite from '../DevSite/DevSite'
import MapAwesome from '../Map/Map'
import { Map } from 'immutable'
import { debounce } from 'lodash'

export default class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, devSites: [], search: Map(), latitude: 45.3072, longitude: -75.8174, isMobile: (window.innerWidth < 992) };
    this.search_and_sort = () => this._search_and_sort();
    this.loadDevSites = () => this._loadDevSites();
    this.loadDevSites();

    window.onresize = debounce(() => {
      this.setState({ isMobile: (window.innerWidth < 992) });
    }, 100)
  }
  _loadDevSites() {
    const { page, search, sort } = this.state;
    const scrollToTop = () => this.refs.sidebar.scrollTop = 0;
    $.getJSON(`/dev_sites`, {page, sort, search: search.toObject()},
      json => this.setState({ devSites: (json.dev_sites || []), total: json.total }, scrollToTop)
    );
  }
  _search_and_sort() {
    const { search, sort } = this.state;
    const scrollToTop = () => this.refs.sidebar.scrollTop = 0;
    $.getJSON(`/dev_sites`, {page: 0, sort, search: search.toObject() },
      json => this.setState({page: 0, devSites: (json.dev_sites || []), total: json.total }, scrollToTop)
    );
  }
  render() {
    return <div className={css.container}>
      <div className={css.sidebar} ref="sidebar">
        <MapSearch parent={this} />
        {false && <MapFilter parent={this} />}
        <DevSiteList devSites={this.state.devSites} page={this.state.page} total={this.state.total} parent={this} />
      </div>
      <div className={css.content}>
        {this.state.activeDevSiteId && <DevSite id={this.state.activeDevSiteId} parent={this} />}
        {!this.state.isMobile && <MapAwesome {...this.state} parent={this} />}
      </div>
    </div>;
  }
}

document.addEventListener('page:change', () => {
  if(document.querySelector('#dev-site-map')){
    render(<MapWrapper/>, document.querySelector('#dev-site-map'))
  }
})
