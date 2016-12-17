import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
  en:{
    text1: "We use cookies to ensure you get the best experience on our website. Please read our ",
    text2: " to find out more.",
    privacy: "Privacy Policy"
  },
  fr: { //TODO: Translate to French
    text1: "We use cookies to ensure you get the best experience on our website. Please read our ",
    text2: " to find out more.",
    privacy: "Privacy Policy"
  }
});

export default i18n;
