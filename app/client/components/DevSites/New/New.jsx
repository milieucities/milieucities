import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './new.scss'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import i18n from './locale'

export default class DevSiteNew extends Component {
  render() {

  }
}

document.addEventListener('turbolinks:load', () => {
  const devSiteShow = document.querySelector('#dev-site-show');
  devSiteShow && render(<DevSiteShow/>, devSiteShow)
})
