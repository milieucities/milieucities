import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    map: 'Map',
    about: 'About',
    logIn: 'Log In',
    logOut: 'Log Out',
    signUp: 'Sign Up'
  },
  fr: {
    map: 'Carte',
    about: 'À Propos',
    logIn: 'Connexion',
    logOut: 'Deconnexion',
    signUp: 'S\'inscrire'
  }
});

export default i18n;
