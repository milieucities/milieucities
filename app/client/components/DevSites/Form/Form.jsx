import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from '../../Layout/Dashboard/Dashboard'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from './locale'
import { TextAreaWithLabel, TextInputWithLabel, SelectWithLabel } from '../../Common/FormFields/Form'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

const APPLICATION_TYPES = [
  'Site Plan Approval',
  'Condo Approval',
  'Subdivision Approval',
  'Zoning Amendment',
  'Registered Condominium',
  'Site Plan Control',
  'Official Plan Amendment',
  'Zoning By-law Amendment',
  'Demolition Control',
  'Cash-in-lieu of Parking',
  'Plan of Subdivision',
  'Plan of Condominium',
  'Derelict',
  'Vacant',
  'Master Plan'
]

const STATUSES = [
  'Application File Pending',
  'Application Reactivated',
  'Application Approved',
  'Community Information and Comment Session Open',
  'Application Approved by Committee',
  'Application Recommended to Council',
  'Draft Report sent to Councillor and Applicant for Response',
  'In Appeal Period',
  'Comment Period in Progress',
  'Community Information and Comment Session Held',
  'Comment Period has Ended/Issue Resolution',
  'Unknown'
]

const BUILDING_TYPES = [
  'Derelict',
  'Demolition',
  'Residential Apartment',
  'Low-rise Residential',
  'Mid-rise Residential',
  'Hi-rise Residential',
  'Mixed-use Residential/Community',
  'Commercial',
  'Commercial/Hotel',
  'Mixed-use',
  'Additions'
]

const MEETING_TYPES = [
  'Public',
  'Council'
]

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
    this.handleStatusDate = (date) => this._handleStatusDate(date);
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
      let statusDate = devSite.statuses.length > 0 ? moment(devSite.statuses[0].status_date) : null
      this.setState({ devSite, loadingDevSite: false, statusDate })
    });
  }

  _handleChangeMunicipality(e) {
    this.setState({ activeMunicipalityIndex: e.currentTarget.selectedIndex });
  }

  _handleStatusDate(date) {
    this.setState({ statusDate: date });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { locale } = document.body.dataset;
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
        Turbolinks.visit(`/${locale}/dev_sites/${devSite.id}`);
      },
      error: error => {
        window.flash('alert', 'Failed to save!')
        this.setState({ error: error.responseJSON })
      }
    });
  }

  render() {
    const { loadingMunicipalities, devSite, loadingDevSite, municipalities, activeMunicipalityIndex, statusDate, error } = this.state;
    const hasAddress = devSite.addresses && devSite.addresses.length > 0
    const hasStatus = devSite.statuses && devSite.statuses.length > 0
    i18n.setLanguage(document.body.dataset.locale);

    return(
      <Dashboard loading={loadingMunicipalities || loadingDevSite} activeComponent='manage_dev_site'>
        {
          !loadingMunicipalities && !loadingDevSite &&
          <div className={css.content}>
            <h2>{i18n.developmentSite}</h2>

            <form encType='multipart/form-data' id='new-form' onSubmit={this.handleSubmit} acceptCharset='UTF-8'>
              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.basicInfo}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12'
                      id='dev_site_title'
                      name='dev_site[title]'
                      defaultValue={devSite.title}
                      label='Project title'
                      error={error.title}
                    />
                  </div>

                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12'
                      id='dev_site_devID'
                      name='dev_site[devID]'
                      defaultValue={devSite.devID}
                      label={i18n.developmentId}
                      error={error.devID}
                      />
                  </div>

                  <div className='row'>
                    <SelectWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_building_type'
                      name='dev_site[building_type]'
                      label={i18n.buildingType}
                      defaultValue={devSite.building_type}
                      options={BUILDING_TYPES.map(a => [a,a])}
                      />

                    <SelectWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_application_type'
                      name='dev_site[application_types_attributes][0][name]'
                      label={i18n.applicationType}
                      defaultValue={devSite.application_type}
                      options={APPLICATION_TYPES.map(a => [a,a])}
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

                  <div className="row">
                    <SelectWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_municipality'
                      name='dev_site[municipality_id]'
                      label={i18n.municipality}
                      value={municipalities[activeMunicipalityIndex].id}
                      onChange={this.handleChangeMunicipality}
                      options={municipalities.map(m => [m.id,m.name])}
                      />

                    <SelectWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_ward_id'
                      name='dev_site[ward_id]'
                      label={i18n.ward}
                      defaultValue={devSite.ward_id}
                      options={municipalities[activeMunicipalityIndex].wards.map(w => [w.id, w.name])}
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
                      defaultValue={hasAddress ? devSite.addresses[0].province_state : ''}
                      label={i18n.province}
                      />
                    <TextInputWithLabel
                      classes='col s12 m12 l4'
                      id='address_country'
                      name='dev_site[addresses_attributes][0][country]'
                      defaultValue={hasAddress ? devSite.addresses[0].country : ''}
                      label={i18n.country}
                      />
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.statuses}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <SelectWithLabel
                      classes='col s12'
                      id='status_name'
                      name='dev_site[statuses_attributes][0][status]'
                      label={i18n.status}
                      defaultValue={hasStatus ? devSite.status[0].status : ''}
                      options={STATUSES.map(s => [s,s])}
                      />

                    <div className='input-field col s12'>
                      <label htmlFor='status_date'>{i18n.statusDate}</label>
                      <DatePicker selected={statusDate} dateFormat='MMMM DD, YYYY' name='dev_site[statuses_attributes][0][status_date]' onChange={this.handleStatusDate} />
                      {
                        this.state.error['statuses.status_date'] &&
                        <div className='error-message'>{this.state.error['statuses.status_date']}</div>
                      }
                    </div>

                    <div className="col">
                      <button className='btn' onClick={this.addStatusForm}>Add status</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.meetings}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <SelectWithLabel
                      classes='col s12'
                      id='meeting_type'
                      name='dev_site[meetings_attributes][0][meeting_type]'
                      label={i18n.meeting}
                      defaultValue={hasStatus ? devSite.status[0].status : ''}
                      options={MEETING_TYPES.map(s => [s,s])}
                      />

                    <div className='input-field col s12 m12 l6'>
                      <label htmlFor='meeting_date'>{i18n.meetingDate}</label>
                      <DatePicker selected={statusDate} dateFormat='MMMM DD, YYYY' name='dev_site[meetings_attributes][0][date]' onChange={this.handleMeetingDate} />
                      {
                        this.state.error['meetings.date'] &&
                        <div className='error-message'>{this.state.error['meetings.date']}</div>
                      }
                    </div>

                    <TextInputWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_urban_meeting_time'
                      name='dev_site[meetings_attributes][0][time]'
                      defaultValue={devSite.meeting_time}
                      label={i18n.meetingTime}
                      />

                    <TextInputWithLabel
                      classes='col s12'
                      id='dev_site_urban_meeting_title'
                      name='dev_site[meetings_attributes][0][title]'
                      defaultValue={devSite.meeting_title}
                      label={i18n.title}
                      />

                    <TextInputWithLabel
                      classes='col s12'
                      id='dev_site_urban_meeting_location'
                      name='dev_site[meetings_attributes][0][location]'
                      defaultValue={devSite.meeting_location}
                      label={i18n.location}
                      />

                    <div className="col">
                      <button className='btn' onClick={this.addMeetingForm}>Add meeting</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.urbanPlanner}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_urban_planner_name'
                      name='dev_site[urban_planner_name]'
                      defaultValue={devSite.urban_planner_name}
                      label={i18n.name}
                      />

                    <TextInputWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_urban_planner_email'
                      name='dev_site[urban_planner_email]'
                      defaultValue={devSite.urban_planner_email}
                      label={i18n.email}
                      />
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.wardCouncillor}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12'
                      id='dev_site_ward_councillor_email'
                      name='dev_site[ward_councillor_email]'
                      defaultValue={devSite.ward_councillor_email}
                      label={i18n.email}
                      />
                  </div>
                </div>
              </div>

              <div className={css.meta}>
                <div className={css.label}>
                  {i18n.applicant}
                </div>
                <div className={css.data}>
                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_applicant'
                      name='dev_site[applicant]'
                      defaultValue={devSite.applicant}
                      label={i18n.applicant}
                      />
                    <TextInputWithLabel
                      classes='col s12 m12 l6'
                      id='dev_site_on_behalf_of'
                      name='dev_site[on_behalf_of]'
                      defaultValue={devSite.on_behalf_of}
                      label={i18n.organization}
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
  devSiteForm && render(<DevSiteForm/>, devSiteForm)
})
