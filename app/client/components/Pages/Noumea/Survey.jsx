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
    	comment: '',
      isMobile: (window.innerWidth < 600)
    };
    this.saveSurvey = () => this.saveSurvey();
    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  saveSurvey(answers) {
    return new Promise((resolve, reject) => {
      const data = {
        comment: {answers}
      };

      $.ajax({
        url: `/submit_survey`,
        dataType: 'JSON',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: (comment) => {
          console.log("You saved data", data)
          resolve(comment)
        },
        error: (error) => {
          console.log("There was an error: ", error)
          reject(error)
        }
      })
    })
  }

  handleSubmit(e) {
    this.props.saveSurvey({comment: comment});
    this.setState({
      comment: undefined
    })
  }

  handleChange(e) {
    this.setState({amount: e.target.value})
  }

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
             Nous proposons que les bâtiments à haute valeur patrimoniale ne soit pas utilisés durant la phase temporaire, durant laquelle ils subiront une expertise à des fins de restauration.
             A l’opposé, les autres bâtiments recevront  selon leur état des programmes adéquats .
          </p>
        </div>
        <div className="row">
          <div className={css.map}>
            { isMobile &&
              <img
                src={require(`./images/theme1-1.png`)}
                width="100%"
              />
            }
          </div>
        </div>
        <div className="row">
          <h3>Notez les differents programmes que nous proposons!</h3>
        </div>
      {/*  start of first survey  */}
      <form saveAnswers={this.saveAnswers}>
        <div className="row">
          <div className={css.forms}>
          <div className={css.question}>
            RDC espace public ouvert polyvalent (murs et cloisons retirés)
            Étages: espaces educatifs
            <EmojiiSlider />
          </div>
          </div>
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
          <input 
          type="text"
          rows="4" 
          cols="50" 
          placeholder="your comments" 
          value={this.state.comment} 
          onChange={this.handleChange} />
          <br /><br />
          <input className="button" value="submit" />
        </div>
      </form>
    </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const survey = document.querySelector('#survey');
  survey && render(<Survey />, survey)
})
