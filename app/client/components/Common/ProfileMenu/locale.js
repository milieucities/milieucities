import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    dashboard: 'Dashboard',
    settings: 'Account Settings',
    notification: 'Notifications',
    manage_dev_site: 'Manage Development Sites'
  },
  fr: {
    dashboard: 'Tableau de bord',
    settings: 'Paramètres du compte',
    notification: 'Notifications',
    manage_dev_site: 'Gérer Development Site'
  }
});

export default i18n;
