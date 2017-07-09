import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './index.scss'

export default class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { query: '' }
    this.handleChange = (e) => this._handleChange(e)
    this.handleSubmit = (e) => this._handleSubmit(e)
  }

  _handleChange(e) {
    this.setState({ query: e.currentTarget.value })
  }

  _handleSubmit(e) {
    e.preventDefault();
    const query = this.state.query;
    if (query.length < 1) return;

    this.props.handleSubmit(query);
  }

  render() {
    return(
      <form className="search" onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.query} />
        <input type="submit" value='Submit' className="btn" />
      </form>
    )
  }
}