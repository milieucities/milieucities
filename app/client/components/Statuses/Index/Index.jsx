import React, { Component } from 'react'
import { render } from 'react-dom'
import Collapse, { Panel } from 'rc-collapse'
import StatusForms from './StatusForms'
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
        className={css.collapse}
        accordion={true}
        activeKey={this.state.activeKey}
        onChange={this.onAccordionChange}>
      {
        this.props.statuses.map(status => (
          <Panel header={status.status} key={`status-${status.id}`}>
            <StatusForms { ...this.props } status={status} />
          </Panel>
        ))
      }
      </Collapse>
    )
  }
}