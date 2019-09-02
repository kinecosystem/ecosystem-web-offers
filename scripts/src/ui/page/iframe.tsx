import * as React from "react";
import BasePage from "./base";
import { CommonProps } from "../../app";

import "../../../../styles/src/page/iframe.styl";

export interface IframeProps extends CommonProps {
	iframeSrc: string;
	isDisplayed: boolean;  // is this the currently displayed page
	closeHandler(answerData: any): void;
}

const getImageUrl = (imageName: string) => `https://s3.amazonaws.com/htmlpoll.kinecosystem.com/images/${imageName}.svg`;

class Iframe extends React.Component<IframeProps> {
	public render() {
		setTimeout(this.props.closeHandler, 1000);
		return (<BasePage className="iframe">
			<div className="header-controls">
				<button className="close-btn" onClick={this.props.close}><img src={ getImageUrl("close-btn") } /></button>
				<span></span>
				<div className="title">{this.props.title}</div>
			</div>
			<div className="body" dangerouslySetInnerHTML={{ __html: "<iframe class='mainframe' src='" + this.props.iframeSrc + "'></iframe>" }}></div>
		</BasePage>);
	}
}

export default Iframe;
