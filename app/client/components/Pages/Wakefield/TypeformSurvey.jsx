import React, { Component } from 'react'
import { render } from 'react-dom'

export default class TypeformSurvey extends Component {

  componentDidMount() {
    (function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'widget.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}})()
  }

  render() {
    return(
      <div className="typeform-widget" data-url="https://milieu.typeform.com/to/HHlHgX" data-text="Wakefield Spring Survey" style={{width: '100%', height: 'auto'}}>
      </div>
    )
  }
}