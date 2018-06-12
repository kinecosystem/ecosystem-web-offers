import * as React from "react";
import { FullPageMultiChoiceProps, MultichoiceQuestion } from "./multichoice.question";

import "../../../../styles/src/page/timed.multichoice.question.styl";

const quizTimerTime = 300;
const quizTimerWarnAt = 5;

interface TimerProps {
	time: number;

	callback(): void;
}

class Timer extends React.Component<TimerProps, any> {
	constructor(props: TimerProps) {
		super(props);
		this.state = {
			started: false,
			time: this.props.time,
		};
	}

	public componentDidUpdate() {
		if (!this.state.started) {
			setTimeout(this.updateTime.bind(this), 1000);
		}
	}

	public render() {
		const time = this.state.time;
		const formatted = new Date(1000 * time).toISOString().substr(14, 5);
		return (
			<div className={"timer " + (time < quizTimerWarnAt ? "warn" : "")}>
				<div>{formatted}</div>
			</div>
		);
	}

	private updateTime() {
		const newTime = this.state.time - 1;
		if (newTime === 0) {
			this.props.callback();
			return;
		}

		this.setState({ time: newTime, started: true }, () => setTimeout(this.updateTime.bind(this), 1000));
	}
}

class TimedMultichoiceQuestion extends MultichoiceQuestion {
	constructor(props: FullPageMultiChoiceProps) {
		super(props);
		this.additionalClasses = "timed";
		this.highlightRightWrong = true;
	}

	protected getHeader() {
		return (
			<React.Fragment>
				<Timer time={quizTimerTime} callback={this.onSelect.bind(this, null)}/>
				<div className={"pageProgress"}>{this.props.currentPage + 1 /* the list is 0 based */}/{this.props.totalPagesCount - 1 /* the list contains a Thank you page */}</div>
				<div className="title">{this.props.title}</div>
			</React.Fragment>
		);
	}

	protected getButtons() {
		return this.props.choices.map((value: any, index: number) => {
			const additionalClasses = this.getAdditionalButtonClasses(value, index);
			return <button key={index} className={"choice " + additionalClasses} disabled={this.state.disabled} onClick={this.onSelect.bind(this, value, index)}>{value} <span className={"receivedAmount"}>+{this.props.amount}</span></button>;
		});
	}

}

export default TimedMultichoiceQuestion;
