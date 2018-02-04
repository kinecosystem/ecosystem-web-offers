declare module "stellar-sdk" {
	declare class Keypair {
		static random(): Keypair;

		publicKey(): string;
	}
}