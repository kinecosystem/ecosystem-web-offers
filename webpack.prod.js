const webpack = require("webpack");
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');

const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	stats: {
		warnings: false
	},
	plugins: [
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /main\.bundle\.js$/,
			threshold: 10240,
			minRatio: 0.8
		})]
});


// We can add Tree Shaking for further optimization
