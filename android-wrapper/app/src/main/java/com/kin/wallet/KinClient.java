package com.kin.wallet;

import com.kin.wallet.model.KinAccount;
import com.kin.wallet.webview.WalletWebView;
import com.kin.wallet.webview.bridge.JavascriptApi;
import com.kin.wallet.webview.model.AccountProxy;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.function.Consumer;
import java.util.function.Function;

/**
 * Created by nitzantomer on 31/01/2018.
 */

public class KinClient {
	private final WalletWebView webView;
	private final JavascriptApi javascriptApi;
	private final CompletableFuture<Void> readyFuture;

	private KinAccount account;

	public KinClient(final WalletWebView webView) {
		this.webView = webView;
		this.readyFuture = new CompletableFuture<>();
		this.javascriptApi = webView.getJavascriptApi();

		webView.load()
				.thenCompose(new Function<Void, CompletionStage<AccountProxy>>() {
					@Override
					public CompletionStage<AccountProxy> apply(Void aVoid) {
						return AccountProxy.load(KinClient.this.javascriptApi);
					}
				}).thenAccept(new Consumer<AccountProxy>() {
					@Override
					public void accept(AccountProxy account) {
						if (account != null) {
							KinClient.this.account = account;
						}

						KinClient.this.readyFuture.complete(null);
					}
				});
	}

	public CompletableFuture<Void> ready() {
		return this.readyFuture;
	}

	public boolean hasAccount() {
		return this.account != null;
	}

	public KinAccount getAccount() {
		return this.account;
	}

	public CompletableFuture<KinAccount> createAccount() {
		return AccountProxy.create(this.javascriptApi).thenApply(new Function<KinAccount, KinAccount>() {
			@Override
			public KinAccount apply(final KinAccount kinAccount) {
				return KinClient.this.account = kinAccount;
			}
		});
	}
}
