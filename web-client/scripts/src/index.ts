/// <reference path="../lib/native-bridge.d.ts" />

//import "./android";
import "./bridge";
import "./account";
import "./output";

import { append } from "./output";

console.log("web wallet loaded");

(window as any).doit = function(id: string) {
	console.log("DOIT! " + id);

	append("hey hey");
}

document.addEventListener("DOMContentLoaded", () => {
	document.body.style.backgroundColor = "#1e1e1e";
	document.body.style.color = "#7b7b7b";
	document.body.style.color = "#7b7b7b";

	KinNative.loaded();
});