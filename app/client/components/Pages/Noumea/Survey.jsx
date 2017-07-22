import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/survey.scss'
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
        this.setState({ isMobile: (window.innerWidth < 600) })
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
          <div className="col-xs-3 col-md-4 icons">
            { isMobile &&
              <img
                src={require(`./images/theme-immediat.svg`)}
                width="35px"
                height="35px"
             />
            }
          </div>
        </div>
        <div className="row">
          <h2>1.1. Usage temporaire de l'ancien complexe Gaston-Bourret</h2>
        </div>
        <div className="row">
          <p className={css.description}>L’ancien site de l’hôpital Gaston-Bourret est composé de 26 bâtiments,
             dont trois sont voués à la démolition, et un, en préfabriqué, au démantèlement.
             Nous proposons que les bâtiments à haute valeur patrimoniale ne soit pas utilisés durant la phase temporaire,
             durant laquelle ils subiront une expertise à des fins de restauration.
             A l’opposé, les autres bâtiments recevront  selon leur état des programmes adéquats .
          </p>
        </div>
          <div className="row">
            <div className={css.map}>
              { isMobile &&
                <img
                  src={require(`./images/theme1-1.png`)}
                  width="100%"
                  height="240px"
               />
              }
            </div>
        </div>
        <div className="row">
          <div className={css.notes}>
            <h4>Notez les differents programmes que nous proposons!</h4>
          </div>
        </div>
      {/*  start of first survey  */}
        <div className={css.forms}>
          <div className={css.question}>
            RDC espace public ouvert polyvalent (murs et cloisons retirés)
            Étages: espaces educatifs
            <EmojiiSlider />
          </div>
        <div className="row">
          <div className={css.question}>
            Bureaux co-working
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.question}>
            Commerces
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.question}>
            Espace à usage pluriel
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.question}>
            Friche artistique-studios
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.question}>
            Espace recherche scientifique
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.question}>
            Café
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.question}>
            Bureaux
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.question}>
            Espaces verts et jardins potagers
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.question}>
            Bâtiments fermés au public pour réhabilitation
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.question}>
            Maison du projet (accueil/ exposition)
            <EmojiiSlider />
          </div>
        </div>
        <div className="row">
          <div className={css.comments}>
            <textarea rows="4" cols="50" placeholder="your comments" />
              <center>
                <button name='submit' type='submit' className='btn'>la prochaine question</button>
              </center>
          </div>
        </div>
      </div>
      {/*  <form className="answerForm" onSubmit={this.handleSubmit}>
        //   <h4>How do you feel about bike paths in Noumea?</h4>
        //   <br /><br />
        //
        //   <input type="submit" value="Submit" />
          </form>*/}
  </div>
    );
  }
}


document.addEventListener('turbolinks:load', () => {
  const survey = document.querySelector('#survey');
  survey && render(<Survey />, survey)
})
