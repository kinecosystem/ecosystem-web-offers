package com.kin.wallet;

import android.os.Handler;
import android.os.Looper;

/**
 * Created by nitzantomer on 03/02/2018.
 */

public class Utils {
	private static final Handler MAIN_HANDLER = new Handler(Looper.getMainLooper());;

	public static boolean onMainThread() {
		return Looper.myLooper() == Looper.getMainLooper();
	}

	public static void executeOnMainThread(final Runnable runnable) {
		MAIN_HANDLER.post(runnable);
	}

	public static void executeOnMainThread(final Runnable runnable, final long delay) {
		MAIN_HANDLER.postDelayed(runnable, delay);
	}

	public static abstract class MainThreadRunnable implements Runnable {
		@Override
		public void run() {
			if (onMainThread()) {
				this.runOnMainThread();
			} else {
				executeOnMainThread(new Runnable() {
					@Override
					public void run() {
						MainThreadRunnable.this.runOnMainThread();
					}
				});
			}
		}

		protected abstract void runOnMainThread();
	}
}
