import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en: {
    communityMember: 'Community Member',
    pendingVerification: 'Verified status pending',
    notVerified: 'Not Verified',
    verified: 'Verified',
    status: "Status: ",
    requestVerification: 'Get verified'
  },
  fr: {
    communityMember: 'Membre du Communauté',
    pendingVerification: 'En attente de vérification',
    notVerified: 'Non Verifié',
    verified: 'Verifié',
    status: "Etat: ",
    requestVerification: 'Demande de vérification'
  }
});

export default i18n;
