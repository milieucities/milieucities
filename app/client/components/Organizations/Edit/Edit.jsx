import React from 'react'
import TextInputWithLabel from '../../Common/FormFields/TextInputWithLabel'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../locale.js'


export const Edit = ({ organization, updateOrganization }) => (
  <div className={css.meta}>
    <div className={css.label}>
      {i18n.editOrganization}
    </div>
    <div className={css.data}>
      <form onSubmit={ updateOrganization } >
        <div className='row'>
          <TextInputWithLabel
            classes='col s12 m12 l12'
            id='organization_name'
            name='organization[name]'
            label={i18n.nameOfOrganization}
            defaultValue={organization.name}
          />
        </div>
        <div className='row'>
          <div className='col'>
            <button
              name='commit'
              type='submit'
              className='btn'>
              {i18n.save}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
)