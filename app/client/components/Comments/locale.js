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
  }
});

export default i18n;
