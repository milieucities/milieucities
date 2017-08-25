import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './map-wrapper.scss'
import MapSearch from '../MapSearch/MapSearch'
import DevSiteList from '../DevSiteList/DevSiteList'
import DevSitePreview from '../../Preview/Preview'
import MapAwesome from '../Map/Map'
import { Map } from 'immutable'
import { debounce, omitBy, isNil } from 'lodash'
import Header from '../../../Layout/Header/Header'

export default class MapWrapper extends Component {
  constructor(props) {
    super(props);
    const devSiteMap = document.querySelector('#dev-site-map');

    this.state = {
                   loading: true,
                   page: parseInt(getParameterByName('page')) || 0,
                   devSites: [],
                   municipalities: [],
                   latitude: getParameterByName('latitude') || this.props.latitude || 43.544476130796994,
                   longitude: getParameterByName('longitude') || this.props.longitude || -80.25039908384068,
                   zoom: getParameterByName('zoom') || 11.5,
                   ward: getParameterByName('ward'),
                   status: getParameterByName('status'),
                   year: getParameterByName('year'),
                   municipality: getParameterByName('municipality'),
                   activeDevSiteId: getParameterByName('activeDevSiteId'),
                   isMobile: (window.innerWidth < 992)
                 };

    this.search = () => this._search();
    this.loadDevSites = () => this._loadDevSites();
    this.loadMunicipalities = () => this._loadMunicipalities();
    this.updateSearchParams = (params, callback) => this._updateSearchParams(params, callback);
    this.params = () => this._params();
    this.loadDevSites();
    this.loadMunicipalities();

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
    const { query, page, latitude, longitude, zoom, status, year, municipality, ward, activeDevSiteId } = this.state;
    return omitBy({ query, page, latitude, longitude, zoom, status, year, municipality, ward, activeDevSiteId }, isNil);
  };

  _loadDevSites() {
    const scrollToTop = () => { if (this.refs.sidebar) this.refs.sidebar.scrollTop = 0 };
    $.getJSON(`/dev_sites`, this.params(), json => {
      this.setState({ devSites: (json.dev_sites || []), total: json.total, loading: false }, scrollToTop);
    });
  }

  _loadMunicipalities() {
    $.getJSON(`/municipalities`, municipalities => {
      console.log('municipalities', municipalities);
      this.setState({ municipalities });
    });
  }

  _search() {
    const scrollToTop = () => { if (this.refs.sidebar) this.refs.sidebar.scrollTop = 0 };
    console.log('SEARCHING', this.params())
    this.setState({ loading: true });

    $.getJSON(`/dev_sites`, this.params(), json => {
      if(json.dev_sites && (!this.state.longitude || !this.state.latitude)) {
        this.setState({ longitude: json.dev_sites[0].longitude, latitude: json.dev_sites[0].latitude });
      }
      this.setState({ page: 0, devSites: (json.dev_sites || []), total: json.total, loading: false }, scrollToTop);
    });
  }

  _updateSearchParams(params, callback) {
    this.setState(params, callback)
  }

  render() {
    return(
      <div>
        <Header />
          {
            !this.state.isMobile &&
            <div className={css.container}>
              <div className={css.sidebar} ref='sidebar'>
                <MapSearch
                  {...this.state}
                  updateSearchParams={this.updateSearchParams}
                  search={this.search}
                />
                <DevSiteList {...this.state} parent={this} />
              </div>
              <div className={css.content}>
                {
                  this.state.activeDevSiteId &&
                  <DevSitePreview id={this.state.activeDevSiteId} parent={this} />
                }
                {
                  !this.state.activeDevSiteId &&
                  <MapAwesome {...this.state} parent={this} />
                }
              </div>
            </div>
          }
          {
            this.state.isMobile &&
            <div className={css.container}>
              <div className={css.content}>
                <MapSearch {...this.state} parent={this} />
                {
                  this.state.activeDevSiteId &&
                  <DevSitePreview id={this.state.activeDevSiteId} parent={this} />
                }
                {
                  !this.state.activeDevSiteId &&
                  <MapAwesome {...this.state} parent={this} />
                }
                <DevSiteList {...this.state} parent={this} />
              </div>
            </div>
          }
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const devSiteMap = document.querySelector('#dev-site-map');
  if (devSiteMap) {
    const { userLongitude, userLatitude } = devSiteMap.dataset;
    render(
      <MapWrapper
        longitude={userLongitude}
        longitude={userLongitude}
      />, devSiteMap
    )
  }
})
