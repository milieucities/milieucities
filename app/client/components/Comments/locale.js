import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    signInToComment: "Sign in to comment",
    comment: "Comment",
    loadMore: "Load More Comments",
    whatDoYouThink: "What do you think?",
    failedToVote: "Failed to vote on comment.",
    anoymous: "Anonymous",
    readMore: "Read More...",
    delete: 'delete',
    edit: 'edit',
    flaggedNotification: 'Your commment has been flagged as offensive and will be reviewed by a moderator.',
  },
  fr: {
    signInToComment: "Se connecter pour commenter",
    comment: "commenter",
    loadMore: "Charger plus de commentaires",
    whatDoYouThink: "Qu'est-ce que tu penses?",
    failedToVote: "Vote échoué",
    anoymous: "Anonyme",
    readMore: "Lire la suite...",
    delete: 'supprimer',
    edit: 'modifier',
    flaggedNotification: 'Votre commentaire a été signalé comme grossier et sera revisé par un(e) modérateur(trice).'
  }
});

export default i18n;
