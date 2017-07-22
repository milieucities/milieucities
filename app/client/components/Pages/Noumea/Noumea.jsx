import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './css/noumea.scss'
import { debounce, uniqueId } from 'lodash'

export default class Noumea extends Component {
  constructor() {
    super()
    this.state = { loading: true, isMobile: (window.innerWidth < 600) };
    this.devSiteId = document.querySelector('#noumea').dataset.id;
    this.surveySentiment = document.querySelector('#noumea').dataset.surveySentiment;
    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div className={css.container}>

        <div className= {css.logoContainer}>
            <img
              src={require(`./images/logo-noumea-m.jpg`)}
            />
            <img
              src={require(`./images/logo-provincesud.jpg`)}
            />
            <img
              src={require(`./images/logo-nc.png`)}
            />
      </div>

      <div className={css.titleContainer}>
        <div className={css.description}>
            <h1>ENTRÉE NORD</h1>
  <p>Un projet collaboratif de concertation citoyenne pour la nouvelle entrée nord du centre-ville de Nouméa</p>
        </div>

  <div className={css.videoContainer}>
    <iframe src="https://www.youtube.com/embed/cBkWhkAZ9ds?rel=0&amp;showinfo=0" allowfullscreen></iframe>
  </div>
      </div>


      <div className={css.visionContainer}>
      <h2>VISION POUR L'ENTRÉE NORD</h2>
      <h3>Proposition de scénario d'aménagement</h3>
      <p>
        L’entrée nord du centre ville de Nouméa est une zone caractérisée par l'ancien Centre Hospitalier Territorial Gaston-Bourret, son parking et la voie express #1. C’est actuellement un no man’s land, coupé du littoral et du centre ville pourtant si proches, qui marque la baie de la Grande Rade d'un aspect désertique, vide et fantôme... Une baie jusque là délaissée, alors que son panorama est la première image de Nouméa que perçoivent la plupart des visiteurs. Une baie ignorée alors qu’elle est adjacente à deux sources majeurs de l’économie néo-caledonienne: la Société Le Nickel et le Port Autonome de la Nouvelle Calédonie.
      </p>
      <p>
        Et si cela changeait? Quel serait l'impact sur l'entrée nord et ses environs immédiats? Sur Nouméa et ses habitants? Enfin, sur  la Nouvelle-Calédonie?
      </p>
      <p>
      Nous proposons de developper une vision partagée pour l’entrée nord en tant que passerelle autant physique que symbolique: reliant le coeur de ville à la mer, les croisiéristes et touristes à la culture néo-calédonienne, et les populations nouméennes entre elles.
      </p>
      <p>
        Ces efforts seront menés par l’architecte urbaniste Aziza Chaouni, accompagnée de la SCET et de toutes les parties prenantes concernées par le projet.
      </p>
    </div>

<div className={css.themeContainer}>

  <p>4 thematiques</p>

</div>

<div className="timeline-container">
  <h1>À propos du projet de concertation citoyenne</h1>
    <img
      src={require(`./images/timeline.svg`)}
    />

  <p>
    Votre participation peut influencer les futurs aménagements de votre ville, et en l'occurence la vision urbaine de l'entrée nord. La période de concertation grâce à ce site web se déroulera du 24 Juillet à fin Octobre.
  </p>

  <p>
    L'engagement civique est crucial. Vous pouvez donner votre avis sur l'avenir de votre ville durant des consultations publiques ou bien en utilisant ce site web initié par la municipalité de Nouméa.
  </p>

  <p>
    Le calendrier de l'exposition sera bientôt affiché. Vous pourrez y laisser votre avis, qui sera immédiatement transmis au site web.
  </p>
</div>


<div className={css.partnersContainer} >

  <h2>les partenaires</h2>
    <img
      src={require(`./images/logo-acp.svg`)}
    />
    <img
      src={require(`./images/logo-scet.png`)}

    />
    <img
      src={require(`./images/logo-milieu.png`)}

    />
</div>


  </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const noumea = document.querySelector('#noumea');
  noumea && render(<Noumea/>, noumea)
})
