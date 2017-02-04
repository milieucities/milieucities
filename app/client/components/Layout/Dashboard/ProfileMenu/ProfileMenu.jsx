import React, { Component } from 'react'
import i18n from './locale'
import css from './profileMenu.scss'

export default class ProfileMenu extends Component {
  _generateLinks() {
    const { userName, userSlug, userRoles, locale } = document.body.dataset;

    const sections = [
      { title: 'dashboard', path: `/${locale}/users/${userSlug}` },
      { title: 'settings', path: `/${locale}/users/${userSlug}/edit` },
      { title: 'notification', path: `/${locale}/users/${userSlug}/notification/edit` },
      { title: 'manage_dev_site', path: `/${locale}/dev_sites/new`, validRole: 'admin'  },
      { title: 'organizations', path: `/${locale}/organizations`, validRole: 'admin' },
    ]

    return sections.map((section) => {
      const url = section.path
      const anchorText = i18n[section.title]
      const styles = this.props.active === section.title ? { fontWeight: 700 } : {}
      const restricted = section.validRole && !userRoles.split(',').includes(section.validRole)

      if (restricted) return false;

      return(
        <li style={styles} key={section.title}>
          <a href={section.path}>{anchorText}</a>
        </li>
      )
    })
  }

  render() {
    return(
      <div className={css.menu}>
        <ul>
          {this._generateLinks()}
        </ul>
      </div>
    )
  }
}
