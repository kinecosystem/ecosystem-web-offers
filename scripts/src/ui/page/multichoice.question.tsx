import * as React from "react";
import BasePage from "./base";
import "../../../../styles/src/page/multichoice.question.styl";

export interface FullPageMultiChoiceProps {
	id: string;
	title: string;
	choices: string[];
	onSelected?: (answerData: {}) => void;
}

class MultichoiceQuestion extends React.Component<any, FullPageMultiChoiceProps> {
	public render() {
		const choices = this.props.choices.map((value: string, index: number) => {
			return <button key={index} className={"choice"} onClick={() => {
				this.props.onSelected({ [ this.props.id ]: value });
			}}>{value}</button>;
		});
		return <BasePage className={"question multichoice"}>
				<div className={"header"}>
					<div className={"title"}>{this.props.title}</div>
					<div className={"description"} dangerouslySetInnerHTML={{__html: this.props.description}}></div>
				</div>
				<div className={"choices"}>
					{choices}
				</div>
		</BasePage>;
	}
}

export default MultichoiceQuestion;
