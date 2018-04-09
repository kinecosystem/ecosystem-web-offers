import * as React from "react";
import BasePage from "./base";
import "../../../../styles/src/page/multichoice.question.styl";
import { ButtonHTMLAttributes } from "react";

export interface FullPageMultiChoiceProps {
	id: string;
	title: string;
	description: string;
	choices: string[];
	onSelected: (answerData: {}) => void;
}

export interface FullPageMultiChoiceState {
	disabled: boolean;
}

class MultichoiceQuestion extends React.Component<FullPageMultiChoiceProps, FullPageMultiChoiceState> {
	private buttons: JSX.Element[] = [];

	private constructor(props: FullPageMultiChoiceProps) {
		super(props);
		this.state = {
			disabled: false,
		};
	}

	private onSelect(value: string) {
		{
			if (this.state.disabled) {
				return;
			}
			this.setState({ disabled: true }, () => {
				this.props.onSelected({ [ this.props.id ]: value });
			});
		}
	}

	public render() {
		this.buttons = this.props.choices.map((value: string, index: number) => {
			return <button key={index} className="choice" disabled={ this.state.disabled } onClick={this.onSelect.bind(this, value)}>{value}</button>;
		});
		return <BasePage className="question multichoice">
			<div className="header">
				<div className="title">{this.props.title}</div>
				<div className="description" dangerouslySetInnerHTML={{ __html: this.props.description }}/>
			</div>
			<div className={"choices"}>
				{this.buttons}
			</div>
		</BasePage>;
	}
}

export default MultichoiceQuestion;
