import * as React from "react";
import { FullPageMultiChoiceProps, MultichoiceQuestion } from "./multichoice.question";

import "../../../../styles/src/page/timed.multichoice.question.styl";

const quizTimerTime = 10;
const quizTimerWarnAt = 5;

interface TimerProps {
	time: number;
	parent: number;
	pause: boolean;

	callback(): void;
}

interface TimerState {
	started: boolean;
	time: number;
}

class Timer extends React.Component<TimerProps, TimerState> {
	constructor(props: TimerProps) {
		super(props);
		console.log("timer constructor, props:", props);
		this.updateTime = this.updateTime.bind(this);
		this.state = {
			started: false,
			time: this.props.time,
		};
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

	public componentDidUpdate() {
		console.log("Timer componentDidUpdate, state.started %s, parent %s", this.state.started, this.props.parent);
		if (!this.state.started) {
			setTimeout(this.updateTime, 1000);
		}
	}

	private updateTime() {
		if (this.props.pause) {
			return;
		}
		console.log("timer updateTime", this.state, this.props.parent);
		const newTime = this.state.time - 1;
		if (newTime === 0) {
			this.props.callback();
			return;
		}

		this.setState({ time: newTime, started: true }, () => setTimeout(this.updateTime, 1000));
	}
}

class TimedMultichoiceQuestion extends MultichoiceQuestion {
	constructor(props: FullPageMultiChoiceProps) {
		super(props);
		this.additionalClasses = "timed";
		this.highlightRightWrong = true;
	}

	protected getHeader() {
		const currentPage = this.props.pageIndex + 1;
		/* the list is 0 based */
		const totalQuestionPages = this.props.totalPagesCount - 1;
		/* the list contains a Thank you page --- a better solution is better */
		return (
			<React.Fragment>
				<Timer parent={this.props.pageIndex} pause={!this.props.isDisplayed} time={quizTimerTime} callback={this.onSelect.bind(this, null, -1)}/>
				<div className={"pageProgress"}>{currentPage}/{totalQuestionPages}</div>
				<div className="title">{this.props.title}</div>
			</React.Fragment>
		);
	}

	protected getButtons() {
		return this.props.choices.map((value: any, index: number) => {
			const additionalClasses = this.getAdditionalButtonClasses(value, index);
			const clickCb = this.onSelect.bind(this, value, index);
			return (
				<button key={index} className={"choice " + additionalClasses} disabled={this.state.disabled} onClick={clickCb}>
					{value}
					<span className={"receivedAmount"}>+{this.props.amount}</span>
				</button>
			);
		});
	}

}

export default TimedMultichoiceQuestion;
