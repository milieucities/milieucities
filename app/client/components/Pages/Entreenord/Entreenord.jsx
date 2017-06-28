import React, { Component } from 'react'
import { render } from 'react-dom'

export default class Entreenord extends Component {
  render() {
    return(
      <div>
        <h1>Entreenord</h1>
      </div>
    )
  }
}



document.addEventListener('turbolinks:load', () => {
  const entreenord = document.querySelector('#entreenord');
  entreenord && render(<Entreenord/>, entreenord)
})