import React from 'react'
import css from './show.scss'
import i18n from './locale'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const DevSiteTabs = ({ devSite }) => (
  <div className='row'>
    <div className='col m12 s12'>
      <div className={css.tabs}>
          <Tabs>
            <TabList>
              <Tab>{i18n.description}</Tab>
              <Tab>{i18n.attachments}</Tab>
              <Tab>{i18n.notices}</Tab>
            </TabList>

            <TabPanel>

              <div>
                <h3 className={css.description}>{i18n.projectDescription}</h3>
                <p>{devSite.description}</p>
              </div>
              <div>
                {
                  devSite.contacts.map((contacts,i) => {
                    return(
                      <div key={i}>
                        <h3 className={css.description}>{i18n.fileContact} {contacts.contact_type}:</h3>
                        <p>{i18n.name}: {contacts.first_name} {contacts.last_name}</p>
                        <p>{i18n.email}: <a href={"mailto:" + contacts.email_address + "?subject=" + devSite.address} target="_top">{contacts.email_address}</a></p>
                        </div>
                    )
                  })
                }</div>

            </TabPanel>
            <TabPanel>
              <h3 className={css.description}>{i18n.attachments}</h3>
              {
                devSite.city_files.map((file, i) => {
                  return(
                    <div key={i}>
                      <a href={file.link} target='_blank' className={css.filelink}>{file.name}</a>
                    </div>
                  )
                })
              }
              {
                devSite.files.map((file, i) => {
                  return(
                    <div key={i}>
                      <a href={file.url} target='_blank' className={css.filelink}>{file.name}</a>
                    </div>
                  )
                })
              }
            </TabPanel>
            <TabPanel>
              <h3 className={css.description}>{i18n.notices}</h3>
              {
                devSite.statuses &&
                devSite.statuses.map((status, i) => {
                  if (status.notification && status.notification.filesuploader) {
                    return(
                      <div key={i}>
                        <a href={status.notification.filesuploader.url} target='_blank' className={css.filelink}>{status.notification.filesuploader.name}</a>
                      </div>
                    )
                  }
                })
              }
            </TabPanel>
          </Tabs>
        </div>
     </div>
  </div>
)

export default DevSiteTabs;
