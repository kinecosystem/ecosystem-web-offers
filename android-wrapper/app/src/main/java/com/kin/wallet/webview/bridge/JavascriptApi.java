package com.kin.wallet.webview.bridge;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.WebView;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by nitzantomer on 01/02/2018.
 */

public class JavascriptApi {
	private static final int POOL_SIZE = 2;
	private static final ExecutorService POOL = Executors.newFixedThreadPool(POOL_SIZE);
	private static final AtomicInteger EXECUTION_COUNTER = new AtomicInteger();

	private final WebView webView;
	private final Map<String, CompletableFuture<String>> resultFutures;

	public JavascriptApi(final WebView webView) {
		this.webView = webView;
		this.resultFutures = new HashMap<>();
	}

	public CompletableFuture<String> execute(final String jsMethodName) {
		final CompletableFuture<String> result = new CompletableFuture<>();

		if (Looper.getMainLooper().getThread() != Thread.currentThread()) {
			new Handler(Looper.getMainLooper()).post(new Runnable() {
				@Override
				public void run() {
					execute(result, jsMethodName);
				}
			});

			return result;
		}
		execute(result, jsMethodName);

		return result;
	}

	public void handleExecutionResult(final String executionId, final String executionResult) {
		Log.d("JavascriptApi", "handleExecutionResult(\"" + executionId + "\", \"" + executionResult + "\")");

		if (!this.resultFutures.containsKey(executionId)) {
			return;
		}

		POOL.execute(new Runnable() {
			@Override
			public void run() {
				JavascriptApi.this.resultFutures.remove(executionId).complete(executionResult);
			}
		});
	}

	public void handleExecutionError(final String executionId, final String message) {
		Log.d("JavascriptApi", "handleExecutionError(\"" + executionId + "\", \"" + message + "\")");

		if (!this.resultFutures.containsKey(executionId)) {
			return;
		}

		POOL.execute(new Runnable() {
			@Override
			public void run() {
				JavascriptApi.this.resultFutures.remove(executionId).completeExceptionally(new Exception(message));
			}
		});
	}

	private void execute(final CompletableFuture<String> future, final String name) {
		Log.d("JavascriptApi", "execute(FUTURE, \"" + name + "\")");

		final String id = String.valueOf(EXECUTION_COUNTER.incrementAndGet());
		final String js = new StringBuilder("javascript:kin.execute({")
				.append("id:\"").append(id).append("\",")
				.append("name:\"").append(name).append("\"")
				.append("})")
				.toString();
		Log.d("JavascriptApi", "executing " + js);

		this.resultFutures.put(id, future);
		if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT) {
			webView.evaluateJavascript(js, null);
		} else {
			this.webView.loadUrl(js);
		}
	}
}
