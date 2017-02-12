import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en: {
    map: 'Map',
    about: 'About',
    logIn: 'Log In',
    logOut: 'Log Out',
    projects: 'Projects',
  },
  fr: {
    map: 'Carte',
    about: 'À Propos',
    logIn: 'Connexion',
    logOut: 'Deconnexion',
    projects: 'Projets',
  },
});

export default i18n;
