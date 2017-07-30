import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/survey.scss'
import _ from 'lodash'
import { RIETextArea } from 'riek'
import EmojiiSlider from './EmojiiSlider'
import { debounce } from 'lodash'
import SurveyTitleMap from './SurveyTitleMap'
import MobileFooter from './MobileFooter'
import AnswerForm from './AnswerForm'
import Header from './Header'

import NoumeaShareButtons from './NoumeaShareButtons'

export default class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {
      participantId: '',
      questionSet: [],
      isMobile: (window.innerWidth < 600),
      answers: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmojiiClick = this.handleEmojiiClick.bind(this);
    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }

  handleEmojiiClick(value, surveyId, questionId) {
    // store in state
    let answers = this.state.answers
    // check if there's a previous answer
    const previousAnswerIndex = answers.findIndex((answer) => {
      return answer.surveyId === surveyId && answer.questionId === questionId
    })
    // remove previous answer
    if (previousAnswerIndex > -1) {
      answers.splice(previousAnswerIndex, 1)
    }
    // add answer to array
    answers.push({
      surveyId: surveyId,
      questionId: questionId,
      value: value
    })

    this.setState({answers: answers})
  }

  handleSubmit(comment, surveyId) {
    // filter out only answers for that survey
    const answers = this.state.answers.filter((answer) => {
      return answer.surveyId === surveyId
    })
    // format for rails endpoint
    const data =  {
      noumea_response: {
        surveyId: surveyId,
        comment: comment,
        answers: answers
      }
    }
    console.log("handleSubmit data", data)
    $.ajax({
      url: "/participez/submit_survey",
      contentType: "application/json",
      type: 'POST',
      data: JSON.stringify(data),
      success: (data) => {
        this.setState({data: data});
        console.log("Added data", data)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  render() {
    const { isMobile } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            { !isMobile &&
              <Header />
            }
            <NoumeaShareButtons isMobile={isMobile} />
          </div>
          <div className="col-md-4"></div>
          
        </div>
      
        {
          surveys.map((survey, index) => {
            return (
              <div className="row">
                <SurveyTitleMap
                  description={survey.description}
                  map={survey.map}
                  title={survey.title}
                  notes={survey.note}
                />
                <div className={css.forms}>

                  {survey.questions.map((question, index) => {
                    let image
                    if (question.image) { // or use question.image from ./surveys.js
                      image = (
                        <img className=""
                          src={require(`./images/q${survey.id}-${question.id}.svg`)}
                          />
                      )
                    } else {
                      image = (
                        <div className={css.colorCircle}>
                          <div className={css.circle} style={{ background: 'orange' }} >

                          </div>
                        </div>
                      )
                    }
                    return (
                      <div className="row">
                        <div className={css.question}>
                          {image}
                          {question.text}
                          <EmojiiSlider emojiiClick={this.handleEmojiiClick} questionId={question.id} surveyId={survey.id} />
                        </div>
                      </div>
                    )
                  })}
                  <div className="row">
                    <div className={css.comments}>
                      <AnswerForm onSubmit={this.handleSubmit} surveyId={survey.id} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
        { isMobile &&
          <MobileFooter  />
        }
      </div>
    );
  }
}


document.addEventListener('turbolinks:load', () => {
  const survey = document.querySelector('#survey');
  survey && render(<Survey />, survey)
})
