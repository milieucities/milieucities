import React, { Component } from 'react'
import i18n from './locale'
import css from './profileMenu.scss'

export default class ProfileMenu extends Component {
  _generateLinks() {
    const locale = document.body.dataset.locale
    const userSlug = document.body.dataset.userSlug
    const url = `/${locale}/users/${userSlug}`

    const sections = [
      { title: 'dashboard', path: url },
      { title: 'settings', path: `${url}/edit` },
      { title: 'notification', path: `${url}/notification/edit` },
      { title: 'manage_dev_site', path: '/dev_sites/new' }
    ]

    return sections.map((section) => {
      const anchorText = i18n[section.title]
      const styles = this.props.active === section.title ? {fontWeight: 'bold'} : {}

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
