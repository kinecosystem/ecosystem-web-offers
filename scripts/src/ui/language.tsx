export interface Language {
	yay_youve_earned: string;
	better_luck_next_time: string;
	well_done: string;
	perfect_score: string;
	thanks_for_trying: string;
	for_the_effort: string;
}

export interface Dictionary {
	[key: string]: Language;
}

const en: Language = {
	yay_youve_earned: "Yay! You've earned",
	better_luck_next_time: "Better Luck Next Time!",
	well_done: "Well Done!",
	perfect_score: "Perfect Score!",
	thanks_for_trying: "Thanks for trying, you've earned",
	for_the_effort: "for the effort",
};

const pt: Language = {
	yay_youve_earned: "gdfgdfgdf",
	better_luck_next_time: "dfgdfgdf",
	well_done: "dfgdfgdf",
	perfect_score: "dfgdfgdfgdf",
	thanks_for_trying: "dfgdfgdfgdf",
	for_the_effort: "dfgdfgdfg",
};

export const dictionary: Dictionary = {
	en,
	pt,
};
