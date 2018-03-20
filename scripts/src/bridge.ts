/****
	KinNative:
    loaded(): void;
    handleResult(data: any): void;
    handleCancel(): void;
****/

declare var KinNative: {
	[key: string]: (...data: any[]) => void;
};

declare global {
	interface Window {
		kin: { renderPoll: (data: any) => void };
		webkit: any;
	}
}


function callNativeMethod(methodName: string, ...payload: any[]) {
	console.log("calling method", methodName);
	if (KinNative && methodName in KinNative) {
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

export function close() {
	console.log("Requesting to close");
	callNativeMethod("handleCancel");
}

window.kin = window.kin || {};
console.log("window.kin:", window.kin);
