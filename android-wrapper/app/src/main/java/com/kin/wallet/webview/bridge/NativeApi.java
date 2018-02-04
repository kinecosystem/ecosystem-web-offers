package com.kin.wallet.webview.bridge;

import android.util.Log;
import android.webkit.JavascriptInterface;

import com.kin.wallet.webview.WalletWebView;

/**
 * Created by nitzantomer on 01/02/2018.
 */

public class NativeApi {
	private final WalletWebView webView;
	private final JavascriptApi javascriptApi;

	public NativeApi(final WalletWebView webView, final JavascriptApi javascriptApi) {
		this.webView = webView;
		this.javascriptApi = javascriptApi;
	}

	@JavascriptInterface
	public void loaded() {
		Log.d("NativeApi", "loaded()");
		this.webView.loaded();
	}

	@JavascriptInterface
	public void handleExecutionResult(final String executionId, final String result) {
		Log.d("NativeApi", "handleExecutionResult(\"" + executionId + "\", \"" + result + "\")");
		this.javascriptApi.handleExecutionResult(executionId, result);
	}

	@JavascriptInterface
	public void handleExecutionError(final String executionId, final String error) {
		Log.d("NativeApi", "handleExecutionError(\"" + executionId + "\", \"" + error + "\")");
		this.javascriptApi.handleExecutionError(executionId, error);
	}
}
