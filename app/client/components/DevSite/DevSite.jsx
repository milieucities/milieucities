import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './dev-site.scss'
import { capitalize, replace, concat } from 'lodash'
import Comments from '../Comments/Comments'
import Modal from '../Modal/Modal'

export default class DevSite extends Component {
  constructor(props) {
    super(props);
    this.state = { showFiles: false, showReadMore: false }
    this.parent = this.props.parent;
    this.loadDevSite = () => this._loadDevSite();
    this.toggleShowFiles = () => this.setState({ showFiles: !this.state.showFiles });
    this.closeDevSite = () => this.parent.setState({ activeDevSiteId: null });
    this.viewWholeDescription = (e) => this._viewWholeDescription(e);
    this.openEmailModal = (e) => this._openEmailModal(e);
    this.handleEmail = (e) => this._handleEmail(e);
    this.toggleLike = () => this._toggleLike();
    this.loadDevSite();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.id !== this.props.id) this.loadDevSite();
  }
  _loadDevSite() {
    $.getJSON(`/dev_sites/${this.props.id}`,
      devSiteJson => this.setState({ devSite: devSiteJson },
        () => {
          if(this.refs.description.scrollHeight > 145) {
            this.setState({ showReadMore: true, readMoreClicked: false });
          }
        }
      )
    );
  }
  _viewWholeDescription(e) {
    e.preventDefault();
    this.setState({ readMoreClicked: true });
  }
  _openEmailModal(e) {
    e.preventDefault();
    const { urban_planner_email, ward_councillor_email } = this.state.devSite;
    const contact = e.currentTarget.innerText;
    this.setState({ showModal: true, contact });
  }
  _handleEmail(e) {
    e.preventDefault();
    const { contact } = this.state;
    const url = contact === 'Urban Planner' ? '/contact_file_lead' : '/contact_councillor';

    $.ajax({
      url: url,
      dataType: 'JSON',
      type: 'POST',
      cache: false,
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: () => {
        Materialize.toast('Message successfully sent!', 3500, 'teal');
        this.setState({ showModal: false });
      }
    });

  }
  _toggleLike() {
    const { devSite } = this.state;
    const data = devSite.like ?
                {dev_site: {likes_attributes: {"0" : {id: devSite.like.id, _destroy: 1 }}} } :
                {dev_site: {likes_attributes: {"0" : {user_id: devSite.current_user_id, dev_site_id: devSite.id}}} }

    $.ajax({
      url: `/dev_sites/${devSite.id}`,
      dataType: 'JSON',
      type: 'PATCH',
      cache: false,
      data: data,
      success: devSiteJson => this.setState({ devSite: devSiteJson })
    });
  }
  render() {
    const { devSite, showFiles, showModal, showReadMore,
            readMoreClicked, contact } = this.state;
    if(!devSite) return <div />;

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
            <i className={devSite.like ? css.liked : css.like} onClick={this.toggleLike}></i>
            { devSite.likes_count }
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
            <div className={css.subtitle}>{devSite.updated}</div>
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

        <div className={css.descriptiontitle}>Description</div>
        <div className={readMoreClicked ? css.wholedescription : css.description}
          ref='description' dangerouslySetInnerHTML={{__html: devSite.description}}>
        </div>
        {showReadMore && !readMoreClicked && <a href='#'
          onClick={this.viewWholeDescription} className={css.readmore}>Read More...</a>}

        {devSite.city_files.length > 0 &&
          <div className={css.filecontainer} onClick={this.toggleShowFiles}>
          <i className={css.folder}></i>
          {showFiles ? 'Hide ' : 'View ' } {devSite.city_files.length} attached files
        </div>}

        {showFiles && devSite.city_files.map(file => {
          return <a key={file.id} href={file.link} target='_blank' className={css.filelink}>- {file.name}</a>
        })}

        <div className={css.emailofficials}>
          <a href='#' onClick={this.openEmailModal} className={css.email}>
            <i className={css.mail}></i> Urban Planner
          </a>
          <a href='#' onClick={this.openEmailModal} className={css.email}>
            <i className={css.mail}></i> Councillor
          </a>
        </div>

      </div>

      <Comments devSiteId={devSite.id} />
      {showModal && <Modal parent={this}>
        <EmailModal contact={contact} address={devSite.address} id={devSite.id} handleEmail={this.handleEmail} />
      </Modal>}
    </div>;
  }
}

const EmailModal = (props) => {
  return <div className={css.emailmodal}>
    <div className={css.contact}>Contact {props.contact}</div>
    <div className={css.address}>{props.address}</div>

    <form onSubmit={props.handleEmail} acceptCharset='UTF-8' >
      <input name='utf8' type='hidden' value='✓' />
      <input value={props.id} type='hidden' name='dev_site_id' />
      <input type='custom-text' required='required' name='name' className={css.input} placeholder='Name' />
      <input type='custom-text' required='required' name='email' className={css.input} placeholder='Email' />
      <textarea name='message' required='required' className={css.textarea} placeholder='Message'></textarea>
      <input type='submit' name='commit' value='Send' className={css.submit} />
    </form>

  </div>
}
