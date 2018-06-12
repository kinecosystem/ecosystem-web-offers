import * as React from "react";
import BasePage from "./base";
import { ButtonHTMLAttributes } from "react";
import { CommonProps } from "../../app";

import "../../../../styles/src/page/multichoice.question.styl";

export interface FullPageMultiChoiceProps extends CommonProps {
	id: string;
	choices: string[];
	onSelected: (answerData: object) => void;
	description?: string;
	rightAnswer?: number;
	amount?: number;
}

export interface FullPageMultiChoiceState {
	disabled: boolean;
	selectedAnswer: number | null;
	wrongAnswer: number | null;
}

export class MultichoiceQuestion<P extends FullPageMultiChoiceProps = FullPageMultiChoiceProps, S extends FullPageMultiChoiceState = FullPageMultiChoiceState> extends React.Component<P, S> {
	protected additionalClasses: string = "";
	protected highlightRightWrong: boolean = false;
	private buttons: Array<JSX.Element | null> = [];

	protected constructor(props: P) {
		super(props);
		this.state = {
			disabled: false,
			selectedAnswer: null,
		} as S;
	}

	public render() {
		this.additionalClasses += this.highlightRightWrong && " highlightRightWrong";
		return <BasePage className={"question multichoice " + this.additionalClasses}>
			<div className="header">
				{this.getHeader()}
			</div>
			<div className={"choices"}>
				{this.getButtons()}
			</div>
		</BasePage>;
	}

	protected getHeader() {
		return (
			<React.Fragment>
				<div className="title">{this.props.title}</div>
				<div className="description" dangerouslySetInnerHTML={{ __html: this.props && this.props.description! }}/>
			</React.Fragment>
		);
	}

	protected getAdditionalButtonClasses(value: any, index: number) {
		const oneBasedIndex = index + 1;
		let additionalClasses = index === this.state.selectedAnswer ? "selected" : "";
		if (this.state.selectedAnswer !== null) {
			if (this.state.wrongAnswer === oneBasedIndex) {
				additionalClasses += " wrongAnswer";
			} else if (this.props.rightAnswer === oneBasedIndex) {
				additionalClasses += " rightAnswer";
			}
		}
		return additionalClasses;
	}

	protected getButtons() {
		return this.props.choices.map((value, index) => {
			const additionalClasses = this.getAdditionalButtonClasses(value, index);
			return <button key={index} className={"choice " + additionalClasses} disabled={this.state.disabled} onClick={this.onSelect.bind(this, value, index)}>{value}</button>;
		});
	}

	protected onSelect(value: string, index: number) {
		let delay = 0;
		const props = this.props;
		const oneBasedIndex = index + 1;
		if (this.state.disabled) {
			return;
		}
		if (this.highlightRightWrong) {
			delay = 1500;
			console.log("answer", oneBasedIndex === props.rightAnswer ? null : oneBasedIndex);
			this.setState({
				wrongAnswer: oneBasedIndex === props.rightAnswer ? null : oneBasedIndex,
				selectedAnswer: index,
			});
		}
		if (props.amount && oneBasedIndex === props.rightAnswer) {
			props.updateSharedDate({
					earnedAmount: (props.sharedData.earnedAmount || 0) + props.amount,
				});
		}
		this.setState({ disabled: true, selectedAnswer: index }, () => {
			setTimeout(this.props.onSelected.bind(this.props, { [ this.props.id ]: value }), delay);
		});
	}

}
