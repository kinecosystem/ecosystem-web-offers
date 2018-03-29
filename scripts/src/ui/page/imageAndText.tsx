import * as React from "react";
import BasePage from "./base";

import "../../../../styles/src/page/imageAndText.styl";

export interface ImageAndTextProps {
	image: string;
	title: string;
	onBtnClick?: () => void;
	btnText: string;
	footerHtml: string;
}

class ImageAndText extends React.Component<any, ImageAndTextProps> {
	public render() {
		return (<BasePage className="imageAndText">
			<div className="header">
				<img src={this.props.image}/>
				<div className="title">{this.props.title}</div>
			</div>
			<div className="body" dangerouslySetInnerHTML={{ __html: this.props.bodyHtml }}></div>
			<div className="footer" dangerouslySetInnerHTML={{ __html: this.props.footerHtml }}></div>
			<button className={"btn " + (!this.props.onBtnClick ? "hidden" : "")}
					onClick={this.props.onBtnClick.bind(this.props, { })}>{this.props.buttonText}</button>
		</BasePage>);
	}
}

export default ImageAndText;
