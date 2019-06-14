// Important modules this config uses
const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = require('./webpack.base.babel')({
	mode: 'production',
	publicPath: "./",
	// In production, we skip all hot-reloading stuff
	entry: [
		// require.resolve('react-app-polyfill/ie11'),
		path.join(process.cwd(), 'app/index.js')
	],

	// Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].chunk.js'
	},

	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					warnings: false,
					compress: {
						comparisons: false
					},
					parse: {},
					mangle: true,
					output: {
						comments: false,
						ascii_only: true
					}
				},
				parallel: true,
				cache: true,
				sourceMap: true
			})
		],
		nodeEnv: 'production',
		sideEffects: true,
		concatenateModules: true,
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all'
				},
				main: {
					chunks: 'all',
					minChunks: 2,
					reuseExistingChunk: true,
					enforce: true
				}
			}
		},
		runtimeChunk: true
	},

	plugins: [
		new CleanWebpackPlugin(),
		// Minify and optimize the index.html
		new HtmlWebpackPlugin({
			template: 'app/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true
		}),

		new HashedModuleIdsPlugin({
			hashFunction: 'sha256',
			hashDigest: 'hex',
			hashDigestLength: 20
		})
	],

});
