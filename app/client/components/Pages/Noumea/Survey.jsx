import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/noumea.scss'
import _ from 'lodash'
import { RIETextArea } from 'riek'
import EmojiiSlider from './EmojiiSlider'
import { debounce } from 'lodash'

export default class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	participantId: '',
    	questionSet: [],
      isMobile: (window.innerWidth < 600)
    };
    this.handleSubmit = () => this.handleSubmit();
    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 992) })
      }, 100)
    );
  }

  handleSubmit() {
    preventDefault(e);
    $.ajax({
      url: this.props.url,
      dataType: 'JSON',
      type: 'POST',
      data: answers,
      success: function(data) {
        this.setState({data: data});
        console.log("Added data", data)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  // render: function() {   I put this to comment you may want to reuse it
  //           return (   I was not sure why was this used
  //             <div className="submitBox">      if you want to render just something mall do it like
  //               <AnswerForm onAnswerSubmit={this.onSubmit} /> outside of the component function AnswerForm() { return <aligator/>; }
  //             </div>
  //           );
  //         }
  //       });
  //
  //       const AnswerForm = React.createClass({
  //         getInitialState: function() {
  //           return {
  //             participant: ""
  //           };
  //         },
  //
  //         handleSubmit: function(e) {
  //
  //           this.props.onAnswerSubmit({participant: participant, amount: amount});
  //           this.setState({
  //             participant: "",
  //             amount: undefined
  //           })
  //         },
  //
  //         setParticipant: function(e) {
  //           this.setState({
  //             participant: Math.random()
  //           })
  //         },

  render() {
    const { isMobile } = this.state;
    return (
      <div className="container">
        <div className="row">
          <h2>1.1. Usage temporaire de l'ancien complexe Gaston-Bourret</h2>
        </div>
        <div className="row">
          <div className="col-xs-3">
            icons
          </div>
          <div className="col-sm-4">
            <div className="row">
              { isMobile &&
                <img src={require(`./images/theme1-1.png`)}/>
              }
              map
            </div>
          </div>
        </div>
        <EmojiiSlider />
        <form className="answerForm" onSubmit={this.handleSubmit}>
          <h4>How do you feel about bike paths in Noumea?</h4>
          <br /><br />

          <input type="submit" value="Submit" />
        </form>
    </div>
    );
  }
}


document.addEventListener('turbolinks:load', () => {
  const survey = document.querySelector('#survey');
  survey && render(<Survey />, survey)
})
