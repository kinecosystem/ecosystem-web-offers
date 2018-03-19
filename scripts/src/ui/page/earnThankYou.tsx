import * as React from "react";
import BasePage from "./base";

import "../../../../styles/src/page/earnThankYou.styl";

export interface EarnThankYouProps {
	amount: number;
}

const getImageUrl = (imageName: string) => "https://s3.amazonaws.com/htmlpoll.kinecosystem.com/images/${imageName}.svg".replace("${imageName}", imageName);

export class EarnThankYou extends React.Component<any, EarnThankYouProps> {
	public render() {
		return (
			<BasePage className={"earnThankYou"}>

				<div className={"text"}>
					<div>Yay! you've earned</div>
					<div className={"amount"}>{this.props.amount}</div>
					<img src={getImageUrl("kin-type")} className={"kin-type"}/>
				</div>
				<div className={"footer"}>
					<img src={getImageUrl("coins")} className={"coins"}/>
					<img src={getImageUrl("sparks")} className={"sparks"}/>
					<img src={getImageUrl("diamond-l-1")} className={"diamond-l-1 diamonds"}/>
					<img src={getImageUrl("diamond-l-2")} className={"diamond-l-2 diamonds"}/>
					<img src={getImageUrl("diamond-l-3")} className={"diamond-l-3 diamonds"}/>
					<img src={getImageUrl("diamond-l-4")} className={"diamond-l-4 diamonds"}/>
					<img src={getImageUrl("diamond-c-1")} className={"diamond-c-1 diamonds"}/>
					<img src={getImageUrl("diamond-c-2")} className={"diamond-c-2 diamonds"}/>
					<img src={getImageUrl("diamond-r-3")} className={"diamond-r-3 diamonds"}/>
					<img src={getImageUrl("diamond-r-2")} className={"diamond-r-2 diamonds"}/>
					<img src={getImageUrl("diamond-r-1")} className={"diamond-r-1 diamonds"}/>
				</div>
			</BasePage>
		);
	}
}
