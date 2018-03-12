import * as React from "react";
import BasePage from "./base";

import "../../../../styles/src/page/final.styl";

export interface FinalPageProps {
	doneBtnCallback?: () => void;
}

class Final extends React.Component<any, FinalPageProps> {
	public render() {
		return <BasePage className={"final"}>
				<img src={"https://s3.amazonaws.com/htmlpoll.kinecosystem.com/pencil.svg"} className={"pencil"}/>
				<div className={"caption"}>Thank You!</div>
				<div className={"caption small"}>Your 4,000 Kin are on their way...</div>
				<button className={"doneBtn"} onClick={ this.props.doneBtnCallback }>Done</button>
		</BasePage>;
	}
}

export default Final;
