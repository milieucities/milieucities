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

    return (
      <div className={css.checkoutwrap}>
        <ul className={css.checkoutbar}>
          <li className={lol} data-tip={commentHover}>
            <span>
              <ReactTooltip className={css.tooltip} place="top" type="light" effect="float"/>
              Comment Period
              </span>
          </li>
          <li>
            <span>
              Public Meeting
            </span>
          </li>
          <li>
            <span>
              Revision Changes
            </span>
          </li>
          <li>
            <span>
              Decision Meeting
            </span>
            </li>
            <li>
              <span>
                Decision Made
              </span>
            </li>
          </ul>
      </div>
    );
  }
}
