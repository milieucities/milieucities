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
    avatarDelS: 'Avatar successully deleted',
    avatarDelF: 'Failed to delete avatar',
    profileUploadS: 'Profile updated successfully',
    profileUploadF: 'Failed to save profile',
    deleteConfirm: 'Are you sure you would like to delete your account?',
    accountDeleteS: 'Account deleted',
    accountDeleteF: 'Failed to delete account'
  },
  fr: {
    role: 'membre du communauté',
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
    street: 'Adresse',
    city: 'Ville',
    save: 'sauvegarder',
    delete: 'supprimer votre compte',
    avatarDelS: 'Avatar supprimé',
    avatarDelF: 'La suppression d’avatar a échoué',
    profileUploadS: 'Profil mis à jour',
    profileUploadF: 'La mise à jour du profil a échoué',
    deleteConfirm: 'Êtes-vous certain que vous vouliez supprimer votre compte?',
    accountDeleteS: 'Compte supprimée',
    accountDeleteF: 'La suppression de compte a échoué'
  }
});

export default i18n;
