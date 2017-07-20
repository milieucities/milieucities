import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './noumea.scss'
import QuestionSlider from './QuestionSlider'
import _ from 'lodash'
import { RIETextArea } from 'riek'

export default class SurveyForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	participantId: '',
    	questionSet: []
    };

    var SubmitBox = React.createClass({
    	onSubmit: function(answers) {
        e.preventDefault();

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
    	},
      getInitialState: function() {
        return {data: []};
      },
      render: function() {
        return (
          <div className="submitBox">
            <AnswerForm onAnswerSubmit={this.onSubmit} />
          </div>
        );
      }
    });

    var AnswerForm = React.createClass({
      getInitialState: function() {
        return {
          participant: ""
        };
      },

      handleSubmit: function(e) {
      	
      	this.props.onAnswerSubmit({participant: participant, amount: amount});
      	this.setState({
      		participant: "",
      		amount: undefined
      	})
    	},

    	setParticipant: function(e) {
    		this.setState({
    			participant: Math.random()
    		})
    	},
    	render: function() {
        return (
          <form className="answerForm" onSubmit={this.handleSubmit}>
            <h4>How do you feel about bike paths in Noumea?</h4>
            <QuestionSlider	/>
            <br /><br />
          
            <input type="submit" value="Submit" />
          </form>
        );
      }
    });


document.addEventListener('turbolinks:load', () => {
  const participez = document.querySelector('#participez');
  participez && render(<SurveyForm />, participez)
})

// //This is where it all begins
// ReactDOM.render(
//   <SubmitBox url="/donations.json" />,
//   document.getElementById('content')
// );

