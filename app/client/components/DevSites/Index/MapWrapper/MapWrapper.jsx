import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './map-wrapper.scss'
import MapSearch from '../MapSearch/MapSearch'
import MapFilter from '../MapFilter/MapFilter'
import DevSiteList from '../DevSiteList/DevSiteList'
import DevSite from '../../Show/Show'
import MapAwesome from '../Map/Map'
import { Map } from 'immutable'
import { debounce, omitBy, isNil } from 'lodash'
import Header from '../../../Layout/Header/Header'

export default class MapWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { page: parseInt(getParameterByName('page')) || 0,
                   devSites: [],
                   latitude: getParameterByName('latitude'),
                   longitude: getParameterByName('longitude'),
                   ward: getParameterByName('ward'),
                   status: getParameterByName('status'),
                   year: getParameterByName('year'),
                   activeDevSiteId: getParameterByName('activeDevSiteId'),
                   isMobile: (window.innerWidth < 992) };

    this.search_and_sort = () => this._search_and_sort();
    this.loadDevSites = () => this._loadDevSites();
    this.params = () => this._params();
    this.loadDevSites();

    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 992) })
      }, 100)
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { locale } = document.body.dataset;
    const path = `${window.location.pathname}?${$.param(this.params())}`;
    window.history.replaceState({ path },'', path);
  }
  _params() {
    const { page, latitude, longitude, ward, status, year, activeDevSiteId } = this.state;
    return omitBy({ page, latitude, longitude, ward, status, year, activeDevSiteId }, isNil);
  }
  _loadDevSites() {
    const scrollToTop = () => this.refs.sidebar.scrollTop = 0;
    $.getJSON(`/dev_sites`, this.params(), json => {
      this.setState({ devSites: (json.dev_sites || []), total: json.total }, scrollToTop);
    });
  }
  _search_and_sort() {
    const scrollToTop = () => this.refs.sidebar.scrollTop = 0;
    $.getJSON(`/dev_sites`, this.params(), json => {
      this.setState({page: 0, devSites: (json.dev_sites || []), total: json.total }, scrollToTop);
    });
  }
  render() {
    return(
      <div>
        <Header />
        <div className={css.container}>
          <div className={css.sidebar} ref='sidebar'>
            <MapSearch {...this.state} parent={this} />
            {false && <MapFilter parent={this} />}
            <DevSiteList {...this.state} parent={this} />
          </div>
          <div className={css.content}>
            {
              this.state.activeDevSiteId &&
              <DevSite id={this.state.activeDevSiteId} parent={this} />
            }
            {
              !this.state.isMobile && !this.state.activeDevSiteId &&
              <MapAwesome {...this.state} parent={this} />
            }
          </div>
        </div>
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const devSiteMap = document.querySelector('#dev-site-map');
  devSiteMap && render(<MapWrapper/>, devSiteMap)
})
