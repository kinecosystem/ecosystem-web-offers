import * as React from "react";
import BasePage from "./base";
import { ButtonHTMLAttributes } from "react";
import { CommonProps, SharedData } from "../../app";

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
	protected additionalClasses = new Set(" ");
	protected highlightRightWrong = false;
	private buttons: Array<JSX.Element | null> = [];

	protected constructor(props: P) {
		super(props);
		this.state = {
			disabled: false,
			selectedAnswer: null,
		} as S;
	}

	public render() {
		const additionalClasses = [ ...this.additionalClasses ].join(" ");
		return <BasePage className={"question multichoice " + additionalClasses}>
			<div className="header">
				{this.getHeader()}
			</div>
			<div className={"choices"}>
				{this.getButtons()}
			</div>
		</BasePage>;
	}

	public componentDidMount() {
		if (this.highlightRightWrong) {
			this.additionalClasses.add("highlightRightWrong");
		}
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
		const props = this.props;
		const sharedData = props.sharedData;
		const oneBasedIndex = index + 1;
		const isRightAnswer = oneBasedIndex === props.rightAnswer;
		const results = { [ this.props.id ]: value };
		const newSharedData: SharedData = isRightAnswer ? {} : { wrongAnswers: Object.assign({}, sharedData.wrongAnswers, results) };
		let delay = 0;  // Delay between selected answer and transition to next page

		if (this.state.disabled) {
			return;
		}
		if (this.highlightRightWrong) {
			delay = 1000;
			console.log("answer ", isRightAnswer ? null : oneBasedIndex);
			this.setState({
				wrongAnswer: isRightAnswer ? null : oneBasedIndex,
				selectedAnswer: index,
			});
		}

		if (props.amount && isRightAnswer) {
			newSharedData.earnedAmount = (sharedData.earnedAmount || 0) + (props.amount as number);
		}
		props.updateSharedDate(newSharedData);
		this.setState({ disabled: true, selectedAnswer: index }, () => {
			setTimeout(this.props.onSelected.bind(this.props, results), delay);
		});
	}

}
