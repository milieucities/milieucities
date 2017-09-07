import React, { Component } from 'react'
import css from './map-search.scss'
import i18n from './locale'
import SearchForm from '../../../Common/FormFields/SearchForm'
import Autocomplete from '../../../Utility/Autocomplete/Autocomplete'
import Select from '../../../Utility/Select/Select'
import { flatten } from 'lodash'
import { YEARS } from '../../../Common/constants'

export default class MapSearch extends Component {
  constructor(props) {
    super(props);
    this.parent = this.props.parent;
    this.state = { isMobile: (window.innerWidth < 600) };
    this.autocompleteCallback = (address, autocomplete) => this._autocompleteCallback(address, autocomplete);
    this.handleAutocompleteSelect = (address) => this._handleAutocompleteSelect(address);
    this.handleSelectDropdown = (type, value) => this._handleSelectDropdown(type, value);
    this.geocodeAddress = (address) => this._geocodeAddress(address);
    this.wardNames = () => this._wardNames();
    this.statusOptions = () => this._statusOptions();
    this.municipalityNames = () => this._municipalityNames();
    this.handleSearchSubmit = (query, callback) => this._handleSearchSubmit(query, callback);
  }

  _handleSearchSubmit(query) {
    this.props.updateSearchParams({ query }, this.props.search);
  }

  _handleSelectDropdown(type, value) {
    let newState = { [type]: value };

    if (type === value) {
      newState = { [type]: null }
    }

    if (type === 'municipality') {
      newState = Object.assign(newState, { ward: null, status: null, latitude: null, longitude: null })
    }

    if (type === 'ward') {
      newState = Object.assign(newState, { latitude: null, longitude: null })
    }

    this.props.updateSearchParams(newState, this.props.search);
  }

  _wardNames() {
    if (this.props.municipality) {
      const selectedMunicipality = this.props.municipality;
      const municipality = this.props.municipalities.find((municipality) => municipality.name == selectedMunicipality);
      const wards = municipality && municipality.wards.map((ward) => ward.name);
      return wards || [];
    } else {
      const municipalities = this.props.municipalities || [];
      const wards = municipalities.map((municipality) => {
        return municipality.wards.map((ward) => ward.name)
      });
      return flatten(wards);
    }
  }

  _municipalityNames() {
    return this.props.municipalities.map((municipality) => municipality.name)
  }

  _statusOptions() {
    if (this.props.municipality) {
      const selectedMunicipality = this.props.municipality;
      const municipality = this.props.municipalities.find((municipality) => municipality.name == selectedMunicipality);
      const statuses = municipality && municipality.statuses;
      return statuses || [];
    } else {
      const municipalities = this.props.municipalities || [];
      const statuses = municipalities.map((municipality) => {
        return municipality.statuses
      });
      return flatten(statuses);
    }
  }

  render() {
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const cities = this.municipalityNames();
    const wards = this.wardNames();
    const statuses = this.statusOptions();

    // if (this.state.isMobile) {
    //   return <div className={css.container}>
    //     <div className={css.wrapper}>
    //       <SearchForm handleSubmit={this.handleSearchSubmit} handleCancelSearch={this.props.handleCancelSearch}/>
    //     </div>
    //     <div className={css.divider}></div>
    //     <div className='row no-marg'>
    //       <div className={`col s3 m3 ${css.filter}`}>
    //         <Select
    //           title={i18n.city}
    //           type='municipality'
    //           options={cities}
    //           defaultValue={this.props.municipality}
    //           onSelect={this.handleSelectDropdown}
    //         />
    //       </div>
    //       <div className={`col s3 m3 ${css.filter}`}>
    //         <Select
    //           title={i18n.ward}
    //           type='ward'
    //           options={wards}
    //           defaultValue={this.props.ward}
    //           onSelect={this.handleSelectDropdown}
    //         />
    //       </div>
    //       <div className={`col s3 m3 ${css.filter}`}>
    //         <Select
    //           title={i18n.year}
    //           type='year'
    //           options={YEARS}
    //           defaultValue={this.props.year}
    //           onSelect={this.handleSelectDropdown}
    //         />
    //       </div>
    //       <div className={`col s3 m3 ${css.filter}`}>
    //         <Select
    //           title={i18n.status}
    //           type='status'
    //           options={statuses}
    //           defaultValue={this.props.status}
    //           onSelect={this.handleSelectDropdown}
    //         />
    //       </div>
    //     </div>
    //   </div>;
    // } else {
      return <div className={css.container}>
        <div className={css.wrapper}>
          <SearchForm handleSubmit={this.handleSearchSubmit} />
        </div>
        <div className={css.divider}></div>
        <div className='row no-marg'>
          <div className={`col s3 m3 ${css.filter}`}>
            <Select
              title={i18n.city}
              type='municipality'
              options={cities}
              defaultValue={this.props.municipality}
              onSelect={this.handleSelectDropdown}
            />
          </div>
          <div className={`col s3 m3 ${css.filter}`}>
            <Select
              title={i18n.ward}
              type='ward'
              options={wards}
              defaultValue={this.props.ward}
              onSelect={this.handleSelectDropdown}
            />
          </div>
          <div className={`col s3 m3 ${css.filter}`}>
            <Select
              title={i18n.year}
              type='year'
              options={YEARS}
              defaultValue={this.props.year}
              onSelect={this.handleSelectDropdown}
            />
          </div>
          <div className={`col s3 m3 ${css.filter}`}>
            <Select
              title={i18n.status}
              type='status'
              options={statuses}
              defaultValue={this.props.status}
              onSelect={this.handleSelectDropdown}
            />
          </div>
        </div>
      </div>;
    }
  }
