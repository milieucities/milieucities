import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    dashboard: 'Dashboard',
    settings: 'Account Settings',
    notification: 'Notifications',
    organizations: 'Organizations',
  },
  fr: {
    dashboard: 'Tableau de bord',
    settings: 'Paramètres du compte',
    notification: 'Notifications',
    organizations: 'Organisations',
  }
});

export default i18n;