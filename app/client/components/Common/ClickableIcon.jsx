import React from 'react'

export const ClickableIcon = ({ iconName, classes, clickHandler, url }) => (
  <a href={ url } onClick={ clickHandler } className={`btn icon ${classes}`}>
    <i className={`fa fa-${iconName}`}></i>
  </a>
)

