import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    role: 'COMMUNITY MEMBER',
    dashboard: 'Dashboard',
    settings: 'Account Settings',
    notification: 'Notification',
    edit: 'EDIT',
    recentComments: 'Recent Comments',
    noComment: 'You have not submitted a comment yet.'
  },
  fr: {
    role: 'membre du communauté',
    dashboard: 'Tableau de bord',
    settings: 'Paramètres du compte',
    notification: 'Notification',
    edit: 'modifier',
    recentComments: 'Commentaires récentes',
    noComment: 'Vouz n’avez pas publier de commentaire.'
  }
});

export default i18n;
