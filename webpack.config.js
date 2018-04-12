const path = require("path");
const webpack = require("webpack");
const {getIfUtils, removeEmpty} = require("webpack-config-utils");

// variables
const outPath = path.join(__dirname);
const htmlPath = path.join(__dirname, "html");

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlTemplate = path.join(htmlPath, "index.html");

module.exports = env => {
	const {ifNotProd} = getIfUtils(env || {});
	// get boolean value to use directly in flag configuration;
	const isNotProd = ifNotProd(true, false);

	const mod = {
		entry: ["babel-polyfill", path.join(__dirname, "scripts", "src", "index.tsx")],
		output: {
			path: outPath,
			filename: "[name].bundle.js",
			pathinfo: isNotProd,
			publicPath: "/"
		},
		module: {
			noParse: [/\.min\.js$/, /\.bundle\.js$/],
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.styl$/,
					use: [
						"style-loader",
						"css-loader",
						"stylus-loader"
					]
				}, {
					test: /\.css$/,
					use: [
						"style-loader",
						"css-loader",
					]
				}]
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js"],
			mainFields: ["module", "browser", "main"] // todo: is this correct for this project?
		},
		target: "web",
		devtool: "source-map",
		devServer: {
			host: "0.0.0.0",
			overlay: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: htmlTemplate,
			}),
/*
			// Uncomment For production
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.optimize.UglifyJsPlugin(),
*/
		]
	};

	if (!isNotProd) {
		mod.devtool = "eval";
	}

	return mod;
};
