import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './map-search.scss'
import Autocomplete from '../Autocomplete/Autocomplete'
import Select from '../Select/Select'

export default class MapSearch extends Component {
  constructor(props) {
    super(props);
    this.autocompleteCallback = (address, autocomplete) => this._autocompleteCallback(address, autocomplete);
    this.handleAutocompleteSelect = (address) => this._handleAutocompleteSelect(address);
    this.handleSelectDropdown = (selectedText) => this._handleSelectDropdown(selectedText);
  }
  _autocompleteCallback(address, autocomplete) {
    const googleLocationAutocomplete = new google.maps.places.AutocompleteService();
    const request = { input: address, types: ['address'], componentRestrictions: {country: 'ca'} };
    googleLocationAutocomplete.getPlacePredictions(request, (predictions) => {
      const suggestions = predictions ? predictions.map(function(prediction){ return prediction.description; }) : [];
      autocomplete.setState({ suggestions: suggestions });
    })
  }
  _handleAutocompleteSelect(address) {
    // TODO
    return false;
  }
  _handleSelectDropdown(selectedText) {
    // TODO
    return false;
  }
  render() {
    return <div className={css.container}>
      <div className={css.wrapper}>
        <Autocomplete callback={this.autocompleteCallback} placeholder='Address' type='custom' onSelect={this.handleAutocompleteSelect}/>
      </div>
      <div className={css.divider}></div>
      <div className='row no-marg'>
        <div className='col s12 m4'>
          <Select title='Year' options={YEARS} onSelect={this.handleSelectDropdown} />
        </div>
        <div className='col s12 m4'>
          <Select title='Status' options={STATUS_TYPES} onSelect={this.handleSelectDropdown} />
        </div>
        <div className='col s12 m4'>
          <Select title='Ward' options={WARD_TYPES} onSelect={this.handleSelectDropdown} />
        </div>
      </div>
    </div>;
  }
}

const YEARS = ['2016', '2015', '2014', '2013', '2012', '2011'];

const STATUS_TYPES = ['Committee of Adjustment', 'Application File Pending', 'Application Reactivated',
  'Application Approved', 'Application Approved by Committee', 'Application Recommended to Council',
  'Draft Report sent to Councillor and Applicant for Response', 'In Appeal Period', 'Comment Period in Progress',
  'Community Information and Comment Session Held', 'Comment Period has Ended/Issue Resolution',
  'Community Information and Comment Session Open', 'Unknown'];

const WARD_TYPES = [ 'Orleans', 'Innes', 'Barrhaven', 'Kanata North',
  'West Carleton-March', 'Stittsville', 'Bay', 'College', 'Knoxdale-Merivale',
  'Gloucester-Southgate', 'Beacon Hill-Cyrville', 'Rideau-Vanier', 'Rideau-Rockcliffe',
  'Somerset', 'Kitchissippi', 'River', 'Capital', 'Alta Vista', 'Cumberland', 'Osgoode',
  'Rideau-Goulbourn', 'Gloucester-South Nepean', 'Kanata South']
