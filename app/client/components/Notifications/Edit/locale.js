import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    role: 'COMMUNITY MEMBER',
    dashboard: 'Dashboard',
    settings: 'Account Settings',
    notification: 'Notification',
    save: 'SAVE',
    notifications: 'Notifications',
    emailQ1: 'When would you like to receive emails from us?',
    emailQ1S1: 'When there is a new development in your area',
    emailQ1S2: 'Milieu newsletter and company updates'
  },
  fr: {
    role: 'COMMUNITY MEMBER', //TODO:Translate to French
    dashboard: 'Tableau de bord',
    settings: 'Paramètres du compte',
    notification: 'Notification',
    save: 'sauvegarder',
    notifications: 'Notifications',
    emailQ1: 'When would you like to receive emails from us?', //TODO:
    emailQ1S1: 'When there is a new development in your area', //TODO:
    emailQ1S2: 'Milieu newsletter and company updates' //TODO:
  }
});

export default i18n;
