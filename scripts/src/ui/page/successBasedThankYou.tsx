import * as React from "react";
import BasePage from "./base";
import { CommonProps } from "../../app";
import { useTranslation, withTranslation, Trans } from "react-i18next";

import "../../../../styles/src/page/earnThankYou.styl";

import { dictionary } from "../language";
import acceptLanguage from "accept-language";

acceptLanguage.languages(["en", "pt"]);
const language: string = acceptLanguage.get(window.navigator.language) || "en";

export interface EarnThankYouProps extends CommonProps {
	isDisplayed: boolean;  // is this the currently displayed page
	closeHandler(answerData: any): void;

	hideTopBarHandler(): void;
}

const getImageUrl = (imageName: string) => `https://s3.amazonaws.com/htmlpoll.kinecosystem.com/images/${imageName}.svg`;

export class SuccessBasedThankYou extends React.Component<EarnThankYouProps> {
	private static diamondElements = ["l-1", "l-2", "l-3", "l-4", "c-1", "c-2", "r-3", "r-2", "r-1"]
		.map((name, index) => <img key={ index } src={ getImageUrl("diamond-" + name) } className={ "diamond-" + name + " diamonds" }/>);

	public componentDidUpdate() {
		if (this.props.isDisplayed) {
			this.props.hideTopBarHandler();
			setTimeout(this.props.closeHandler, 3000);
		}
	}

	public render() {

		const sharedData = this.props.sharedData;
		const earnedAmount = sharedData.earnedAmount;
		let content;
		if (!earnedAmount) {  // if didn't get anything right
			content = this.getFailedContent();
		} else if (Object.keys(sharedData.wrongAnswers || {}).length) {  // Got at least one wrong answer
			content = this.getSuccessContent();
		} else {
			content = this.getPerfectScoreContent();
		}
		return (
			<BasePage className="earnThankYou">
				{ content }
			</BasePage>
		);
	}

	protected getFailedContent() {
		// const { t, i18n, ready } = useTranslation();

		return (
			<React.Fragment>
				<div className="text">
					<h1 className={ "" }>{ dictionary[language].better_luck_next_time }</h1>
					<h2>{ dictionary[language].thanks_for_trying }</h2>
					<div className="amount">1</div>
					<img src={ getImageUrl("kin-type") } className="kin-type"/>
					<h2>{ dictionary[language].for_the_effort }</h2>
				</div>
				<div className={ "footer" }>
					<img src={ getImageUrl("coins") } className="coins"/>
					<img src={ getImageUrl("sparks") } className="sparks"/>
					{ SuccessBasedThankYou.diamondElements }
				</div>
			</React.Fragment>
		);
	}

	protected getSuccessContent() {
		// const { t, i18n, ready } = useTranslation();

		return (
			<React.Fragment>
				<div className="text">
					<h1 className={ "" }>{ dictionary[language].well_done }</h1>
					<h2>{ dictionary[language].yay_youve_earned }</h2>
					<div className="amount">{ this.props.sharedData.earnedAmount }</div>
					<img src={ getImageUrl("kin-type") } className="kin-type"/>
				</div>
				<div className={ "footer" }>
					<img src={ getImageUrl("coins") } className="coins"/>
					<img src={ getImageUrl("sparks") } className="sparks"/>
					{ SuccessBasedThankYou.diamondElements }
				</div>
			</React.Fragment>
		);
	}

	protected getPerfectScoreContent() {
		// const { t, i18n, ready } = useTranslation();

		return (
			<React.Fragment>
				<div className="text">
					<h1 className={ "" }>{ dictionary[language].perfect_score }</h1>
					<h2>{ dictionary[language].yay_youve_earned }</h2>
					<div className="amount">{ this.props.sharedData.earnedAmount }</div>
					<img src={ getImageUrl("kin-type") } className="kin-type"/>				</div>
				<div className={ "footer" }>
					<img src={ getImageUrl("coins") } className="coins"/>
					<img src={ getImageUrl("sparks") } className="sparks"/>
					{ SuccessBasedThankYou.diamondElements }
				</div>
			</React.Fragment>
		);
	}
}
