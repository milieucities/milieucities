import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './home.scss'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import DevSite from '../../DevSites/Show/Show'
import Autocomplete from '../../Utility/Autocomplete/Autocomplete'
import Carousel from '../../Utility/Carousel/Carousel'
import { debounce } from 'lodash'

export default class Home extends Component {
  constructor() {
    super()
    this.state = { isMobile: (window.innerWidth < 600) }
    this.locale = document.body.dataset.locale
    this.autocompleteCallback = (address, autocomplete) => this._autocompleteCallback(address, autocomplete)
    this.handleAutocompleteSelect = (address) => this._handleAutocompleteSelect(address)

    window.addEventListener('resize', () => {
      debounce(() => {
        this.setState({ isMobile: (window.innerWidth < 600) });
      }, 100)()
    })
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
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({'address': address}, (result) => {
      if(result.length > 0){
        const [latitude, longitude] = [result[0].geometry.location.lat(), result[0].geometry.location.lng()]
        Turbolinks.visit(`/dev_sites?latitude=${latitude}&longitude=${longitude}`);
      } else {
        Turbolinks.visit('/dev_sites');
      }
    })
  }
  render() {
    const { isMobile } = this.state;
    return (
      <div>
        <Header />
        <div className={css.landingContainer}>
          <img src={require('./images/ui.jpg')} />
          <div>
            <div className={css.title}>What’s being built in my city?</div>
            <div className={css.search}>
              <Autocomplete callback={this.autocompleteCallback} placeholder='Enter an address' type='search' onSelect={this.handleAutocompleteSelect}/>
            </div>
          </div>
        </div>
        <div className={css.featuredContainer}>
          <div className={css.title}>Featured Developments</div>

          <div className={css.featured}>
            <a href={`/${this.locale}/dev_sites?activeDevSiteId=200`}><DevSite id={200} preview={true} horizontal={isMobile} /></a>
            <a href={`/${this.locale}/dev_sites?activeDevSiteId=201`}><DevSite id={201} preview={true} horizontal={isMobile} /></a>
            <a href={`/${this.locale}/dev_sites?activeDevSiteId=100`}><DevSite id={100} preview={true} horizontal={isMobile} /></a>
          </div>

        </div>
        <div className={css.articleContainer}>
          <Carousel>
            <a href='https://medium.com/@MilieuCities/zoning-101-a88c1e397455#.du6yt0qgk' target='_blank' className={css.article}>
              <div className={css.type}>Article</div>
              <div className={css.title}>Zoning 101</div>
              <div className={css.summary}>Zoning regulations are the rules of the game if you — or a developer — want to construct a building.</div>
            </a>
            <a href='https://medium.com/@MilieuCities/whose-streets-are-we-planning-88f3ed1bc613#.hv858aafk' target='_blank' className={css.article}>
              <div className={css.type}>Article</div>
              <div className={css.title}>Whose streets are we planning?</div>
              <div className={css.summary}>Transportation planning offers huge opportunities to enable equity.</div>
            </a>
          </Carousel>
        </div>
      <Footer />
      </div>
    )
  }
}

document.addEventListener('page:change', () => {
  const home = document.querySelector('#home')
  home && render(<Home/>, home)
})
