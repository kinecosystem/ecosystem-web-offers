package com.kin.wallet.webview;

import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.kin.wallet.webview.bridge.JavascriptApi;
import com.kin.wallet.webview.bridge.NativeApi;

import java.util.concurrent.CompletableFuture;

/**
 * Created by nitzantomer on 31/01/2018.
 */

public class WalletWebView extends WebView {
	private final NativeApi nativeApi;
	private final JavascriptApi javascriptApi;
	private final WalletWebViewClient webClient;
	private final WalletWebChromeClient chromeClient;
	private final CompletableFuture<Void> loadedFuture;

	public WalletWebView(Context context) {
		this(context, null);
	}

	public WalletWebView(Context context, AttributeSet attrs) {
		this(context, attrs, 0);
	}

	public WalletWebView(Context context, AttributeSet attrs, int defStyle) {
		super(context, attrs, defStyle);
		this.loadedFuture = new CompletableFuture<>();

		this.webClient = new WalletWebViewClient();
		this.setWebViewClient(this.webClient);

		this.chromeClient = new WalletWebChromeClient(context);
		this.setWebChromeClient(this.chromeClient);

		final WebSettings settings = this.getSettings();
		settings.setJavaScriptEnabled(true);

		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
			settings.setAllowUniversalAccessFromFileURLs(true);
			settings.setAllowFileAccessFromFileURLs(true);
		}

		this.javascriptApi = new JavascriptApi(this);

		this.nativeApi = new NativeApi(this, this.javascriptApi);
		this.addJavascriptInterface(this.nativeApi, "KinNative");
	}

	public CompletableFuture<Void> load() {
		Log.d("WalletWebView", "load()");
		this.loadUrl("file:///android_res/raw/android.html");
		return this.loadedFuture;
	}

	public void loaded() {
		Log.d("WalletWebView", "loaded()");
		this.loadedFuture.complete(null);
	}

	public JavascriptApi getJavascriptApi() {
		return this.javascriptApi;
	}
}
