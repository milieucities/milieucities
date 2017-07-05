import React, { Component } from 'react'
import i18n from '../../DevSites/Form/locale.js'

export default class RadioButtonsWithLabel extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedOption: null }
    this.handleChange = (e) => this._handleChange(e);
    this.generateRadioButtonGroup = () => this._generateRadioButtonGroup();
  }

  _handleChange(e) {
    const selectedOption = e.currentTarget.value === this.state.selectedOption ? null : e.currentTarget.value;
    this.setState({ selectedOption })
    this.props.onChange(selectedOption);
  }

  _generateRadioButtonGroup() {
    return this.props.options.map((option, index) => (
      <div key={index}>
        <input name={this.props.name} type='radio' value={ option } checked={ option === this.state.selectedOption } onClick={this.handleChange}/>
        <span className='radio-label'>{ i18n[option] }</span>
      </div>
    ))
  }

  render() {
    return(
      <div className={`input-field ${this.props.classes}`}>
        <label htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </div>
    )
  }
}

