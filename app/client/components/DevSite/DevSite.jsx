import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './dev-site.scss'
import { capitalize, replace, concat } from 'lodash'
import Comments from '../Comments/Comments'

export default class DevSite extends Component {
  constructor(props) {
    super(props);
    this.state = { showFiles: false }
    this.parent = this.props.parent;
    this.loadDevSite = () => this._loadDevSite();
    this.toggleShowFiles = () => this.setState({ showFiles: !this.state.showFiles });
    this.closeDevSite = () => this.parent.setState({ activeDevSiteId: null });
    this.loadDevSite();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.id !== this.props.id) this.loadDevSite();
  }
  _loadDevSite() {
    $.getJSON(`/dev_sites/${this.props.id}`,
      devSiteJson => this.setState({ devSite: devSiteJson })
    );
  }
  render() {
    let { devSite, showFiles } = this.state;
    if(!devSite) return <div></div>;
    return <div className={css.container}>
      <div className={css.menu}>
        <i className={css.close} onClick={this.closeDevSite}></i>
        <a className={css.expand} href={devSite.url}></a>
      </div>
      <div className={css.wrapper}>
        <div className={css.title}>{devSite.address}</div>
        <div className={css.subtitle}>{replace(devSite.application_type, /coa/, 'Committee of Adjustment')}</div>
        <div className={css.interact}>
          <div className={css.sharecontainer}>
            <i className={css.share}></i>
            Share
          </div>
          <div className={css.likecontainer}>
            <i className={css.like}></i>
            90
          </div>
        </div>

        <div className={css.delimiter}>
          <div className={css.line}></div>
          <div className={css.circle}></div>
          <i className={css.marker}></i>
        </div>

        <div className={css.row}>
          <div className={css.col}>
            <div className={css.title}>Development Id</div>
            <div className={css.subtitle}>{devSite.devID}</div>
          </div>
          <div className={css.col}>
            <div className={css.title}>Ward</div>
            <div className={css.subtitle}>{capitalize(devSite.ward_name)}</div>
          </div>
          <div className={css.col}>
            <div className={css.title}>Status</div>
            <div className={css.subtitle} dangerouslySetInnerHTML={{__html: devSite.status}}></div>
          </div>
        </div>

        <div className={css.description}>Description</div>
        <p className={css.p} dangerouslySetInnerHTML={{__html: devSite.description}}></p>

        {devSite.city_files.length > 0 ?
          <div className={css.filecontainer} onClick={this.toggleShowFiles}>
          <i className={css.folder}></i>
          {showFiles ? 'Hide ' : 'View ' } {devSite.city_files.length} attached files
        </div> : null}

        {showFiles && devSite.city_files.map(file => {
          return <a key={file.id} href={file.link} target='_blank' className={css.filelink}>- {file.name}</a>
        })}

        <div className={css.emailofficials}>
          <a href="#" className={css.email}><i className={css.mail}></i> Urban Planner</a>
          <a href="#" className={css.email}><i className={css.mail}></i> Councillor</a>
        </div>

      </div>

      <Comments devSiteId={devSite.id} />
    </div>;
  }
}
