package com.kin.wallet;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.kin.wallet.webview.WalletWebView;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
	private KinClient kinClient;
	private WalletWebView webView;

	private View initPanel;
	private View walletPanel;
	private View noWalletPanel;
	private TextView walletAddressText;
	private Button noWalletCreateButton;

	@Override
	protected void onCreate(final Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.setContentView(R.layout.activity_main);

		this.initPanel = this.findViewById(R.id.init_panel);
		this.walletPanel = this.findViewById(R.id.wallet_panel);
		this.noWalletPanel = this.findViewById(R.id.no_wallet_panel);
		this.walletAddressText = this.findViewById(R.id.wallet_address);
		this.noWalletCreateButton = this.findViewById(R.id.no_wallet_create_button);
		this.noWalletCreateButton.setOnClickListener(this);

		this.webView = findViewById(R.id.wallet_web_view);
		this.kinClient = new KinClient(webView);
		this.kinClient.ready().thenRun(this.checkAccount());
	}

	@Override
	public void onClick(final View view) {
		if (view.equals(this.noWalletCreateButton)) {
			this.kinClient.createAccount().thenRun(this.checkAccount());
		}
	}

	private Runnable checkAccount() {
		return new Utils.MainThreadRunnable() {
			@Override
			protected void runOnMainThread() {
				initPanel.setVisibility(View.GONE);

				if (kinClient.hasAccount()) {
					noWalletPanel.setVisibility(View.GONE);
					walletPanel.setVisibility(View.VISIBLE);
					walletAddressText.setText(kinClient.getAccount().getPublicAddress());
				} else {
					walletPanel.setVisibility(View.GONE);
					noWalletPanel.setVisibility(View.VISIBLE);
				}
			}
		};
	}
}
