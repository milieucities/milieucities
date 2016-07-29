import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './map-filter.scss'

export default class MapFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { activeText: null }
    this.handleClick = (e) => this._handleClick(e);
  }
  _handleClick(e) {
    e.preventDefault();
    const text = this.state.activeText !== e.target.innerText && e.target.innerText;
    this.setState({ activeText: text });
  }
  render() {
    const { activeText } = this.state;
    const sortType = ['Popular', 'Latest', 'Coolest', 'Coldest'];
    return <div className={css.container}>
      <div className={css.sort}>
        <div>Sort</div>
      </div>
      <div className={css.row}>
        {sortType.map((type, i) => {
          return <div className={css.col} key={i}>
            <a href="#"
               className={activeText === type ? css.activeitem : css.item}
               onClick={this.handleClick}>
               {type}
            </a>
          </div>;
        })}
      </div>
    </div>;
  }
}
