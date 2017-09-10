import React, { Component } from 'react'
import css from './timeline.scss'
import ReactTooltip from 'react-tooltip'

export default class Timeline extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const statuses = {
      'Application Received': { position: 0},
      'Open': { position: 0},
      'Application Complete, Comment Period Open': { position: 1},
      'Review': { position: 2},
      'Planning Review Stage': { position: 2},
      'Revision': { position: 3},
      'Decision': { position: 4},
    }
    const status = statuses[this.props.devSite.status];
    const statusPosition = status ? status.position : 0;

    const lol = 2>=1 ? css.active : '';

    const commentHover = "Comment Period";
    const pubChanges = "Revision Changes";
    const pubMeeting = "Decision Meeting";
    const decision = "Decision Made";

    return (
      <div className={css.checkoutwrap}>
        <ul className={css.checkoutbar}>
          <li className={lol} data-tip={commentHover}>
            <span>
              <ReactTooltip className={css.tooltip} place="top" type="light" effect="float" />
              Comment Period
              </span>
              <decision />
          </li>
          <li data-tip data-for="meeting" >
            <span>
              <ReactTooltip
                className={css.tooltip}
                place="top"
                type="light"
                effect="float"
                id="meeting"
                delayHide={2000}>
                  <div className={css.scheduled}>
                    Scheduled Public Meeting
                  </div>
                  <div className="row">
                    Date:
                  </div>
                  <div className="row">
                    Time:
                  </div>
                  <div className="row">
                    Location:
                  </div>
                  <div className={css.link}>
                    <a href="https://www.w3schools.com">Visit W3Schools</a>
                  </div>
              </ReactTooltip>
              Public Meeting
            </span>
          </li >
          <li data-tip={pubChanges}>
            <span>
              <ReactTooltip className={css.tooltip} place="top" type="light" effect="float" />
              Revision Changes
            </span>
          </li>
          <li data-tip={pubMeeting}>
            <span>
              <ReactTooltip className={css.tooltip} place="top" type="light" effect="float"/>
              Decision Meeting
            </span>
            </li>
            <li data-tip={decision}>
              <span>
                <ReactTooltip className={css.tooltip} place="top" type="light" effect="float"/>
                Decision Made
              </span>
            </li>
          </ul>
      </div>
    );
  }
}
