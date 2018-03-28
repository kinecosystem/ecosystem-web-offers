import * as React from "react";
import BasePage from "./base";

import "../../../../styles/src/page/earnThankYou.styl";

export interface EarnThankYouProps {
	amount: number;
	closeCb: () => void;
	hideTopBarCB: () => void;
	isDisplayed: boolean;  // is this the currently displayed page
}

const getImageUrl = (imageName: string) => `https://s3.amazonaws.com/htmlpoll.kinecosystem.com/images/${imageName}.svg`;

export class EarnThankYou extends React.Component<any, EarnThankYouProps> {
	public componentDidUpdate() {
		console.log("update");
		if (this.props.isDisplayed) {
			this.props.hideTopBarCB();
			setTimeout(this.props.closeCb, 3000);
		}
	}

	public render() {
		const diamonds = [ "l-1", "l-2", "l-3", "l-4", "c-1", "c-2", "r-3", "r-2", "r-1" ]
			.map((name, index) => <img key={index} src={getImageUrl("diamond-" + name)} className={"diamond-" + name + " diamonds"}/>);
		return (
			<BasePage className="earnThankYou">

				<div className="text">
					<div>Yay! you've earned</div>
					<div className="amount">{this.props.amount}</div>
					<img src={getImageUrl("kin-type")} className="kin-type"/>
				</div>
				<div className={"footer"}>
					<img src={getImageUrl("coins")} className="coins"/>
					<img src={getImageUrl("sparks")} className="sparks"/>
					{diamonds}
				</div>
			</BasePage>
		);
	}
}
