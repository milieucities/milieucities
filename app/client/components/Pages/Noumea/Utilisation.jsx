import React, { Component } from 'react'
import { render } from 'react-dom'
import MobileFooter from './MobileFooter'
import Header from './Header'
import Comments from '../../Comments/Comments'
import Loader from '../../Common/Loader/Loader'
import Sentiment from '../../Common/Sentiment/Sentiment'
import { debounce, uniqueId } from 'lodash'

export default class Utilisation extends Component {
  constructor() {
    super()
    this.state = { loading: true };
    this.devSiteId = document.querySelector('#utilisation').dataset.id;
    this.surveySentiment = document.querySelector('#utilisation').dataset.surveySentiment;
    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }

  render() {
    const { loading, isMobile } = this.state;

    return (
      <div className="container">
        { !isMobile &&
          <Header />
        }
        <center><h1>Guide d’utilisation</h1></center><br/>
        <center>
          <p>Participez à la municipalité ou dans votre maison de quartier à l'exposition sur</p>
          <p>l'aménagement de l'entrée nord. L'exposition a été conçue pour être interactive, vous</p>
          <p>pourrez y donner votre avis en dessinant directement sur une carte.</p>
        </center>
        { !isMobile &&
          <img
            src={require(`./images/utilisation-desktop.svg`)}
          />
        }
        <div className="row">
          { isMobile &&
          <img
            width="420px"
            src={require(`./images/utilisation-mobile.svg`)}
          />
        }

        </div>
          { isMobile &&
            <MobileFooter />
          }
    </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const noumea = document.querySelector('#utilisation');
  noumea && render(<Utilisation/>, noumea)
})
