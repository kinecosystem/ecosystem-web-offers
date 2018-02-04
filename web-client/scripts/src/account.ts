import { Keypair } from "stellar-sdk";
import { listen } from "./bridge";

let account: KinAccount | null = null;

export interface KinAccount {
	getPublicAddress(): string;
}

export function get(): KinAccount | null {
	console.log("account.get");
	return account;
}

class AccountImpl implements KinAccount {
	private readonly keypair: Keypair;

	constructor() {
		console.log("account.AccountImpl.ctor");
		this.keypair = Keypair.random();
	}

	getPublicAddress() {
		console.log("account.AccountImpl.getPublicAddress");
		return this.keypair.publicKey();
	}
}

listen("account.has", () => account !== null);
listen("account.create", () => {
	if (account !== null) {
		throw "account already exists";
	}

	account = new AccountImpl();
	return {
		address: account.getPublicAddress()
	}
});
