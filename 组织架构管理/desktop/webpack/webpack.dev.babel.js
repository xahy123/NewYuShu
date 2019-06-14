/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = require('./webpack.base.babel')({
	mode: 'development',
	publicPath: "/",

	// Add hot reloading in development
	entry: [
		path.join(process.cwd(), 'app/index.js') // Start with js/app.js
	],

	// Don't use hashes in dev mode for better performance
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js'
	},

	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},

	// Add development plugins
	plugins: [
		new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
		new HtmlWebpackPlugin({
			inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
			template: 'app/index.html'
		}),
		new CircularDependencyPlugin({
			exclude: /a\.js|node_modules/, // exclude node_modules
			failOnError: false // show a warning when there is a circular dependency
		})
	],

	// Emit a source map for easier debugging
	// See https://webpack.js.org/configuration/devtool/#devtool
	devtool: 'eval-source-map',

	devServer: {
		contentBase: '../app',
		historyApiFallback: false,
		compress: true,
		host: '0.0.0.0',
		port: 3333,
		hot: true
	},

	performance: {
		hints: false
	}
});
