import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    title: 'What’s being built in my city?',
    featuredDevelopments: 'Featured Developments',
    enterAddress: 'Enter an address',
    article: 'Article'
  },
  fr: {
    title: 'Ce qui est en cours de construction dans ma ville?',
    featuredDevelopments: 'Développements en vedette',
    enterAddress: 'Entrer une adresse',
    article: 'Article'
  }
});

export default i18n;
