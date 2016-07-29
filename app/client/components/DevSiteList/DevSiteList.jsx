import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './dev-site-list.scss'
import { replace } from 'lodash'


export default class DevSiteList extends Component {
  constructor(props) {
    super(props);
    this.parent = this.props.parent;

    this.devSiteNodes = () => this._devSiteNodes();
    this.handleDevSiteClick = (e) => this._handleDevSiteClick(e);
    this.handlePreviousClick = (e) => this._handlePreviousClick(e);
    this.handleForwardClick = (e) => this._handleForwardClick(e);
  }
  _handleDevSiteClick(e) {
    e.preventDefault();
    this.parent.setState({ activeDevSiteId: e.currentTarget.dataset.id });
  }
  _handlePreviousClick(e) {
    e.preventDefault()
    if(this.props.page < 2) return;
    this.parent.setState({ page: (this.props.page - 1) }, () => this.parent.loadDevSites());
  }
  _handleForwardClick(e) {
    e.preventDefault()
    this.parent.setState({ page: (this.props.page + 1) }, () => this.parent.loadDevSites());
  }
  _devSiteNodes() {
    return this.props.devSites.map(devSite => {
      return <a href="#" onClick={this.handleDevSiteClick} data-id={devSite.id} className={css.item} key={devSite.id}>
        <div className={css.address}>{devSite.address}</div>
        <div className={css.info}>{devSite.devID}</div>
        <div className={css.info}>{replace(devSite.application_type, /coa/, 'Committee of Adjustment')}</div>
        <div className={css.info} dangerouslySetInnerHTML={{__html: devSite.status}}></div>
        <div className={css.description} dangerouslySetInnerHTML={{__html: devSite.description}}></div>
      </a>
    })
  }
  render() {
    return <div className={css.container}>
      {this.devSiteNodes()}
      <div className={css.pagination}>
        <a href="#" onClick={this.handlePreviousClick} className={this.props.page === 0 ? css.disableleftarrow : css.leftarrow}></a>
        {this.props.page} of 48
        <a href="#" onClick={this.handleForwardClick} className={css.rightarrow}></a>
      </div>
    </div>;
  }
}
