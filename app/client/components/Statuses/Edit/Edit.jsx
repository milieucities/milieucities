import React from 'react'
import TextInputWithLabel from '../../Common/FormFields/TextInputWithLabel'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../../DevSites/Form/locale.js'


export const Edit = ({ startDate, endDate, handleStartDate, handleEndDate, error }) => (
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
        options={statuses.map(s => [s,s])}
        />

      <div className='input-field col s12 m12 l6'>
        <label htmlFor='start_date'>{i18n.startDate}</label>
        <DatePicker selected={startDate} dateFormat='MMMM DD, YYYY' name='dev_site[statuses_attributes][0][start_date]' onChange={handleStartDate} />
        {
          error['statuses.start_date'] &&
          <div className='error-message'>{error['statuses.start_date']}</div>
        }
      </div>

      <div className='input-field col s12 m12 l6'>
        <label htmlFor='end_date'>{i18n.endDate}</label>
        <DatePicker selected={endDate} dateFormat='MMMM DD, YYYY' name='dev_site[statuses_attributes][0][end_date]' onChange={this.handleEndDate} />
        {
          error['statuses.end_date'] &&
          <div className='error-message'>{error['statuses.start_date']}</div>
        }
      </div>
    </div>
  </div>
</div>
)

