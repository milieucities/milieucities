import React, { Component } from 'react'
import omit from 'lodash.omit'
import css from './map-autocomplete.scss'

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, suggestions: [], highlightedIndex: null, value: '', inputProps: null };

    this.search = (value) => this._search(value);
    this.handleListSuggestionClick = (e) => this.setSuggestion(e.target.innerText);
    this.handleChange = (e) => this.setState({ value: this.inputTextField.value });
    this.handleFocus = () => this.search();
    this.handleKeyUp = (e) => this._handleKeyUp(e);
    this.handleKeyDown = (e) => this._handleKeyDown(e);
    this.handleSyntheticBlur = (e) => this._handleSyntheticBlur(e);
    this.openDropdown = () => this._openDropdown();
    this.closeDropdown = () => this._closeDropdown();
    this.setSuggestion = (suggestion) => this._setSuggestion(suggestion);
    this.dropdownSuggestionNodes = () => this._dropdownSuggestionNodes();
    this.dropdownNode = () => this._dropdownNode();

  }
  componentDidMount() {
    this.setState({ inputProps: omit(this.props, ['callback', 'className', 'onSelect']) });
  }
  _handleKeyUp(e) {
    if([9,13,27,38,40].indexOf(e.which) !== -1) return;
    this.search(this.inputTextField.value);
  }
  _handleKeyDown(e) {
    switch(e.which){
      case 9: /* TAB */
      this.closeDropdown();
      break;
      case 13: /* ENTER */
      e.preventDefault();
        this.setSuggestion(this.state.suggestions[this.state.highlightedIndex] || this.inputTextField.value);
      break;
      case 27: /* ESC */
      this.closeDropdown();
      break;
      case 40: /* ARROW DOWN */
      this.setState({ highlightedIndex: (this.state.highlightedIndex !== null ?
                                        (this.state.highlightedIndex + 1) % this.state.suggestions.length :
                                         0) });
      break;
      case 38: /* ARROW UP */
      e.preventDefault();
      this.setState({ highlightedIndex: (this.state.highlightedIndex ?
                                        (this.state.highlightedIndex - 1) % this.state.suggestions.length :
                                        this.state.suggestions.length - 1) });
      break;
    }
  }
  _handleSyntheticBlur(e) {
    if(e.target === this.inputTextField) return;
    this.closeDropdown();
  }
  _openDropdown() {
    this.setState({ open: true });
    document.addEventListener('click', this.handleSyntheticBlur);
  }
  _closeDropdown() {
    this.setState({ open: false, suggestions: [], highlightedIndex: null });
    this.inputTextField.blur();
    document.removeEventListener('click', this.handleSyntheticBlur);
  }
  _search(value = this.state.value){
    if(value === '' || this.inputTextField.value.length < this.props.minChars){
      this.setState({ suggestions: [] });
      return;
    }
    this.props.callback.call(this, value, this);
    this.openDropdown();
  }
  _setSuggestion(suggestion) {
    this.setState({ value: '' });
    this.props.onSelect(suggestion);
    this.closeDropdown();
  }
  _dropdownSuggestionNodes() {
    return this.state.suggestions.map((suggestion,i) => {
      return <li key={i}
                 onClick={this.handleListSuggestionClick}
                 className={this.state.highlightedIndex === i && css.highlighted}>
                 {suggestion}
              </li>;
    })
  }
  _dropdownNode() {
    return <ul className={css.dropdown}>
      {this.dropdownSuggestionNodes()}
    </ul>;
  }
  render() {
    return <div className={css.wrapper}>
      <i className={css.searchicon}></i>
      <input type='text' className={css.textfield}
        autoComplete='off'
        {...this.state.inputProps}
        ref={(input) => this.inputTextField = input}
        value={this.state.value}
        onFocus={this.handleFocus}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange} />
      {this.state.open ? this.dropdownNode() : null}
    </div>;
  }
}
