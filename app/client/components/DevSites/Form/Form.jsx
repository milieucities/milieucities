import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from '../../Layout/Dashboard/Dashboard'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from './locale'
import { TextAreaWithLabel, TextInputWithLabel, SelectWithLabel } from '../../Common/FormFields/Form'
import StatusSection from '../../Statuses/Index/StatusSection'
import ContactsSection from '../../Contacts/Index/ContactsSection'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import { BUILDING_TYPES } from '../../Common/constants'


export default class DevSiteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingMunicipalities: true,
      loadingDevSite: true,
      activeMunicipalityIndex: 0,
      statusDate: null,
      devSiteId: document.querySelector('#dev-site-form').dataset.id,
      devSite: {},
      error: {}
    };

    this.loadMunicipalities = () => this._loadMunicipalities();
    this.loadDevSite = () => this._loadDevSite();
    this.handleChangeMunicipality = (e) => this._handleChangeMunicipality(e);
    this.handleStartDate = (date) => this._handleStartDate(date);
    this.handleEndDate = (date) => this._handleEndDate(date);
    this.handleMeetingDate = (date) => this._handleMeetingDate(date);
    this.handleSubmit = (e) => this._handleSubmit(e);
  }

  componentDidMount() {
    this.loadMunicipalities();
    this.loadDevSite();
  }

  _loadMunicipalities() {
    const { userPrimaryOrganizationId } = document.body.dataset;

    $.getJSON(`/organizations/${userPrimaryOrganizationId}/municipalities`, municipalities => {
      this.setState({ municipalities, loadingMunicipalities: false })
    });
  }

  _loadDevSite() {
    if(!this.state.devSiteId) {
      this.setState({ loadingDevSite: false });
      return;
    }

    $.getJSON(`/dev_sites/${this.state.devSiteId}`, devSite => {
      const startDate = devSite.statuses.length > 0 ? moment(devSite.statuses[0].status_date) : null;
      const activeMunicipalityIndex = this.state.municipalities.findIndex((mun) => mun.id === devSite.municipality_id);
      this.setState({ devSite, startDate, activeMunicipalityIndex, loadingDevSite: false })
    });
  }

  _handleChangeMunicipality(e) {
    this.setState({ activeMunicipalityIndex: e.currentTarget.selectedIndex });
  }

  _handleStartDate(date) {
    this.setState({ startDate: date });
  }

  _handleEndDate(date) {
    this.setState({ endDate: date });
  }

  _handleMeetingDate(date) {
    this.setState({ meetingDate: date });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { locale, userPrimaryOrganizationId } = document.body.dataset;
    const redirectUrl = `/${locale}/organizations/${userPrimaryOrganizationId}/dev_sites`;

    let [url, type] = [`/dev_sites`, 'POST'];

    if(this.state.devSiteId) {
      [url, type] = [`/dev_sites/${this.state.devSiteId}`, 'PATCH']
    }

    $.ajax({
      url,
      type,
      dataType: 'JSON',
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: devSite => {
        window.flash('notice', 'Successfully saved!')
      },
      error: error => {
        window.flash('alert', 'Failed to save!')
        this.setState({ error: error.responseJSON })
      }
    });
  }

  render() {
    const { loadingMunicipalities, devSite, loadingDevSite, municipalities, activeMunicipalityIndex, startDate, endDate, meetingDate, error } = this.state;
    const hasAddress = devSite.addresses && devSite.addresses.length > 0
    const hasStatus = devSite.statuses && devSite.statuses.length > 0
    i18n.setLanguage(document.body.dataset.locale);

    return(
      <Dashboard loading={loadingMunicipalities || loadingDevSite} activeComponent='manage_dev_site'>
        {
          !loadingMunicipalities && !loadingDevSite &&
          <div className={css.content}>
            { devSite.application_files &&
              <div>
                <h2>Application files for this property</h2>
                <ul>
                  {
                    devSite.application_files.map((file, index) => (
                      <li key={index}>{`${file.application_type} (${file.file_number})`}</li>
                    ))
                  }
                </ul>
              </div>
            }

            {
              devSite.id &&
              <div>
                <h2>{i18n.statuses}</h2>
                <StatusSection
                  devSite={ devSite }
                  statusOptions={ this.props.statusOptions }
                  notificationOptions={ this.props.notificationOptions }
                  loadDevSite={ this.loadDevSite }
                />

                <h2>{i18n.contacts}</h2>
                <ContactsSection
                  devSite={ devSite }
                  contactOptions={ this.props.contactOptions }
                  loadDevSite={ this.loadDevSite }
                />
              </div>
            }

            <h2>{i18n.developmentSite}</h2>
            <form encType='multipart/form-data' id='new-form' onSubmit={this.handleSubmit} acceptCharset='UTF-8'>
              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.basicInfo}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12 disabled'
                      id='dev_site_title'
                      name='dev_site[title]'
                      defaultValue={devSite.title}
                      label='Project title'
                      disabled={true}
                    />
                  </div>

                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12 m12 l6 disabled'
                      id='dev_site_devID'
                      name='dev_site[devID]'
                      defaultValue={devSite.devID}
                      label={i18n.propertyNumber}
                      disabled={true}
                      />

                    <SelectWithLabel
                      classes='col s12 m12 l6 disabled'
                      id='dev_site_build_type'
                      name='dev_site[build_type]'
                      label={i18n.buildingType}
                      defaultValue={devSite.build_type}
                      options={BUILDING_TYPES.map(a => [a,a])}
                      disabled={true}
                      />
                  </div>

                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12'
                      id='dev_site_short_description'
                      name='dev_site[short_description]'
                      defaultValue={devSite.short_description}
                      label={i18n.shortDescription}
                      error={error.devID}
                      />
                  </div>

                  <div className='row'>
                    <TextAreaWithLabel
                      classes='col s12'
                      id='dev_site_description'
                      name='dev_site[description]'
                      defaultValue={devSite.description}
                      label={i18n.description}
                      error={error.description}
                      />
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.primaryAddress}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12'
                      id='address_street'
                      name='dev_site[addresses_attributes][0][street]'
                      defaultValue={hasAddress ? devSite.addresses[0].street : ''}
                      label={i18n.street}
                      error={error['addresses.street']}
                      />
                  </div>

                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12 m12 l4'
                      id='address_city'
                      name='dev_site[addresses_attributes][0][city]'
                      defaultValue={hasAddress ? devSite.addresses[0].city : ''}
                      label={i18n.city}
                      />
                    <TextInputWithLabel
                      classes='col s12 m12 l4'
                      id='address_province_state'
                      name='dev_site[addresses_attributes][0][province_state]'
                      defaultValue={hasAddress ? devSite.addresses[0].province_state : 'ON'}
                      label={i18n.province}
                      />
                    <TextInputWithLabel
                      classes='col s12 m12 l4'
                      id='address_country'
                      name='dev_site[addresses_attributes][0][country]'
                      defaultValue={hasAddress ? devSite.addresses[0].country : 'Canada'}
                      label={i18n.country}
                      />
                  </div>

                  <div className="row">
                    <SelectWithLabel
                      classes='col s12 m12 l6 disabled'
                      id='dev_site_municipality'
                      name='dev_site[municipality_id]'
                      label={i18n.municipality}
                      value={municipalities[activeMunicipalityIndex].id}
                      onChange={this.handleChangeMunicipality}
                      options={municipalities.map(m => [m.id,m.name])}
                      disabled={true}
                      />

                    <SelectWithLabel
                      classes='col s12 m12 l6 disabled'
                      id='dev_site_ward_id'
                      name='dev_site[ward_id]'
                      label={i18n.ward}
                      defaultValue={devSite.ward_id}
                      options={municipalities[activeMunicipalityIndex].wards.map(w => [w.id, w.name])}
                      disabled={true}
                      />
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.attachments}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <div className='file-field input-field col s12'>
                      <label htmlFor='dev_site_files'>{i18n.files}</label>
                      <input multiple='multiple' type='file' name='dev_site[files][]' id='dev_site_files' />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='file-field input-field col s12'>
                      <label htmlFor='dev_site_images'>{i18n.images}</label>
                      <input multiple='multiple' type='file' name='dev_site[images][]' id='dev_site_images' />
                    </div>
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.links}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12'
                      id='dev_site_url_full_notice'
                      name='dev_site[url_full_notice]'
                      defaultValue={devSite.url_full_notice}
                      label={i18n.linkToFullNotice}
                      />
                  </div>
                </div>
              </div>

              <div className='row'>
                <input type='submit' value={i18n.save} className='btn submit' />
              </div>
            </form>
          </div>
        }
      </Dashboard>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const devSiteForm = document.querySelector('#dev-site-form');

  if (devSiteForm) {
    const applicationTypes = JSON.parse(devSiteForm.dataset.applicationTypes);
    const statusOptions = JSON.parse(devSiteForm.dataset.statuses);
    const notificationOptions = JSON.parse(devSiteForm.dataset.notificationOptions);
    const contactOptions = JSON.parse(devSiteForm.dataset.contactOptions);

    render(
      <DevSiteForm
        applicationTypes={ applicationTypes }
        statusOptions={ statusOptions }
        notificationOptions={ notificationOptions }
        contactOptions={ contactOptions }
      />, devSiteForm)
  }
})
