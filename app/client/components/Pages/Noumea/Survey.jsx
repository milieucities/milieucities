import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './noumea.scss'
import _ from 'lodash'
import { RIETextArea } from 'riek'

export default class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	participantId: '',
    	questionSet: []
    };
    this.handleSubmit = () => this.handleSubmit();
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
    return (
      <form className="answerForm" onSubmit={this.handleSubmit}>
        <h4>How do you feel about bike paths in Noumea?</h4>
        <br /><br />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}


document.addEventListener('turbolinks:load', () => {
  const survey = document.querySelector('#survey');
  survey && render(<Survey />, survey)
})
