import React, { Component } from 'react'
import css from './dev-site-list.scss'
import { replace, ceil } from 'lodash'


export default class DevSiteList extends Component {
  constructor(props) {
    super(props);
    this.parent = this.props.parent;
    this.devSiteNodes = () => this._devSiteNodes();
    this.handleDevSiteClick = (e) => this._handleDevSiteClick(e);
    this.handleDevSiteMouseEnter = (e) => this.parent.setState({ hoverdDevSiteId: e.currentTarget.dataset.id });
    this.handleDevSiteMouseLeave = () => this.parent.setState({ hoverdDevSiteId: null });
    this.handlePreviousClick = (e) => this._handlePreviousClick(e);
    this.handleForwardClick = (e) => this._handleForwardClick(e);
  }
  _handleDevSiteClick(e) {
    e.preventDefault();
    if(this.parent.state.activeDevSiteId === e.currentTarget.dataset.id){
      this.parent.setState({ activeDevSiteId: null });
    }else{
      this.parent.setState({ activeDevSiteId: e.currentTarget.dataset.id });
    }
  }
  _handlePreviousClick(e) {
    e.preventDefault()
    if(this.props.page < 1) return;
    this.parent.setState({ page: (this.props.page - 1) }, () => this.parent.loadDevSites());
  }
  _handleForwardClick(e) {
    e.preventDefault()
    if((this.props.page + 1) === ceil(this.props.total / 20)) return;
    this.parent.setState({ page: (this.props.page + 1) }, () => this.parent.loadDevSites());
  }
  _devSiteNodes() {
    return this.props.devSites.map(devSite => {
      return <a href="#" onClick={this.handleDevSiteClick}
                         onMouseEnter={this.handleDevSiteMouseEnter}
                         onMouseLeave={this.handleDevSiteMouseLeave}
                         data-id={devSite.id}
                         className={this.props.activeDevSiteId == devSite.id ? css.activeitem : css.item}
                         key={devSite.id}>
        <h3 className={css.address}>{devSite.address}</h3>
        <div className={css.info}>{devSite.devID}</div>
        <div className={css.info}>{replace(devSite.application_type, /coa/, 'Committee of Adjustment')}</div>
        <div className={css.info} dangerouslySetInnerHTML={{__html: devSite.status}}></div>
        <div className={css.description} dangerouslySetInnerHTML={{__html: devSite.description}}></div>
      </a>
    })
  }
  render() {
    if(this.props.devSites.length === 0) {
      return <div className={css.empty}>
        No development sites found.
      </div>
    }

    return <div className={css.container}>
      <div className={css.pagination}>
        <a href="#" onClick={this.handlePreviousClick} className={this.props.page === 0 ? css.disableleftarrow : css.leftarrow}></a>
        {this.props.page + 1} / {ceil(this.props.total / 20)}
        <a href="#" onClick={this.handleForwardClick} className={(this.props.page+1) === ceil(this.props.total / 20) ? css.disablerightarrow : css.rightarrow}></a>
      </div>
      {this.devSiteNodes()}
      <div className={css.pagination}>
        <a href="#" onClick={this.handlePreviousClick} className={this.props.page === 0 ? css.disableleftarrow : css.leftarrow}></a>
        {this.props.page + 1} / {ceil(this.props.total / 20)}
        <a href="#" onClick={this.handleForwardClick} className={(this.props.page+1) === ceil(this.props.total / 20) ? css.disablerightarrow : css.rightarrow}></a>
      </div>
    </div>;
  }
}
