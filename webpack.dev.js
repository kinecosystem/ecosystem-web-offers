const merge = require('webpack-merge');
const common = require("./webpack.common.js");
const NgrockWebpackPlugin = require('ngrock-webpack-plugin')

module.exports = merge(common, {
	mode: "development",
	devtool: "source-map",
	devServer: {
		host: "0.0.0.0",
		headers: {'Access-Control-Allow-Origin': '*'},
		overlay: true,
	},
	// plugins: [new NgrockWebpackPlugin({
	//    subdomain: "liorama"
	// })]
});
