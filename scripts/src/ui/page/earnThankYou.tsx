import * as React from "react";
import BasePage from "./base";
import { CommonProps } from "../../app";

import "../../../../styles/src/page/earnThankYou.styl";

export interface EarnThankYouProps extends CommonProps {
	amount: number;
	isDisplayed: boolean;  // is this the currently displayed page
	closeHandler(answerData: any): void;
	// hideTopBarHandler(): void;
}

const getImageUrl = (imageName: string) => `https://s3.amazonaws.com/htmlpoll.kinecosystem.com/images/${imageName}.svg`;

import { translate } from "../../language";

export class EarnThankYou extends React.Component<EarnThankYouProps> {
	public componentDidUpdate() {
		if (this.props.isDisplayed) {
			// this.props.hideTopBarHandler();
			setTimeout(this.props.closeHandler, 3000);
		}
	}

	public render() {
		return (
			<BasePage className="earnThankYou">
				<div className="text">
					<div>{ translate("yay_youve_earned") }</div>
					<span className="amount"><img src={ getImageUrl("plus-small") } className="plus-sign" /><img src={ getImageUrl("kin-coin") } /><span className="amount-value" >{this.props.amount}</span></span>
				</div>
				<div className={"footer"}>
					<img src={ getImageUrl("cheering-hands") } className="cheering-hands"/>
				</div>
			</BasePage>
		);
	}
}
