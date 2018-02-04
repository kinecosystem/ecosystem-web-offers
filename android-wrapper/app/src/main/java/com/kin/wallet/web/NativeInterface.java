package com.kin.wallet.web;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by nitzantomer on 31/01/2018.
 */

public class NativeInterface {
	/* package */ interface ExecutionResultListener {
		void onJsExecutionResult(String executionId, String result);
	}

	//private final WalletWebView.Manager manager;
	private final ExecutionResultListener executionResultListener;

	/* package */ //NativeInterface(final WalletWebView.Manager manager, final ExecutionResultListener executionResultListener) {
	/* package */ NativeInterface(final ExecutionResultListener executionResultListener) {
		//this.manager = manager;
		this.executionResultListener = executionResultListener;
	}

	/*@JavascriptInterface
	public void loaded() {
		this.manager.loaded();
	}

	@JavascriptInterface
	public void showToast(final String toast) {
		Toast.makeText(this.manager.context(), toast, Toast.LENGTH_SHORT).show();
	}*/

	@JavascriptInterface
	public void handleExecutionResult(final String executionId, final String result) {
		this.executionResultListener.onJsExecutionResult(executionId, result);
	}
}
