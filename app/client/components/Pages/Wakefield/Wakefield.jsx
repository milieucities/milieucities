import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './wakefield.scss'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import { debounce, uniqueId } from 'lodash'
import i18n from './locale'

export default class Wakefield extends Component {
  constructor() {
    super()
    this.state = { isMobile: (window.innerWidth < 600) }

    window.addEventListener('resize', debounce(() => {
      this.setState({ isMobile: (window.innerWidth < 600) })
    }, 100));
  }

  render() {
    const { isMobile } = this.state;
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);

    return (
      <div className={css.root}>
        <Header />
        <div className={`${css.container} container`}>
          <h1>Lorne Shoudice Spring, Le Pêche, Quebec, Canada</h1>

          <div className='flex m-col'>
            <div className={css.content}>
              <h2 style={{marginTop: 0}}>{i18n.aboutProject}</h2>

              <p>{i18n.aboutProjectP1}</p>
              <p>{i18n.aboutProjectP2}</p>
              <p>{i18n.aboutProjectP3}</p>
              <p>{i18n.aboutProjectP4}</p>

              <h2>{i18n.whatDoYouThink}</h2>

              <p>{i18n.whatDoYouThinkP1}</p>
              <p>{i18n.whatDoYouThinkP2}</p>
            </div>

            <div className={css.media}>
              <Carousel />
            </div>
          </div>

          <h2>{i18n.communityTimeline}</h2>

          <div className='flex m-col'>
            <div>
              <h2>{i18n.newsAndUpdates}</h2>
              <p>March 1, 2017 - Visiting Wakefield Spring</p>
              <p>March 1, 2017 - Visiting Wakefield Spring</p>
              <p>March 1, 2017 - Visiting Wakefield Spring</p>
              <p>March 1, 2017 - Visiting Wakefield Spring</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

const CAROUSEL_ITEMS = [
  {
    src: './images/wakefield-side.jpg',
    image: true,
  },
  {
    src: './images/wakefield-video.jpg',
    image: false,
    iframe: 'https://drive.google.com/file/d/0B7ZsD-DSn7XYSkN5Y1FLNDNEaHM/preview'
  },
  {
    src: './images/discover.jpg',
    image: true,
  },
  {
    src: './images/wakefield.jpg',
    image: true,
  },
]

class Carousel extends Component {
  constructor() {
    super()
    this.state = { itemIndex: 0 };
    this.previous = (e) => this._previous(e);
    this.next = (e) => this._next(e);
    this.mod = (n, m) => ((n % m) + m) % m
  }

  _previous(e) {
    e.preventDefault();
    const { itemIndex } = this.state;

    $(this.refs.container).velocity({ 'left': '-66.66%' }, { duration: 350, complete: () => {
      this.setState({ itemIndex: this.mod((itemIndex + 1), CAROUSEL_ITEMS.length) })
    }})
  }

  _next(e) {
    e.preventDefault();
    const { itemIndex } = this.state;

    $(this.refs.container).velocity({ 'left': 0 }, { duration: 350, complete: () => {
      this.setState({ itemIndex: this.mod((itemIndex - 1), CAROUSEL_ITEMS.length) })
    }})
  }

  render() {
    const { itemIndex } = this.state;
    const currentItem = CAROUSEL_ITEMS[(itemIndex + 1) % CAROUSEL_ITEMS.length]
    let items = [];

    for (let i = itemIndex; i < (itemIndex + 3); i++) {
      const src = CAROUSEL_ITEMS[i%CAROUSEL_ITEMS.length].src
      items.push(<img key={src} className={css.carouselItem} src={require(src)} />)
    }

    $(`.${css.carouselItemsContainer}`).css({ left: '-33.33%' })

    return(
      <div className={css.carouselContainer}>
        <div className={css.carouselDisplay}>
          {
            currentItem.image &&
            <img ref='display' src={require(currentItem.src)} />
          }
          {
            !currentItem.image &&
            <iframe src={currentItem.iframe} />
          }
        </div>
        <div ref='container' className={css.carouselItemsContainer}>
          <a href='#' onClick={this.previous} className={css.carouselPreviousItem}><i className='fa fa-angle-left' /></a>
          <img className={css.carouselItem} src={require(CAROUSEL_ITEMS[this.mod((itemIndex - 1), CAROUSEL_ITEMS.length)].src)} />
          {items}
          <img className={css.carouselItem} src={require(CAROUSEL_ITEMS[ this.mod((itemIndex + 3), CAROUSEL_ITEMS.length)].src)} />
          <a href='#' onClick={this.next} className={css.carouselNextItem} ><i className='fa fa-angle-right' /></a>
        </div>
      </div>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const wakefield = document.querySelector('#wakefield');
  wakefield && render(<Wakefield/>, wakefield)
})
