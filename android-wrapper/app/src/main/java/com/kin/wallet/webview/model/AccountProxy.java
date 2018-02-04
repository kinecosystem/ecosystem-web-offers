package com.kin.wallet.webview.model;

import com.kin.wallet.model.KinAccount;
import com.kin.wallet.webview.bridge.JavascriptApi;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.Future;
import java.util.function.Function;

/**
 * Created by nitzantomer on 03/02/2018.
 */

public class AccountProxy implements KinAccount {
	public static CompletableFuture<AccountProxy> load(final JavascriptApi javascriptApi) {
		return javascriptApi.execute("account.has").thenApply(new Function<String, AccountProxy>() {
			@Override
			public AccountProxy apply(final String has) {
				return null;
			}
		});
	}

	public static CompletableFuture<KinAccount> create(final JavascriptApi javascriptApi) {
		return javascriptApi.execute("account.create").thenApply(new Function<String, KinAccount>() {
			@Override
			public AccountProxy apply(final String accountJson) {
				try {
					return new AccountProxy(new JSONObject(accountJson));
				} catch (JSONException e) {
					throw new CompletionException(e);
				}
			}
		});
	}

	private String address;

	private AccountProxy(final JSONObject json) {
		try {
			this.address = json.getString("address");
		} catch (JSONException e) {
			throw new RuntimeException("json problem");
		}
	}

	@Override
	public String getPublicAddress() {
		return this.address;
	}
}
