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
              <h3 className={css.description}>{i18n.projectDescription}</h3>
              <div dangerouslySetInnerHTML={{__html: devSite.description }}></div>
              { devSite.url_full_notice &&
                <div>
                  <p><a href={devSite.url_full_notice} target='_blank'>{i18n.linkToPlanningPage}</a></p>
                </div>
              }
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
