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
import { surveys } from './surveys'

import NoumeaShareButtons from './NoumeaShareButtons'

export default class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {
      participantId: '',
      questionSet: [],
      isMobile: (window.innerWidth < 600),
      answers: [],
      noumeaCitizen: false,
      howLong: '',
      email: '',
      age: 0,
      area: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmojiiClick = this.handleEmojiiClick.bind(this);
    this.handleCitizen = this.handleCitizen.bind(this);
    this.handleHideCitizen = this.handleHideCitizen.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleArea = this.handleArea.bind(this);
    this.handleHowLong = this.handleHowLong.bind(this);
    this.handleEmail = this.handleEmail.bind(this)
    this.handleSubmitCitizen = this.handleSubmitCitizen.bind(this);

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
    $.ajax({
      url: "/participez/submit_survey",
      contentType: "application/json",
      type: 'POST',
      data: JSON.stringify(data),
      success: (data) => {
        this.setState({ data: data });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  handleSubmitCitizen() {
    const { age, noumeaCitizen, email, area, howLong } = this.state
    const citizenData = {
      age: age,
      noumeaCitizen: noumeaCitizen,
      email: email,
      area: area,
      howLong: howLong
    };
    console.log("citizenData", citizenData)
    $.ajax({
      url: "/participez/submit_participant",
      contentType: "application/json",
      type: 'POST',
      data: JSON.stringify({noumea_participant: citizenData}), // rails format
      success: (citizenData) => {
        this.setState({ data: citizenData});
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  handleAge(e) {
    let ageVar = e.target.value;
    this.setState({
      age: ageVar
    });
  }

  handleArea(e) {
    let area = e.target.value;
    this.setState({
      area: 'area'
    })
  }

  handleHowLong(e) {
    let howLong = e.target.value;
    this.setState({
      howLong: howLong
    })
  }

  handleEmail(e) {
    let email = e.target.value;
    this.setState({
      email: email
    })
  }

  handleCitizen() {
    this.setState({
      noumeaCitizen: true
    })
  }

  handleHideCitizen() {
    this.setState({
      noumeaCitizen: false
    })
  }

  render() {
    const { isMobile, noumeaCitizen } = this.state;
    return (
      <div className="container">
        { !isMobile &&
          <Header />
        }
        <NoumeaShareButtons isMobile={isMobile} />

        {
          surveys.map((survey, index) => {
            return (
              <div>
                <SurveyTitleMap
                  description={survey.description}
                  map={survey.map}
                  title={survey.title}
                  notes={survey.note}
                />
                <div className={css.forms}>

                  {survey.questions.map((question, index) => {
                    let image
                    if (true) { // or use question.image from ./surveys.js
                      image = (
                        <img
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
                          <p>{question.text}</p>
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
        <div className="row">
          <center><h2>Information dèmographique</h2></center>
          <div className="row">
            <label htmlFor="age">Age</label>
            <input id="age" placeholder="0" type="text" onChange={this.handleAge}/>
          </div>
          <div className="row">
            <center><h3>Vivez vous à Noumeà</h3></center><br/>
            <center>
              <input type="button" name="noumeaCitizen" value="yes" className="btn" onClick={this.handleCitizen} />
              <input type="button" name="noumeaCitizen" value="no" className="btn" onClick={this.handleHideCitizen} />
            </center>
          </div>
          { noumeaCitizen &&
            <div className="row">
              <div className="ifyes">
                <label htmlFor="area">Votre Quartier</label>
                <input id="area" type="text" onChange={this.handleArea}/>
                <div className="row">
                  <label htmlFor="howlong">
                    Cela fait combien de temps que vous vivez dans votre quartier?
                  </label>
                  <input id="howlong" type="text" onChange={this.handleHowLong}/>
                </div>
              </div>
            </div>
          }
          <div className="row">
            <label htmlFor="email">Votre Email</label>
            <input id="email" placeholder="example@gmail.com" type="text" onChange={this.handleEmail} />
          </div>
          <div className="row">
            <center>
              <input
                 type="submit"
                 value="soumetrre"
                 className="btn"
                 onClick={this.handleSubmitCitizen}
                 />
            </center>
          </div>
        </div>

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
