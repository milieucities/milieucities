import React, { Component } from 'react'
import i18n from '../../DevSites/Form/locale.js'

export default class RadioButtonsWithLabel extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedOption: this.props.defaultValue }
    this.handleChange = (e) => this._handleChange(e);
    this.generateRadioButtonGroup = () => this._generateRadioButtonGroup();
  }

  _handleChange(e) {
    const selectedOption = e.currentTarget.value === this.state.selectedOption ? null : e.currentTarget.value;
    this.setState({ selectedOption })
    this.props.onChange(selectedOption);
  }

  _generateRadioButtonGroup() {
    const options = this.props.options || [];
    return options.map((option, index) => (
      <div key={index}>
        <input name={this.props.name} type='radio' value={ option } checked={ option === this.state.selectedOption } onChange={this.handleChange}/>
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
        { this.generateRadioButtonGroup() }
      </div>
    )
  }
}

