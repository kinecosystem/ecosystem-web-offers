import * as React from "react";
import SwipeableViews, { SwipeableViewsProps } from "react-swipeable-views";

const carouselSettings: any = {
	disabled: true,
	springConfig: { duration: "0.7s", easeFunction: "cubic-bezier(0.15, 0.3, 0.25, 1)", delay: "0.1s" },
};

class Carousel extends React.Component<any, {}> {
	public render(): any {
		return (
			<SwipeableViews className={"carouselWrapper"} index={this.props.selectedItem} {...carouselSettings} >
				{this.props.children}
			</SwipeableViews>
		);
	}
}

export default Carousel;
