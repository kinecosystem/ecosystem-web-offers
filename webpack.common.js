const path = require("path");
// variables
const outPath = path.join(__dirname);
const htmlPath = path.join(__dirname, "html");

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlTemplate = path.join(htmlPath, "index.html");

module.exports = {
		entry: ["babel-polyfill", path.join(__dirname, "scripts", "src", "index.tsx")],
		target: "web",
		output: {
			path: outPath,
			filename: "[name]-[hash:6].bundle.js",
			publicPath: ""
		},
		module: {
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
			mainFields: ["module", "browser", "main"]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: htmlTemplate,
			}),
		]
	};
