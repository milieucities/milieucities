import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    messageSent: "Message successfully sent!",
    mustSign: "Must sign in to like a development site.",
    openForComments: "Open for Comments",
    committee: "Committee of Adjustment",
    share: "Share",
    devId: "Development Id",
    ward: "Ward",
    status: "Status",
    description: "Description",
    file: "attached files",
    urbanPlanner: "Urban Planner",
    councillor: "Councillor",
    name: "Name",
    email: "Email",
    message: "Message"

  },
  fr: {
    messageSent: "Message successfully sent!",
    mustSign: "Must sign in to like a development site.",
    openForComments: "ouvert(e) à commentaires",
    committee: "Committee of Adjustment",
    share: "Partager",
    devId: "Demande no",
    ward: "Quartier",
    status: "État d’avancement",
    description: "Description",
    file: "Documents d’aide",
    urbanPlanner: "Urban Planner",
    councillor: "Councillor",
    name: "Prénom",
    email: "Courriel",
    message: "Message"
  }
});

export default i18n;
