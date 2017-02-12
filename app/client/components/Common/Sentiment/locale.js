import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    sentiment: 'This is a donut graph representing the average emotions of the commenters collected here. Each slice of the donut represents one emotion’s share of the total emotions expressed.',
  },
  fr: {
    sentiment: 'Ce graphique représente les émotions moyennes des commentaires recueillis ici. Chaque tranche du graphique représente la part d\'une émotion parmi toutes les émotions exprimées.',
  }
});

export default i18n;
