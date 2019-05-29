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
	started: boolean;  // still needed?
	time: number;
}

const getImageUrl = (imageName: string) => `https://s3.amazonaws.com/htmlpoll.kinecosystem.com/images/${imageName}.svg`;

class Timer extends React.Component<TimerProps, TimerState> {
	constructor(props: TimerProps) {
		super(props);
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

	public componentDidMount() {  // First timer won"t get componentDidUpdate
		setTimeout(this.updateTime, 1000);
	}

	private updateTime() {
		const newTime = this.props.pause ? this.state.time : this.state.time - 1;
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
		this.additionalClasses.add("timed");
		this.highlightRightWrong = true;
	}

	protected getHeader() {
		const currentPage = this.props.pageIndex + 1;
		/* the list is 0 based */
		const totalQuestionPages = this.props.totalPagesCount - 1;
		/* the list contains a Thank you page --- a better solution is better */
		return (
			<React.Fragment>
				<div className="header-controls">
					<button className="close-btn" onClick={this.props.close}><img src={ getImageUrl("close-btn") } /></button>
					<Timer parent={this.props.pageIndex} pause={!this.props.isDisplayed} time={quizTimerTime} callback={this.onSelect.bind(this, null, -1)}/>
					<div className="pageProgress">{currentPage}/{totalQuestionPages}</div>
				</div>
				<p className="title">{this.props.title}</p>
				<div className="description">{ this.props.rewardText }
				{ this.props.rewardValue &&
				 <span className="description-price"><span className="full-width-plus">＋</span><img src={ getImageUrl("kin-coin") } />{ Number(this.props.rewardValue) }</span>
				}
				</div>
			</React.Fragment>
		);
	}

	protected getButtons() {
		return this.props.choices.map((value: any, index: number) => {
			const additionalClasses = this.getAdditionalButtonClasses(value, index);
			const clickCb = this.onSelect.bind(this, index);
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
