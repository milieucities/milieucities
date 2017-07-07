import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    role: 'COMMUNITY MEMBER',
    dashboard: 'Dashboard',
    settings: 'Account Settings',
    notification: 'Notification',
    save: 'SAVE',
    notifications: 'Notifications',
    immediateVicinityScope: 'Notify me when there is a project near me (required)',
    wardScope: 'Notify me when there is a new project in the ward I live in',
    municipalityScope: 'Notify me when there is a new project in the city I live in',
    emailQ1S2: 'Subscribe to Milieu’s updates and newsletters',
    projectComments: 'Email me if a project I commented on is updated',
    commentReplies: 'Email me if my comment has a reply',
    notiUpdateS: 'Notification updated successfully',
    notiUpdateF: 'Failed to save notification changes'
  },
  fr: {
    role: 'membre du communauté',
    dashboard: 'Tableau de bord',
    settings: 'Paramètres du compte',
    notification: 'Notification',
    save: 'sauvegarder',
    notifications: 'Notifications',
    emailQ1S2: 'Bulletin de Milieu avec nouvelles de la compagnie',
    projectComments: 'Email me if a project I commented on is updated',
    commentReplies: 'Email me if my comment has a reply',
    immediateVicinityScope: 'Notify me when there is a project near me (required)',
    wardScope: 'Notify me when there is a new project in the ward I live in',
    municipalityScope: 'Notify me when there is a new project in the city I live in',
    notiUpdateS: 'Notifications mises à jour',
    notiUpdateF: 'Changements de notifications échoués'
  }
});

export default i18n;
