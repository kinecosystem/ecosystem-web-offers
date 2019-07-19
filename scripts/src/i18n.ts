import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const backend = new Backend(null, {
loadPath: "/locales/{{lng}}/{{ns}}.json",
});

i18n
// .use(backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
resources: {
en: {
translation: {
title: "kusheli rabak",
// yay_youve_earned: "Yay! You've earned",
// better_luck_next_time: "Better Luck Next Time!",
// well_done: "Well Done!",
// perfect_score: "Perfect Score!",
// thanks_for_trying: "Thanks for trying, you've earned",
// for_the_effort: "for the effort",
},
},
// pt: {
// translation: {
// title: "kusheli rabak",
// yay_youve_earned: "kusheli raba",
// better_luck_next_time: "kusheli raba",
// well_done: "kusheli raba",
// perfect_score: "kusheli raba",
// thanks_for_trying: "kusheli raba",
// for_the_effort: "kusheli raba",
// },
// },
},
lng: "en",
fallbackLng: "en",
debug: true,
interpolation: {
escapeValue: false, // not needed for react as it escapes by default,
// backend: {
// loadPath: "/locales/{{lng}}/translation.json",
// },
// react: {
//   useSuspense: false
// }
},
});

export default i18n;
