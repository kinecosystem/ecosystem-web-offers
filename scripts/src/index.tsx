import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import "../../styles/src/index.styl";
import "./i18n";

ReactDOM.render(
	<App/>,
	document.getElementById("root") as HTMLElement,
);
