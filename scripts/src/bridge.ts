declare var KinNative: {
	loaded(): void;
	handleResult(data: any): void;
	handleCancel(): void;
};

export function notifyPageLoaded() {
	KinNative.loaded();
}

export function submitResult(data: any) {
	console.log ("Submitting data:", data);
	KinNative.handleResult(JSON.stringify(data));
}

export function close() {
	console.log ("Requesting to close");
	KinNative.handleCancel();
}

declare global {
	interface Window {
		kin: { renderPoll: (data: any) => void };
	}
}

window.kin = window.kin || {};
console.log("window.kin:", window.kin);
