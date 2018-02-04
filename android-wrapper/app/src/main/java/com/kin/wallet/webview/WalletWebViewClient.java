package com.kin.wallet.webview;

import android.util.Log;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by nitzantomer on 31/01/2018.
 */

public class WalletWebViewClient extends WebViewClient {
	@Override
	public void onPageFinished(WebView view, String url) {
		Log.d("WalletWebViewClient", "onPageFinished(WEB_VIEW, \"" + url + "\")");
		//((WalletWebView) view).loaded();
	}

	@Override
	public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
		Log.d("WalletWebViewClient", "onReceivedError(WEB_VIEW, REQUEST, \"" + error.toString() + "\")");
	}
}
