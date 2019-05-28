import * as React from "react";
import BasePage from "./base";
import { CommonProps } from "../../app";

import "../../../../styles/src/page/imageAndText.styl";

export interface ImageAndTextProps extends CommonProps {
	image: string;
	onBtnClick: (answerData: any) => void;
	footerHtml: string;
	bodyHtml: string;
	buttonText: string;
}

const getImageUrl = (imageName: string) => `https://s3.amazonaws.com/htmlpoll.kinecosystem.com/images/${imageName}.svg`;

class ImageAndText extends React.Component<ImageAndTextProps> {
	public render() {
		const currentPage = this.props.pageIndex + 1;
		/* the list is 0 based */
		const totalQuestionPages = this.props.totalPagesCount - 1;
		/* the list contains a Thank you page --- a better solution is better */

		let imgSpecialClass = setSpecialClassForHeroImage(currentPage);
		return (<BasePage className="imageAndText">
			<div className="header-controls">
				<button className="close-btn" onClick={this.props.close}><img src={ getImageUrl("close-btn") } /></button>
				<span></span>
				<div className={"pageProgress"}>{currentPage}/{totalQuestionPages}</div>
			</div>
			<div className="header">
				<img src={this.props.image} className={imgSpecialClass} />
				<div className="title">{this.props.title}</div>
			</div>
			<div className="body" dangerouslySetInnerHTML={{ __html: this.props.bodyHtml }}></div>
			<div className="footer">
				<div className="description">{ this.props.rewardText } <span className="description-price"><span className="full-width-plus">＋</span><img src={ getImageUrl("kin-coin") } />{ Number(this.props.rewardValue) }</span> </div>
			</div>
			<button className={"btn " + (!this.props.onBtnClick ? "hidden" : "")}
					onClick={this.props.onBtnClick.bind(this.props, { })}>{this.props.buttonText}</button>
		</BasePage>);
	}
}

function setSpecialClassForHeroImage(page: number) {
	switch (page) {
		case 1: return "";
		case 2: return "full-width";
		case 3: return "right-aligned";

		default:
			return "";
	}
}

export default ImageAndText;
