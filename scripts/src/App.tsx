import * as React from "react";

import Carousel from "./ui/container/carousel";
import * as  bridge from "./bridge";
import FinalPage from "./ui/page/final";
import ImageAndTextPage from "./ui/page/imageAndText";
import FullPageMultiChoice from "./ui/page/multichoice.question";

import "../../styles/src/app.styl";

export interface AppState {
	pages: any;
	currentPage: number;
	isComplete: boolean;
	data: {};
}

enum PageType {
	"FullPageMultiChoice",
	"ImageAndText",
	"Html",
}

let pages: any = [];

function setRenderPollHandler(callback: () => void) {
	window.kin.renderPoll = data => {
		console.log("In renderPoll:" + JSON.stringify(data));
		pages = data.pages.map((item: any) => {
			if (item.question) {
				item.question.choices = item.question.answers;
			}
			return item;
		});
		callback();
		return;
	};
}

class App extends React.Component {
	public state: AppState;

	constructor(props: any) {
		super(props);
		setRenderPollHandler(() => {
			console.log("renderPoll callback:", pages);
			this.setState({ pages });
		});
		bridge.notifyPageLoaded();
		this.state = {
			pages,
			currentPage: 0,
			isComplete: false,
			data: {},
		};
		this.onPageCompleteHandler = this.onPageCompleteHandler.bind(this);
	}

	public render() {
		console.log("current page:", this.state.currentPage);
		return (
			<div
				className="app">
				<Carousel selectedItem={this.state.currentPage}>
					{this.renderPages()}
				</Carousel>
			</div>
		);
	}

	private onPageCompleteHandler(answerData: any) {
		const allData: any = Object.assign({}, this.state.data, answerData);  // todo pollyfill Object.assign
		const newPageIndex = this.state.currentPage + 1;
		const isComplete = this.state.currentPage === (this.state.pages.length - 1);
		console.log("current: %s, new page: %s, isComplete: %s", this.state.currentPage, newPageIndex, isComplete);
		if (isComplete) {
			if (Object.keys(allData)) {
				console.log("submit " + JSON.stringify(allData));
				bridge.submitResult(allData);
			}
			return bridge.close();
		}
		this.setState({
			currentPage: newPageIndex,
			data: allData,
			isComplete,
		});

	}

	private renderPages() {
		return this.state.pages.map((page: any, index: number) => {
			switch (page.type) {
				case PageType.FullPageMultiChoice:
					return <FullPageMultiChoice key={index} choices={page.question.choices} id={page.question.id} title={page.title} description={page.description} onSelected={this.onPageCompleteHandler}/>;
				case PageType.Html:
					return <FinalPage key={index} doneBtnCallback={bridge.close}/>;
				case PageType.ImageAndText:
					return <ImageAndTextPage key={index} id={page.id} image={page.image} title={page.title} footerHtml={page.footerHtml} bodyHtml={page.bodyHtml} buttonText={page.buttonText} onBtnClick={this.onPageCompleteHandler}/>;
			}
		});
	}
}

export default App;
