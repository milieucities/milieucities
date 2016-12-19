import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    signInToComment: "Sign in to comment",
    comment: "Comment",
    loadMore: "Load More Comments",
    whatDoYouThink: "What do you think?",
    failedToVote: "Failed to vote on comment.",
    anoymous: "Anonymous",
    readMore: "Read More..."

  },
  fr: {
    signInToComment: "Se connecter pour commenter",
    comment: "commenter",
    loadMore: "Charger plus de commentaires",
    whatDoYouThink: "Qu'est-ce que tu penses?",
    failedToVote: "Vote échoué",
    anoymous: "Anonyme",
    readMore: "Lire la suite..."
  }
});

export default i18n;
