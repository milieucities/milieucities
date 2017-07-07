import React, { Component } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'

export default class MilieuDatePicker extends Component {
  constructor(props) {
    super(props)
    this.parseDateFromDateTime = () => this._parseDateFromDateTime();
  }

  _parseDateFromDateTime() {
    const date = this.props.selected;

    return (date && typeof(date) === 'string') ? moment(date, 'YYYY-MM-DD') : date;
  }

  render() {
    return(
      <DatePicker
        { ...this.props }
        selected={this.parseDateFromDateTime()}
      />
    )
  }
}

