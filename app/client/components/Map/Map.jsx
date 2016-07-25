import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './map.scss'
import MapSearch from '../MapSearch/MapSearch'
import MapFilter from '../MapFilter/MapFilter'

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className={css.container}>
      <div className={css.sidebar}>
        <MapSearch />
        <MapFilter />
      </div>
    </div>;
  }
}

document.addEventListener('page:change', () => {
  if(document.querySelector('#dev-site-map')){
    render(<Map/>, document.querySelector('#dev-site-map'))
  }
})
