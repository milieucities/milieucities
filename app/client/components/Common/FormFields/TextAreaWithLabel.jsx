import React, { Component } from 'react'

export default class TextAreaWithLabel extends Component {
  constructor(props) {
    super(props)
    const valid = this.props.defaultValue.length > 0
    const errorText = `${this.props.label} is a required field.`

    this.state = { valid, errorText }
    this.validate = (e) => {this._validate(e)}
  }

  _validate(e) {
    this.setState({ valid: this._fieldHasContent(e.currentTarget) })
  }

  _fieldHasContent(element) {
    return element.value.length > 0
  }

  render() {
    return(
      <div className={`input-field ${this.props.classes}`}>
        <label htmlFor={this.props.fieldRef}>{this.props.label}</label>
        <textarea 
          id={this.props.fieldRef} 
          defaultValue={this.props.defaultValue} 
          name={this.props.fieldName}
          form={this.props.form}
          onBlur={this.props.required && this.validate}
        />
        {this.props.required && !this.state.valid && <div className='error-message'>{this.state.errorText}</div>}
      </div>
    )
  }
}