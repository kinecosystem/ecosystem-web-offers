package com.kin.wallet.web;

import com.kin.wallet.model.KinAccount;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

/**
 * Created by nitzantomer on 31/01/2018.
 */

public class WebAccount implements KinAccount {
	private final JsInterface jsInterface;

	public WebAccount(final JsInterface jsInterface) {
		this.jsInterface = jsInterface;
		try {
			this.jsInterface.execute("kin.account.create").get();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		}
	}

	@Override
	public String getPublicAddress() {
		//return this.jsInterface.execute("kin.account.publicAddress");
		return null;
	}
}
