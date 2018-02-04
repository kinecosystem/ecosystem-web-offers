/*
import {
	has as hasAccount,
	get as getAccount,
	create as createAccount } from "./account";

export type AccountApi = {
	has(): boolean;
	create(): boolean;
	publicAddress(): string;
}

export type KinApi = {
	account: AccountApi;
}

declare global {
	interface Window {
		kin: KinApi;
	}
}

if (!window.kin) {
	window.kin = {} as KinApi;
}

window.kin.account = {
	has: () => {
		console.log("android.has");
		return hasAccount();
	},
	create: () => {
		console.log("android.create");
		return createAccount() != null;
	},
	publicAddress: () => {
		console.log("android.publicAddress");
		return getAccount()!.getPublicAddress();
	}
};
*/
