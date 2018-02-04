package com.kin.wallet.webview;

import android.content.Context;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Toast;

/**
 * Created by nitzantomer on 31/01/2018.
 */

public class WalletWebChromeClient extends WebChromeClient {
	private final Context context;

	/* package */ WalletWebChromeClient(final Context context) {
		this.context = context;
	}

	@Override
	public boolean onConsoleMessage(final ConsoleMessage consoleMessage) {
		Log.d("WalletWebChromeClient", "onConsoleMessage(\"" + consoleMessage.message() + "\")");
		return true;
	}

	@Override
	public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
		Log.d("WalletWebChromeClient", "onJsAlert(WEB_VIEW, \"" + url + "\"), \"" + message + "\", RESULT)");
		Toast.makeText(this.context, message, Toast.LENGTH_SHORT).show();
		return true;
	}
}
