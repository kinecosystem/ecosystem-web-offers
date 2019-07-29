import acceptLanguage from "accept-language";

acceptLanguage.languages(["en", "pt"]);
const language: string = acceptLanguage.get(window.navigator.language) || "en";

export type LocalizedStrings = {
	yay_youve_earned: string;
	better_luck_next_time: string;
	well_done: string;
	perfect_score: string;
	thanks_for_trying: string;
	for_the_effort: string;
	youve_earned: string;
};

export type Languages = {
	[key: string]: LocalizedStrings;
};

const en: LocalizedStrings = {
	yay_youve_earned: "Yay! You've earned",
	better_luck_next_time: "Better Luck Next Time!",
	well_done: "Well Done!",
	perfect_score: "High Five!",
	thanks_for_trying: "Thanks for trying, you've earned",
	for_the_effort: "for the effort",
	youve_earned: "You've earned",
};

const pt: LocalizedStrings = {
	yay_youve_earned: "Eba! Você ganhou",
	better_luck_next_time: "Mais Sorte na Próxima Vez!",
	well_done: "Muito bem!",
	perfect_score: "Pontuação Perfeita!",
	thanks_for_trying: "Obrigado por tentar, você ganhou",
	for_the_effort: "pelo esforço",
	youve_earned: "Você ganhou",
};

export const languages: Languages = {
	en,
	pt,
};

export function translate(key: keyof LocalizedStrings): string {
	return languages[language][key];
}
