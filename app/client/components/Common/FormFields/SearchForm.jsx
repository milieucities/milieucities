import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './form.scss'

export default class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { query: '' }
    this.handleChange = (e) => this._handleChange(e)
    this.handleSubmit = (e) => this._handleSubmit(e)
    this.clearSearch = (e) => this._clearSearch(e)
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

  _clearSearch(e) {
    e.preventDefault()
    this.setState({ query: '' })
    this.props.handleSubmit();
  }

  render() {
    return(
      <form className={`row ${css.devSiteSearch}`} onSubmit={this.handleSubmit}>
        <div className={`col s12 ${css.searchForm}`}>
          <div className={`input-field ${css.searchInput}`}>
            <input
              type="text"
              id='search-input'
              value={this.state.query}
              placeholder="Search development sites"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" value='Search' className="btn submit">
            <i className={`fa fa-search`}></i>
          </button>
          <button className="btn cancel" onClick={this.clearSearch}>
            <i className={`fa fa-remove`}></i>
          </button>
        </div>
      </form>
    )
  }
}