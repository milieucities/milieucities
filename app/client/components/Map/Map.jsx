import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './map.scss'

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>
      map
    </div>;
  }
}

document.addEventListener('page:change', () => {
  if(document.querySelector('#dev-site-map')){
    render(<Map/>, document.querySelector('#dev-site-map'))
  }
})
