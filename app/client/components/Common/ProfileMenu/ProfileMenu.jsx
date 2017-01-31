import React, { Component } from 'react'
import i18n from './locale'
import css from './profileMenu.scss'

export default class ProfileMenu extends Component {
  _generateLinks() {
    const locale = document.body.dataset.locale
    const userSlug = document.body.dataset.userSlug
    const userRole = document.body.dataset.userRole

    const sections = [
      { title: 'dashboard', path: `/${locale}/users/${userSlug}` },
      { title: 'settings', path: `/${locale}/users/${userSlug}/edit` },
      { title: 'notification', path: `/${locale}/users/${userSlug}/notification/edit` },
      { title: 'manage_dev_site', path: `/${locale}/dev_sites/new` },
      { title: 'organizations', path: `/${locale}/organizations`, admin: true },
    ]

    return sections.map((section) => {
      const url = section.path
      const anchorText = i18n[section.title]
      const styles = this.props.active === section.title ? {fontWeight: 'bold'} : {}
      const restricted = section.admin && this.props.user && section.admin !== this.props.user.admin

      if (restricted) {
        return ''
      }

      return(
        <li style={styles} key={section.title}>
          <a href={section.path}>{anchorText}</a>
        </li>
      )
    })
  }

  render() {
    const locale = document.body.dataset.locale
    i18n.setLanguage(locale);
    const children = this._generateLinks()
    return(
      <div className={css.menu}>
        <ul>
          {children}
        </ul>
      </div>
    )
  }
}
