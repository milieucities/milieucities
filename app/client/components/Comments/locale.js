import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    makePublicComment: 'Make a public comment',
    signInToComment: "Sign in to comment",
    comment: "Comment",
    loadMore: "Load More Comments",
    whatDoYouThink: "What do you think?",
    failedToVote: "Failed to vote on comment.",
    anoymous: "Anonymous",
    readMore: "Read More...",
    showLess: "Show less",
    delete: 'Delete',
    edit: 'Edit',
    reply: 'Reply',
    flaggedNotification: 'Your commment has been flagged as offensive and will be reviewed by a moderator.',
    commentDeletedSuccess: 'Your comment has been deleted.',
    commentDeletedFailed: 'Your comment was not deleted. Please try again.',
    commentSavedSuccess: 'Your comment has been saved.',
    commentSavedFailed:'Your comment was not saved. Please try again.',
    seeReplies: "See all {0} replies",
    hideReplies: "Hide replies",
    alreadyVotedUp: 'You have already voted up this comment.',
    alreadyVotedDown: 'You have already voted down this comment.',
    privacyPolicy: 'Personal information, as defined by the Municipal Freedom of Information and Protection of Privacy Act (MFIPPA) is collected under the authority of the Municipal Act, 2001, and in accordance with the provisions of MFIPPA. Personal information on this tool will be used for the purpose of consultations under the Ontario Planning Act. If you have questions about this collection, use, and disclosure of this information, contact the City of Guelph’s Information and Access Coordinator at 519-822-1260 ext. 2349 or privacy@guelph.ca.',
    acceptPrivacyPolicy: 'I accept the Privacy Policy'
  },
  fr: {
    makePublicComment: 'Faire un commentaire publique',
    signInToComment: "Se connecter pour commenter",
    comment: "Commenter",
    loadMore: "Charger plus de commentaires",
    whatDoYouThink: "Qu'est-ce que tu penses?",
    failedToVote: "Vote échoué",
    anoymous: "Anonyme",
    readMore: "Lire la suite...",
    showLess: "Cacher",
    delete: 'Supprimer',
    edit: 'Modifier',
    reply: 'Répondre',
    flaggedNotification: 'Votre commentaire a été signalé comme grossier et sera revisé par un(e) modérateur(trice).',
    commentDeletedSuccess: 'Votre commentaire a été supprimé.',
    commentDeletedFailed: 'Votre commentaire n\'a pas été supprimé, veuillez réessayer.',
    commentSavedSuccess: 'Votre commentaire a été enregistré.',
    commentSavedFailed:'Votre commentaire n\'a pas été enregistré, veuillez réessayer.',
    seeReplies: "Voir tout les {0} réponses",
    hideReplies: "Cacher réponses",
    alreadyVotedUp: 'Vous avez déjà voté pour ce commentaire.',
    alreadyVotedDown: 'Vous avez déjà voté contre ce commentaire.',
    privacyPolicy: 'Personal information, as defined by the Municipal Freedom of Information and Protection of Privacy Act (MFIPPA) is collected under the authority of the Municipal Act, 2001, and in accordance with the provisions of MFIPPA. Personal information on this tool will be used for the purpose of consultations under the Ontario Planning Act. If you have questions about this collection, use, and disclosure of this information, contact the City of Guelph’s Information and Access Coordinator at 519-822-1260 ext. 2349 or privacy@guelph.ca.'
  }
});

export default i18n;
