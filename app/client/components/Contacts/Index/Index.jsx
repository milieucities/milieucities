import React, { Component } from 'react'
import { render } from 'react-dom'
import Collapse, { Panel } from 'rc-collapse'
import Edit from '../Edit/Edit'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../locale.js'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onAccordionChange = (key) => this._onAccordionChange(key);
  }

  _onAccordionChange(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    return(
      <Collapse
        className={css.collapse}
        accordion={true}
        activeKey={this.state.activeKey}
        onChange={this.onAccordionChange}>
      {
        this.props.contacts.map(contact => (
          <Panel header={`${contact.contact_type}, ${contact.first_name} ${contact.last_name}`} key={`contact-${contact.id}`}>
            <Edit
              { ...this.props }
              contact={ contact }
            />
          </Panel>
        ))
      }
      </Collapse>
    )
  }
}