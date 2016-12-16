import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    role: 'COMMUNITY MEMBER',
    dashboard: 'Dashboard',
    settings: 'Account Settings',
    notification: 'Notification',
    name: 'Name',
    bio: 'Bio',
    changePhoto: 'Change Photo',
    contact: 'Contact',
    email: 'Email',
    password: 'Password',
    newPassword: 'New Password',
    newPasswordConfirmation: 'New Password Confirmation',
    location: 'Location',
    street: 'Street',
    city: 'City',
    save: 'SAVE',
    delete: 'DELETE ACCOUNT',
  },
  fr: {
    role: 'COMMUNITY MEMBER', //TODO: Translate to French
    dashboard: 'Tableau de bord',
    settings: 'Paramètres du compte',
    notification: 'Notification',
    name: 'prénom',
    bio: 'Bio',
    changePhoto: 'Changer la photo',
    contact: 'Contact',
    email: 'Courriel',
    password: 'Mot de passe',
    newPassword: 'Nouveau mot de pass',
    newPasswordConfirmation: 'Confirmer le mot de pass',
    location: 'Adresse',
    street: 'Adresse', //TODO: Confirm
    city: 'Ville',
    save: 'sauvegarder',
    delete: 'supprimer votre compte',
    notifications: 'Notifications',
  }
});

export default i18n;
