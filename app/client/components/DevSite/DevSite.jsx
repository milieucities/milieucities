import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './dev-site.scss'

export default class DevSite extends Component {
  constructor(props) {
    super(props);
    this.loadDevSite = () => this._loadDevSite();
    this.loadDevSite();
  }
  _loadDevSite() {
    fetch(`/dev_sites/${this.props.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json()
    }).then(devSiteJson => {
      this.setState({ devSite: devSiteJson });
    })
  }
  render() {
    return <div className={css.container}>
    </div>;
  }
}
