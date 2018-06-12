import * as React from "react";

import "../../../../styles/src/page/base.styl";

export interface BasePageProps {
	className: string;
}

export default class Page extends React.Component<any, BasePageProps> {
	public render() {
		return <div className={"page " + this.props.className}>{this.props.children}</div>;
	}
}
