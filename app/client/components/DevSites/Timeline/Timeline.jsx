import React, { Component } from 'react'
import css from './timeline.scss'
import ReactTooltip from 'react-tooltip'

export default class Timeline extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const statuses = {
    //   'Application Received': { position: 0},
    //   'Open': { position: 0},
    //   'Application Complete, Comment Period Open': { position: 1},
    //   'Review': { position: 2},
    //   'Planning Review Stage': { position: 2},
    //   'Revision': { position: 3},
    //   'Decision': { position: 4},
    // }

    const devSiteStatus = this.props.devSite.status;

    let firstPoint = '';
    let secondPoint = '';
    let thirdPoint = '';
    let fourthPoint = '';
    let fifthPoint = '';


    switch (devSiteStatus) {
      case 'Open':
        firstPoint = css.active;
        break;
      case 'Application Complete, Comment Period Open':
        firstPoint = css.visited;
        secondPoint = css.active;
        break;
      case 'Review':
        firstPoint = css.visited;
        secondPoint = css.visited;
        thirdPoint = css.active;
        break;
      case 'Planning Review Stage':
        firstPoint = css.visited;
        secondPoint = css.visited;
        thirdPoint = css.visited;
        fourthPoint = css.active;
        break;
      case 'Revision':
        firstPoint = css.visited;
        secondPoint = css.visited;
        thirdPoint = css.visited;
        fourthPoint = css.visited;
        fifthPoint = css.active;
    }

    const commentHover = "Comment Period";
    const pubChanges = "Revision Changes";
    const pubMeeting = "Decision Meeting";
    const decision = "Decision Made";

    return (
      <div className={css.checkoutwrap}>
        <ul className={css.checkoutbar}>
          <li className={firstPoint} data-tip={commentHover}>
            <span>
              <ReactTooltip className={css.tooltip} place="top" type="light" effect="float" />
              Comment Period
              </span>
              <decision />
          </li>
          <li className={secondPoint} data-tip data-for="meeting" >
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
          <li className={thirdPoint} data-tip={pubChanges}>
            <span>
              <ReactTooltip className={css.tooltip} place="top" type="light" effect="float" />
              Revision Changes
            </span>
          </li>
          <li className={fourthPoint} data-tip={pubMeeting}>
            <span>
              <ReactTooltip className={css.tooltip} place="top" type="light" effect="float"/>
              Decision Meeting
            </span>
            </li>
            <li className={fifthPoint} data-tip={decision}>
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
