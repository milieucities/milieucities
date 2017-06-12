import React, { Component } from 'react'
import css from './preview.scss'
import { capitalize, replace } from 'lodash'
import i18n from './locale'
import CommentsSection from '../../Comments/CommentsSection'
import Modal from '../../Utility/Modal/Modal'
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { showFiles: false, devSite: props.devSite }
    this.parent = this.props.parent;
    this.currentUserId = parseInt(document.body.dataset.userId);
    this.loadDevSite = () => this._loadDevSite();
    this.toggleShowFiles = (e) => this._toggleShowFiles(e);
    this.closeDevSite = (e) => this._closeDevSite(e);
    this.openEmailModal = (e) => this._openEmailModal(e);
    this.handleEmail = (e) => this._handleEmail(e);
    this.toggleLike = () => this._toggleLike();
    this.toggleFeatured = () => this._toggleFeatured();
    this.userAdmin = () => this._userAdmin();

    if(!props.devSite) {
      this.loadDevSite();
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.id !== this.props.id) this.loadDevSite();
    this.refs.container &&  this.refs.container.focus();
  }

  _loadDevSite() {
    $.getJSON(`/dev_sites/${this.props.id}`,
      devSite => this.setState({ devSite })
    );
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
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { messageSent, messageNotSent, mustSign } = i18n
    $.ajax({
      url: url,
      dataType: 'JSON',
      type: 'POST',
      cache: false,
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: () => {
        window.flash('notice', messageSent)
        this.setState({ showModal: false });
      }, error: () => {
        window.flash('alert', messageNotSent)
        this.setState({ showModal: false });
      }
    });
  }

  _toggleLike() {
    const { devSite } = this.state;
    const data = devSite.like ?
                {dev_site: {likes_attributes: {'0' : {id: devSite.like.id, _destroy: 1 }}} } :
                {dev_site: {likes_attributes: {'0' : {user_id: this.currentUserId, dev_site_id: devSite.id}}} }

    $.ajax({
      url: `/dev_sites/${devSite.id}`,
      dataType: 'JSON',
      type: 'PATCH',
      cache: false,
      data: data,
      success: devSiteJson => this.setState({ devSite: devSiteJson }),
      error: error => {
        if(error.status == 403){
          window.flash('alert', mustSign)
        }
      }
    });
  }

  _toggleFeatured() {
    const { devSite } = this.state;
    const featured = !devSite.featured;
    const data = { dev_site: { featured }};
    $.ajax({
      url: `/dev_sites/${devSite.id}`,
      dataType: 'JSON',
      type: 'PATCH',
      data: data,
      success: devSiteJson => {
        this.setState({ devSite: devSiteJson })
      },
      error: error => {
        window.flash('alert', error)
      }
    });
  }

  _userAdmin() {
    return document.body.dataset.userRoles && (document.body.dataset.userRoles.indexOf('admin') !== -1)
  }

  _closeDevSite(e) {
    e.preventDefault();
    this.parent.setState({ activeDevSiteId: null });
  }

  _toggleShowFiles(e) {
    e.preventDefault();
    this.setState({ showFiles: !this.state.showFiles });
  }

  render() {
    const { devSite, showFiles, showModal, showReadMore, readMoreClicked, contact } = this.state;
    const { horizontal, preview } = this.props;
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);

    if(!devSite) return <div></div>;

    if(preview && !horizontal) {
      return(
        <div className={css.verticalPreviewContainer} style={{width: this.props.width}} title={`Development Site at ${devSite.address}`}>
          {false && <div className={css.status}>{i18n.openForComments}</div>}
          <img src={devSite.image_url} alt={`Image of ${devSite.address}`} className={css.image} />
          <div className={css.content}>
            <svg height='40' width='100%'>
              <mask id='circles'>
                <circle cx='10%' cy='20' r='15' fill='#aaa' />
                <circle cx='50%' cy='20' r='15' fill='#aaa' />
                <circle cx='90%' cy='20' r='15' fill='#aaa' />
                <circle cx='10%' cy='20' r='10' fill='#fff' />
                <circle cx='50%' cy='20' r='10' fill='#fff' />
                <circle cx='90%' cy='20' r='10' fill='#fff' />
                <line x1='10%' x2='90%' y1='20' y2='20' stroke='#fff' strokeWidth='2' />
              </mask>

              <linearGradient id='gradients'>
                <stop offset='0' stopColor='#92c7c6' />
                {devSite.general_status == 'Active Development' && <stop offset='0.4' stopColor='#ddd' />}
                {(devSite.general_status == 'Comment Period' || devSite.general_status == 'Active Development') && <stop offset='1' stopColor='#ddd'/>}
              </linearGradient>

              <rect height='40' width='100%' fill='url(#gradients)' mask='url(#circles)'></rect>
            </svg>
            <h3 className={css.address}>{devSite.address}</h3>
            <div className={css.description} dangerouslySetInnerHTML={{__html: devSite.description }} tabIndex='-1'></div>
          </div>
        </div>
      )
    }

    if(preview && horizontal) {
      return(
        <div className={css.horizontalPreviewContainer} title={`Go to ${devSite.address}`}>
          {false && <div className={css.status}>{i18n.openForComments}</div>}
          <img src={devSite.image_url} alt={`Image of ${devSite.address}`} className={css.image} />
          <div className={css.content}>
            <svg height='40' width='100%'>
              <mask id='circles'>
                <circle cx='10%' cy='20' r='15' fill='#aaa' />
                <circle cx='50%' cy='20' r='15' fill='#aaa' />
                <circle cx='90%' cy='20' r='15' fill='#aaa' />
                <circle cx='10%' cy='20' r='10' fill='#fff' />
                <circle cx='50%' cy='20' r='10' fill='#fff' />
                <circle cx='90%' cy='20' r='10' fill='#fff' />
                <line x1='10%' x2='90%' y1='20' y2='20' stroke='#fff' strokeWidth='2' />
              </mask>

              <linearGradient id='gradients'>
                <stop offset='0' stopColor='#92c7c6' />
                {devSite.general_status == 'Active Development' && <stop offset='0.4' stopColor='#ddd' />}
                {(devSite.general_status == 'Comment Period' || devSite.general_status == 'Active Development') && <stop offset='1' stopColor='#ddd'/>}
              </linearGradient>

              <rect height='40' width='100%' fill='url(#gradients)' mask='url(#circles)'></rect>
            </svg>
            <h3 className={css.address}>{devSite.address}</h3>
            <div className={css.description} dangerouslySetInnerHTML={{__html: devSite.description }} tabIndex='-1'></div>
          </div>
        </div>
      )
    }

    return(
      <div className={css.container} ref='container' tabIndex='-1'>
        <div className={css.menu}>
          <a className={css.close} onClick={this.closeDevSite} href='#'></a>
          <a className={css.expand} href={devSite.url}></a>
        </div>
        <div className={css.wrapper}>

          <div className={css.title}>{devSite.street}</div>
          <div className={css.subtitle}>{replace(devSite.application_type, /coa/, 'Committee of Adjustment')}</div>

          <img src={devSite.image_url} alt={`Image of ${devSite.address}`} className={css.image} />

          <div className={css.interact}>
            <div className={css.sharecontainer}>
              <FacebookShareButton url={devSite.url} title={devSite.address} media={devSite.image_url}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={devSite.url} title={devSite.address} media={devSite.image_url}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            {
              this.userAdmin() &&
              <div className={css.featuredContainer}>
                <i className={`fa fa-star ${devSite.featured ? css.featured : css.unfeatured}`} onClick={this.toggleFeatured}></i>
              </div>
            }
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
              <div className={css.title}>{i18n.devId}</div>
              <div className={css.subtitle}>{devSite.devID}</div>
            </div>
            <div className={css.col}>
              <div className={css.title}>{i18n.ward}</div>
              <div className={css.subtitle}>{capitalize(devSite.ward_name)}</div>
            </div>
            <div className={css.col}>
              <div className={css.title}>{i18n.status}</div>
              <div className={css.subtitle} dangerouslySetInnerHTML={{__html: devSite.status}}></div>
            </div>
          </div>

          <div className={css.descriptiontitle}>{i18n.description}</div>
          <div className={css.description} dangerouslySetInnerHTML={{__html: devSite.description}}></div>

          {
            devSite.city_files.length > 0 &&
            <a title='Toggle view of relevant files' href='#' className={css.filecontainer} onClick={this.toggleShowFiles}>
              <i className={css.folder}></i>
              {showFiles ? 'Hide ' : 'View ' } {devSite.city_files.length} attached files
            </a>
          }

          {
            showFiles &&
            devSite.city_files.map(file => {
              return(
                <a key={file.id} href={file.link} target='_blank' className={css.filelink}>{file.name}</a>
              )
            })
          }

          {
            showFiles &&
            devSite.files.map(file => {
              return(
                <a key={file.id} href={file.url} target='_blank' className={css.filelink}>{file.name}</a>
              )
            })
          }

          {
            devSite.urban_planner_email || devSite.ward_councillor_email &&
            <div className={css.emailofficials}>
              {
                devSite.urban_planner_email &&
                <a href='#' onClick={this.openEmailModal} className={css.email} title={i18n.emailUrbanPlanner}>
                  <i className={css.mail}></i> {i18n.urbanPlanner}
                </a>
              }
              {
                devSite.ward_councillor_email &&
                <a href='#' onClick={this.openEmailModal} className={css.email} title={i18n.emailConcillor}>
                  <i className={css.mail}></i> {i18n.councillor}
                </a>
              }
            </div>
          }
        </div>

        <CommentsSection
          devSiteId={devSite.id}
        />

        {
          showModal &&
          <Modal parent={this}>
            <EmailModal contact={contact} address={devSite.address} id={devSite.id} handleEmail={this.handleEmail} />
          </Modal>
        }
      </div>
    );
  }
}

const EmailModal = (props) => {
  return <div className={css.emailmodal} tabIndex='-1'>
    <div className={css.contact} >{i18n.contact} {props.contact}</div>
    <div className={css.address}>{props.address}</div>

    <form onSubmit={props.handleEmail} acceptCharset='UTF-8' >
      <input name='utf8' type='hidden' value='✓' />
      <input value={props.id} type='hidden' name='dev_site_id' />
      <div className='input-field'>
        <label>{i18n.name}</label>
        <input type='text' required='required' name='name' className={css.input} />
      </div>
      <div className='input-field'>
        <label>{i18n.email}</label>
        <input type='text' required='required' name='email' className={css.input} />
      </div>
      <div className='input-field'>
        <label>{i18n.message}</label>
        <textarea name='message' required='required' className={css.textarea}></textarea>
      </div>
      <input type='submit' name='commit' value='Send' className='btn' />
    </form>

  </div>
}
