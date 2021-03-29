import * as React from "react";
import BasePage from "./base";
import { CommonProps } from "../../app";

import "../../../../styles/src/page/earnThankYou.styl";

export interface EarnThankYouProps extends CommonProps {
	amount: number;
	isDisplayed: boolean;  // is this the currently displayed page
	closeHandler(answerData: any): void;
	hideTopBarHandler(): void;
}

const getImageUrl = (imageName: string) => `https://s3.amazonaws.com/htmlpoll.kinecosystem.com/images/${imageName}.svg`;

export class EarnThankYou extends React.Component<EarnThankYouProps> {
	public componentDidUpdate() {
		if (this.props.isDisplayed) {
			this.props.hideTopBarHandler();
			setTimeout(this.props.closeHandler, 3000);
		}
	}

	public render() {
		return (
			<BasePage className="earnThankYou">
				<div className="text">
					<div>Yay! You've earned</div>
					<span className="amount"><span className="full-width-plus">＋</span><img src={ getImageUrl("kin-coin") } /><span>{this.props.amount}</span></span>
				</div>
				<div className={"footer"}>
					<img src={ getImageUrl("cheering-hands") } className="cheering-hands"/>
				</div>
			</BasePage>
		);
	}
}
