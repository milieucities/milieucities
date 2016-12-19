import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    title: 'What’s being built in my city?',
    featuredDevelopments: 'Featured Developments',
    enterAddress: 'Enter an address',
    article: 'Article',
    title1: 'Zoning 101',
    summary1: 'Zoning regulations are the rules of the game if you — or a developer — want to construct a building.',
    title2: 'Whose streets are we planning?',
    summary2: 'Transportation planning offers huge opportunities to enable equity.'
  },
  fr: {
    title: 'Ce qui est en cours de construction dans ma ville?',
    featuredDevelopments: 'Développements en vedette',
    enterAddress: 'Entrer une adresse',
    article: 'Article',
    title1: 'Zonage 101',
    summary1: 'Les régulations de zonage sont les règles pour quand quelqu’un (tels que vous ou un développeur) veut construire un bâtiment.',
    title2: 'À qui sont les rues que nous planifions ?',
    summary2: 'La planification des transports offre d’énormes possibilités d’équité.'
  }
});

export default i18n;
