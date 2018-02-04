package com.kin.wallet.web;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.kin.wallet.webview.WalletWebView;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by nitzantomer on 31/01/2018.
 */

public class JsInterface implements NativeInterface.ExecutionResultListener {
	private static AtomicInteger executionCounter = new AtomicInteger();

	private final WalletWebView webView;
	private final Map<String, ExecutionResult> resultHandlers;

	@Override
	public void onJsExecutionResult(String executionId, String result) {
		if (!this.resultHandlers.containsKey(executionId)) {
			return;
		}

		this.resultHandlers.remove(executionId).put(result);
	}

	/* package */ JsInterface(final WalletWebView webView) {
		this.webView = webView;
		this.resultHandlers = new HashMap<>();
	}

	/* package */ Future<String> execute(final String jsMethodName) {
		final ExecutionResult result = new ExecutionResult();
		final String id = String.valueOf(executionCounter.incrementAndGet());
		final StringBuilder jsBuffer = new StringBuilder(jsMethodName);
		jsBuffer.append("(\"").append(id).append("\"").append(')');

		final String js = jsBuffer.toString();

		this.resultHandlers.put(id, result);

		//this.webView.handler.post(new Runnable() {
		new Handler(Looper.getMainLooper()).post(new Runnable() {
			@Override
			public void run() {
				Log.d("moo", "ARGH!!");
				webView.loadUrl("http://www.google.com");
			}
		});
		/*this.webView.handler.post(new Runnable() {
			@Override
			public void run() {
				Log.d("WalletNative", "JsInterface, executing: " + js);
				*//*if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT) {
					webView.evaluateJavascript("alert('here 1?');", null);
					webView.evaluateJavascript(js, null);
				} else {
					webView.loadUrl("javascript:alert('here 2?');");
					webView.loadUrl("javascript:" + js);
				}*//*
				//webView.loadUrl("javascript:alert('here?');");
				webView.loadUrl("http://www.google.com");
				//webView.loadUrl("javascript:" + js);
			}
		});*/

		return result;
	}

	private static class ExecutionResult implements Future<String> {
		private final CountDownLatch latch = new CountDownLatch(1);
		private String value;

		@Override
		public boolean cancel(boolean mayInterruptIfRunning) {
			return false;
		}

		@Override
		public boolean isCancelled() {
			return false;
		}

		@Override
		public boolean isDone() {
			return this.latch.getCount() == 0;
		}

		@Override
		public String get() throws InterruptedException {
			this.latch.await();
			return this.value;
		}

		@Override
		public String get(long timeout, TimeUnit unit) throws InterruptedException, TimeoutException {
			if (latch.await(timeout, unit)) {
				return this.value;
			} else {
				throw new TimeoutException();
			}
		}

		// calling this more than once doesn't make sense, and won't work properly in this implementation. so: don't.
		void put(String result) {
			if (this.value != null) {
				throw new RuntimeException("value already set");
			}

			this.value = result;
			this.latch.countDown();
		}
	}
}
