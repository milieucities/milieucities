import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './new.scss'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import ProfileHeader from '../../Common/ProfileHeader/ProfileHeader'
import ProfileMenu from '../../Common/ProfileMenu/ProfileMenu'
import Loader from '../../Common/Loader/Loader'
import { TextAreaWithLabel, TextInputWithLabel, SelectWithLabel } from '../../Common/FormFields/Form'
import i18n from './locale'
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

export default class DevSiteNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeMunicipalityIndex: 0,
      statusDate: moment(),
      error: {}
    };
    this.loadUser = () => this._loadUser();
    this.loadMunicipalities = () => this._loadMunicipalities();
    this.handleChangeMunicipality = (e) => this._handleChangeMunicipality(e);
    this.handleStatusDate = (date) => this._handleStatusDate(date);
    this.handleSubmit = (e) => this._handleSubmit(e);
    this.loadUser();
    this.loadMunicipalities();
  }

  _loadUser() {
    $.getJSON(`/users/${document.body.dataset.userSlug}`,
      user => this.setState({ user })
    );
  }

  _loadMunicipalities() {
    $.getJSON('/municipalities', municipalities => {
      this.setState({ municipalities, loading: false })
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

    $.ajax({
      url: `/dev_sites`,
      dataType: 'JSON',
      type: 'POST',
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: devSite => {
        this.setState({ devSite })
        window.flash('notice', 'Development Successfully Created!')
        Turbolinks.visit(`/${locale}/dev_sites/${devSite.id}`);
      },
      error: error => {
        window.flash('alert', 'Development Unsuccessfully Created!')
        this.setState({ error: error.responseJSON })
      }
    });
  }

  render() {
    const { user, loading, municipalities, activeMunicipalityIndex, statusDate, error } = this.state;
    const { userSlug, userAvatar, userName, locale } = document.body.dataset;
    i18n.setLanguage(locale);

    return(
      <div>
        <Header/>
        <ProfileHeader userName={userName} userAvatar={userAvatar} user={user} />
        <div className={css.container}>
          <div className='container'>
            <ProfileMenu active='manage_dev_site' />
            <Loader loading={loading} />
            {
              !loading &&
              <div className={css.content}>
                <h2>New Development Site</h2>
                <form encType='multipart/form-data' onSubmit={this.handleSubmit} acceptCharset='UTF-8'>
                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12 m6'
                      id='dev_site_devID'
                      name='dev_site[devID]'
                      label='Development Id'
                      error={error.devID}
                    />

                    <SelectWithLabel
                      classes='col s12 m6'
                      id='dev_site_application_type'
                      name='dev_site[application_type]'
                      label='Application Type'
                      options={APPLICATION_TYPES.map(a => [a,a])}
                    />
                  </div>

                  <div className='row'>
                    <SelectWithLabel
                      classes='col s12 m6'
                      id='dev_site_municipality'
                      name='dev_site[municipality_id]'
                      label='Municipality'
                      value={municipalities[activeMunicipalityIndex].id}
                      onChange={this.handleChangeMunicipality}
                      options={municipalities.map(m => [m.id,m.name])}
                    />

                    <SelectWithLabel
                      classes='col s12 m6'
                      id='dev_site_ward_id'
                      name='dev_site[ward_id]'
                      label='Ward'
                      options={municipalities[activeMunicipalityIndex].wards.map(w => [w.id, w.name])}
                    />
                  </div>

                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12'
                      id='address_street'
                      name='dev_site[addresses_attributes][0][street]'
                      label='Street'
                      error={error.devID}
                    />
                  </div>

                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12 m4'
                      id='address_city'
                      name='dev_site[addresses_attributes][0][city]'
                      label='City'
                    />
                    <TextInputWithLabel
                      classes='col s12 m4'
                      id='address_province_state'
                      name='dev_site[addresses_attributes][0][province_state]'
                      label='Province'
                    />
                    <TextInputWithLabel
                      classes='col s12 m4'
                      id='address_country'
                      name='dev_site[addresses_attributes][0][country]'
                      label='Country'
                    />
                  </div>

                  <div className='row'>
                    <SelectWithLabel
                      classes='col s12 m6'
                      id='status_name'
                      name='dev_site[statuses_attributes][0][status]'
                      label='Status'
                      options={STATUSES.map(s => [s,s])}
                    />

                    <div className='input-field col s12 m6'>
                      <label htmlFor='status_date'>Status Date</label>
                      <DatePicker selected={statusDate} dateFormat='MMMM DD, YYYY' name='dev_site[statuses_attributes][0][status_date]' onChange={this.handleStatusDate} />
                    </div>
                  </div>

                  <div className='row'>
                    <TextInputWithLabel
                      classes='col s12 m6'
                      id='dev_site_urban_planner_email'
                      name='dev_site[urban_planner_email]'
                      label='Urban Planner Email'
                    />

                    <TextInputWithLabel
                      classes='col s12 m6'
                      id='dev_site_ward_councillor_email'
                      name='dev_site[ward_councillor_email]'
                      label='Ward Councillor Email'
                    />
                  </div>

                  <div className='row'>
                    <TextAreaWithLabel
                      classes='col s12'
                      id='dev_site_description'
                      name='dev_site[description]'
                      label='Description'
                      error={error.description}
                    />
                  </div>

                  <div className='row'>
                    <div className='file-field input-field col s12'>
                      <label htmlFor='dev_site_files'>Files</label>
                      <input multiple='multiple' type='file' name='dev_site[files][]' id='dev_site_files' />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='file-field input-field col s12'>
                      <label htmlFor='dev_site_images'>Images</label>
                      <input multiple='multiple' type='file' name='dev_site[images][]' id='dev_site_images' />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='file-field input-field col s12'>
                      <input type='submit' name='commit' value='Save' className='btn submit' />
                    </div>
                  </div>
                </form>
              </div>
            }
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const devSiteNew = document.querySelector('#dev-site-new');
  devSiteNew && render(<DevSiteNew/>, devSiteNew)
})
