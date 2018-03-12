import * as React from "react";
import  SwipeableViews, { SwipeableViewsProps } from 'react-swipeable-views';

const carouselSettings: any = {
	disabled: true,
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
