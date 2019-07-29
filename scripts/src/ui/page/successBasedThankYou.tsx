import * as React from "react";
import BasePage from "./base";
import { CommonProps } from "../../app";

import "../../../../styles/src/page/earnThankYou.styl";

import { translate } from "../../language";

export interface EarnThankYouProps extends CommonProps {
	isDisplayed: boolean;  // is this the currently displayed page
	closeHandler(answerData: any): void;

	// hideTopBarHandler(): void;
}

const getImageUrl = (imageName: string) => `https://s3.amazonaws.com/htmlpoll.kinecosystem.com/images/${imageName}.svg`;

export class SuccessBasedThankYou extends React.Component<EarnThankYouProps> {
	private static diamondElements = ["l-1", "l-2", "l-3", "l-4", "c-1", "c-2", "r-3", "r-2", "r-1"]
		.map((name, index) => <img key={ index } src={ getImageUrl("diamond-" + name) } className={ "diamond-" + name + " diamonds" }/>);

	public componentDidUpdate() {
		if (this.props.isDisplayed) {
			// this.props.hideTopBarHandler();
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
		return (
			<React.Fragment>
				<div className="text">
					<h1>{ translate("better_luck_next_time") }</h1>
					<h2>{ translate("youve_earned") }:</h2>
					<span className="amount"><img src={ getImageUrl("plus-small") } className="plus-sign" /><img src={ getImageUrl("kin-coin") } /><span>1</span></span>
				</div>
				<div className="footer">
					<img src={ getImageUrl("cheering-hands") } className="cheering-hands"/>
				</div>
			</React.Fragment>
		);
	}

	protected getSuccessContent() {
		return (
			<React.Fragment>
				<div className="text">
					<h1>{ translate("well_done") }</h1>
					<h2>{ translate("yay_youve_earned") }:</h2>
					<span className="amount"><img src={ getImageUrl("plus-small") } className="plus-sign" /><img src={ getImageUrl("kin-coin") } /><span className="amount">{ this.props.sharedData.earnedAmount }</span></span>
				</div>
				<div className="footer">
					<img src={ getImageUrl("cheering-hands") } className="cheering-hands"/>
				</div>
			</React.Fragment>
		);
	}

	protected getPerfectScoreContent() {
		return (
			<React.Fragment>
				<div className="text">
					<h1>{ translate("perfect_score") }</h1>
					<h2>{ translate("yay_youve_earned") }:</h2>
					<span className="amount"><img src={ getImageUrl("plus-small") } className="plus-sign" /><img src={ getImageUrl("kin-coin") } /><span className="amount">{ this.props.sharedData.earnedAmount }</span></span>
				</div>
				<div className="footer">
					<img src={ getImageUrl("cheering-hands") } className="cheering-hands"/>
				</div>
			</React.Fragment>
		);
	}
}
