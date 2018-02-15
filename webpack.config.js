const path = require("path");
const webpack = require("webpack");
const { getIfUtils, removeEmpty } = require("webpack-config-utils");

// variables
const outPath = path.join(__dirname);
const htmlPath = path.join(__dirname, "html");

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const stylus_plugin = require('stylus_plugin');

const htmlTemplate = path.join(htmlPath, "index.html");

module.exports = env => {
	const { ifNotProd } = getIfUtils(env || {});
	// get boolean value to use directly in flag configuration;
	const isNotProd = ifNotProd(true, false);

	const mod = {
		entry: removeEmpty({
			main: path.join(__dirname, "scripts", "bin", "index.js"),
		}),
		output: {
			path: outPath,
			filename: "[name].bundle.js",
			pathinfo: isNotProd,
			publicPath: "/"
		},
		module: {
			noParse: [/\.min\.js$/, /\.bundle\.js$/],
			rules: [{
				test: /\.styl$/,
				use: [
					"style-loader",
					"css-loader",
					"stylus-loader"
				]
			}]
		},
		resolve: {
			extensions: [".ts", ".js"],
			mainFields: ["module", "browser", "main"]
		},
		target: "web",
		plugins: [new HtmlWebpackPlugin({
			template: htmlTemplate,
		})]
	};

	if (isNotProd) {
		mod.devtool = "eval";
	}

	return mod;
};
