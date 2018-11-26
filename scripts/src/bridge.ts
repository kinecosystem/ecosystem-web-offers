/****
	KinNative:
    loaded(): void;
    handleResult(data: any): void;
    handleCancel(): void;
****/

export type KinNative = {
	[key: string]: (...data: any[]) => void;
};

declare var KinNative: KinNative;

declare global {
	interface Window {
		kin: { renderPoll: (data: any) => void };
		webkit: any;
		KinNative: KinNative;
	}
}

function callNativeMethod(methodName: string, ...payload: any[]) {
	console.log("calling method", methodName);
	if (window.KinNative && methodName in KinNative) {
		return KinNative[ methodName ](...payload);
	}
	if (window.webkit && window.webkit.messageHandlers && methodName in window.webkit.messageHandlers) {
		return window.webkit.messageHandlers[ methodName ].postMessage(payload);
	}
	throw new Error("Couldn't find a native bridge interface");
}

export function notifyPageLoaded() {
	console.log("loaded");
	callNativeMethod("loaded");
}

export function submitResult(data: any) {
	console.log("Submitting data:", data);
	callNativeMethod("handleResult", JSON.stringify(data));
}

export function hideTopBar() {
	console.log("Requesting to hide the native top bar");
	callNativeMethod("displayTopBar", false);
}

export function showTopBar() {
	console.log("Requesting to show the native top bar");
	callNativeMethod("displayTopBar", true);
}

export function cancel() {
	console.log("Requesting to Cancel");
	callNativeMethod("handleCancel");
}

export function close() {
	console.log("Requesting to close");
	callNativeMethod("handleClose");
}

window.kin = window.kin || {};
console.log("window.kin:", window.kin);
