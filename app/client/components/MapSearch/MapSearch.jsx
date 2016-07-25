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
        <Autocomplete callback={this.autocompleteCallback} placeholder="Address" type="custom" onSelect={this.handleAutocompleteSelect}/>
      </div>
      <div className={css.divider}></div>
      <div className="row no-marg">
        <div className="col s12 m4">
          <Select title="Year" options={['one this is a long piece of text', 'two', 'three', 'four', 'five', 'six', 'seven']} onSelect={this.handleSelectDropdown} />
        </div>
        <div className="col s12 m4">
          <Select title="Status" options={['un', 'deux', 'toi']} onSelect={this.handleSelectDropdown} />
        </div>
        <div className="col s12 m4">
          <Select title="Ward" options={['apple', 'orange', 'pear']} onSelect={this.handleSelectDropdown} />
        </div>
      </div>
    </div>;
  }
}
