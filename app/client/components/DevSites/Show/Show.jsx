import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './show.scss'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import Modal from '../../Utility/Modal/Modal'
import Comments from '../../Comments/Comments'
import CommentsSection from '../../Comments/CommentsSection'
import Loader from '../../Common/Loader/Loader'
import Sentiment from '../../Common/Sentiment/Sentiment'
import i18n from './locale'
import Chart from 'chart.js'
import Tabs from '../Show/Tabs'
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class DevSiteShow extends Component {
  constructor(props) {
    super(props);
    this.state = { showFiles: false, loading: true }
    this.devSiteId = document.querySelector('#dev-site-show').dataset.id;
    this.loadDevSite = () => this._loadDevSite();
    this.handleEmail = (e) => this._handleEmail(e);
    this.openEmailModal = (e) => this._openEmailModal(e);
  }

  componentDidMount() {
    this.loadDevSite();
  }

  _loadDevSite() {
    $.ajax({
      url: `/dev_sites/${this.devSiteId}`,
      dataType: 'JSON',
      type: 'GET',
      success: devSite => this.setState({ devSite, loading: false }),
      error: () => {
        window.flash('alert', 'Failed to load Development Site. Reload the page and try again.')
      }
    })
  }

  _handleEmail(e) {
    e.preventDefault();
    const { contact } = this.state;
    const url = contact === 'Urban Planner' ? '/contact_file_lead' : '/contact_councillor';
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { messageSent, mustSign } = i18n
    $.ajax({
      url,
      dataType: 'JSON',
      type: 'POST',
      cache: false,
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: () => {
        window.flash('notice', messageSent)
        this.setState({ showModal: false });
      }
    })
  }

  _openEmailModal(e) {
    e.preventDefault();
    const contact = e.currentTarget.innerText;
    this.setState({ showModal: true, contact });
  }

  render() {
    const { devSite, loading, showModal, contact } = this.state;
    const { locale } = document.body.dataset;
    const currentStatus = devSite ? devSite.current_status : '';
    i18n.setLanguage(locale);
    return(
      <div className={css.root}>
        <Header />
        <div className={`${css.container} container`}>
          <Loader loading={loading} />
          {
            !loading &&
            <div>
              <div>
                  <div className='row'>
                    <h1 className='devTitle'>{devSite.address}</h1>
                    <div className='col m6 s12'>
                      <h3>Application(s):</h3>
                        {
                          devSite.application_files.map((file, index) => (
                            <p key={index}>{`${file.application_type} (${file.file_number})`}</p>
                          ))
                        }
                        <h3>{i18n.status}:</h3>
                        <p>{currentStatus}</p>
                    </div>
                    <div className='col m6 s12'>
                      <img src={devSite.image_url} className={css.image} />
                    </div>
                  </div>

                  <Tabs devSite={devSite} />

              </div>
              <div className='row'>
                <div className='col s12 m6'>
                  <Comments devSiteId={devSite.id} />
                </div>

                  <CommentsSection devSiteId={devSite.id} devSite={devSite} applicationType={devSite.application_type_name}/>
              </div>
            </div>
          }
        </div>


        {
          showModal &&
          <Modal parent={this}>
            <EmailModal contact={contact} address={devSite.address} id={devSite.id} handleEmail={this.handleEmail} />
          </Modal>
        }
        <Footer/>
      </div>
    );
  }
}

const EmailModal = (props) => {
  return(
    <div className={css.emailmodal} tabIndex='-1'>
      <div className={css.contact} >Contact {props.contact}</div>
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
  )
}

document.addEventListener('turbolinks:load', () => {
  const devSiteShow = document.querySelector('#dev-site-show');
  devSiteShow && render(<DevSiteShow/>, devSiteShow)
})
