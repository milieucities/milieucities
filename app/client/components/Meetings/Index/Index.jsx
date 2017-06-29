import React, { Component } from 'react'
import { render } from 'react-dom'
import Collapse, { Panel } from 'rc-collapse'
import Edit from '../Edit/Edit'
import css from '../../Layout/Dashboard/dashboard.scss'
import i18n from '../../DevSites/Form/locale.js'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onAccordionChange = (key) => this._onAccordionChange(key);
    this.handleSave = (data) => this._handleSave(data);
    this.handleDelete = (data) => this._handleDelete(data);
  }

  _onAccordionChange(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    return(
      <Collapse
        accordion={true}
        activeKey={this.state.activeKey}
        onChange={this.onAccordionChange}>
      {
        this.props.meetings.map(meeting => (
          <Panel header={meeting.title} key={`meeting-${meeting.id}`}>
            <Edit
              { ...this.props }
              meeting={ meeting }
            />
          </Panel>
        ))
      }
      </Collapse>
    )
  }
}