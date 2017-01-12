import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './home.scss'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import DevSite from '../../DevSites/Show/Show'
import Autocomplete from '../../Utility/Autocomplete/Autocomplete'
import Carousel from '../../Utility/Carousel/Carousel'
import { debounce } from 'lodash'
import i18n from './locale'

export default class Home extends Component {
  constructor() {
    super()
    this.state = { isMobile: (window.innerWidth < 600) }
    this.autocompleteCallback = (address, autocomplete) => this._autocompleteCallback(address, autocomplete)
    this.handleAutocompleteSelect = (address) => this._handleAutocompleteSelect(address)
    this.openModal = () => this._openModal();

    window.addEventListener('resize',
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) })
      }, 100)
    );
  }
  _openModal() {
    document.querySelector('#sign-in-modal .modal-content').focus();
  }
  _autocompleteCallback(address, autocomplete) {
    const googleLocationAutocomplete = new google.maps.places.AutocompleteService()
    const request = { input: address, types: ['address'], componentRestrictions: {country: 'ca'} }
    googleLocationAutocomplete.getPlacePredictions(request, (predictions) => {
      const suggestions = predictions ? predictions.map(function(prediction){ return prediction.description }) : []
      autocomplete.setState({ suggestions })
    })
  }
  _handleAutocompleteSelect(address) {
    const { locale } = document.body.dataset;
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({'address': address}, (result) => {
      if(result.length > 0){
        const [latitude, longitude] = [result[0].geometry.location.lat(), result[0].geometry.location.lng()]
        Turbolinks.visit(`/${locale}/dev_sites?latitude=${latitude}&longitude=${longitude}`);
      } else {
        Turbolinks.visit(`/${locale}/dev_sites`);
      }
    })
  }
  render() {
    const { isMobile } = this.state;
    const { locale, signedIn } = document.body.dataset;
    i18n.setLanguage(locale);

    return (
      <div>
        <Header />
        <div className={css.landingContainer}>
          <div>
            <h1>Milieu</h1>
            <h3>{i18n.heroText1}</h3>
            {
              signedIn == 'false' &&
              <div className={css.signUpContainer}>
                <a href={`/${locale}/users/new`} className={css.signUpButton}>{i18n.signUp}</a>
                {i18n.haveAccount} <a href='#sign-in-modal' className='modal-trigger' style={{marginLeft: 10}} onClick={this.openModal}>{i18n.signIn}</a>
              </div>
            }
          </div>

          <div className={`hide-on-small-only ${css.callToAction}`}>
            <h3>{i18n.heroText2}</h3>
            <div>
              <a href='http://about.milieu.io/'>{i18n.launchProject}</a>
            </div>
          </div>

        </div>
        <div className={css.searchContainer}>
          <h2 className={css.title}>{i18n.title}</h2>
          <div className={css.search}>
            <Autocomplete searchBtn callback={this.autocompleteCallback} placeholder={i18n.enterAddress} type='autocomplete' onSelect={this.handleAutocompleteSelect}/>
          </div>
        </div>
        <div className={css.featuredContainer}>
          <h2 className={css.title}>{i18n.featuredDevelopments}</h2>

          <div className={css.featured}>
            <a href={`/${locale}/dev_sites?activeDevSiteId=1822`}><DevSite id={1822} preview={true} horizontal={isMobile} /></a>
            <a href={`/${locale}/dev_sites?activeDevSiteId=1869`}><DevSite id={1869} preview={true} horizontal={isMobile} /></a>
            <a href={`/${locale}/dev_sites?activeDevSiteId=1870`}><DevSite id={1870} preview={true} horizontal={isMobile} /></a>
          </div>
        </div>
        <div className={css.articleContainer}>
          <Carousel>
            <a title={'Go to Milieu\'s article of Zoning 101'} href='https://medium.com/@MilieuCities/zoning-101-a88c1e397455#.du6yt0qgk' target='_blank' className={css.article}>
              <div className={css.type}>{i18n.article}</div>
              <h2 className={css.title}>{i18n.title1}</h2>
              <div className={css.summary}>{i18n.summary1}</div>
            </a>
            <a title={'Go to Milieu\'s article of Whose streets are we planning?'} href='https://medium.com/@MilieuCities/whose-streets-are-we-planning-88f3ed1bc613#.hv858aafk' target='_blank' className={css.article}>
              <div className={css.type}>{i18n.article}</div>
              <h2 className={css.title}>{i18n.title2}</h2>
              <div className={css.summary}>{i18n.summary2}</div>
            </a>
            <a title={'Go to Milieu\'s article of What we learned from pop-up engagement'} href='https://medium.com/@MilieuCities/what-we-learned-from-pop-up-engagement-65cec34fefde#.l84ns3xc6' target='_blank' className={css.article}>
              <div className={css.type}>{i18n.article}</div>
              <h3 className={css.title}>What we learned from pop-up engagement</h3>
              <div className={css.summary}>Milieu’s on-going goal is to facilitate a human-centered approach to urban planning and development.</div>
            </a>
          </Carousel>
        </div>
      <Footer/>
      </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const home = document.querySelector('#home')
  home && render(<Home/>, home)
})
