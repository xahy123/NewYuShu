/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
// 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
// see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
// in the next major version of loader-utils.'
process.noDeprecation = true;

module.exports = options => ({
	mode: options.mode,
	entry: options.entry,
	output: Object.assign(
		{
			// Compile into js/build.js
			path: path.resolve(process.cwd(), '../dist/desktop'),
			publicPath: options.publicPath
		},
		options.output
	), // Merge with env dependent settings
	optimization: options.optimization,
	module: {
		rules: [
			{
				test: /\.js$/, // Transform all .js files required somewhere with Babel
				exclude: /node_modules/,
				use: "happypack/loader?id=happyBabel"
				// use: {
				// 	loader: 'babel-loader',
				// 	options: options.babelQuery
				// }
			},
			{
				// Preprocess our own .css files
				// This is the place to add your own loaders (e.g. sass/less etc.)
				// for a list of loaders, see https://webpack.js.org/loaders/#styling
				test: /\.(css)$/,
				// exclude: /node_modules/,
				use: "happypack/loader?id=happyStyle"
				// use: ['style-loader', 'css-loader']
			},
			// {
			// 	// Preprocess 3rd party .css files located in node_modules
			// 	test: /\.(css)$/,
			// 	include: /node_modules/,
			// 	use: ['style-loader', 'css-loader']
			// },
			{
				test: /\.(eot|otf|ttf|woff|woff2)$/,
				use: 'file-loader'
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-url-loader',
						options: {
							// Inline files smaller than 10 kB
							limit: 10 * 1024,
							noquotes: true
						}
					}
				]
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// Inline files smaller than 10 kB
							limit: 10 * 1024
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								enabled: false
								// NOTE: mozjpeg is disabled as it causes errors in some Linux environments
								// Try enabling it in your environment by switching the config to:
								// enabled: true,
								// progressive: true,
							},
							gifsicle: {
								interlaced: false
							},
							optipng: {
								optimizationLevel: 7
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							}
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.(mp4|webm)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000
					}
				}
			},
			{
				test: /\.(md)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000
					}
				}
			}
		]
	},
	plugins: options.plugins.concat([
		// Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
		// inside your code for any environment checks; Terser will automatically
		// drop any unreachable code.
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new HappyPack({
			//用id来标识 happypack处理那里类文件
			id: 'happyBabel',
			//如何处理  用法和loader 的配置一样
			loaders: [
				{
					loader: 'babel-loader?cacheDirectory=true'
				}
			],
			//代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
			threadPool: happyThreadPool,
			//允许 HappyPack 输出日志
			verbose: true
		}),
		new HappyPack({
			//用id来标识 happypack处理那里类文件
			id: 'happyStyle',
			//如何处理  用法和loader 的配置一样
			loaders: [
				'style-loader?sourceMap=true',
				'css-loader?sourceMap=true'
			],
			//代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
			threadPool: happyThreadPool,
			//允许 HappyPack 输出日志
			verbose: true
		}),
	]),
	resolve: {
		modules: ['node_modules', 'app'],
		extensions: ['.js', '.jsx', '.react.js'],
		mainFields: ['browser', 'jsnext:main', 'main'],
		alias: { 
			moment$: 'moment/moment.js', 
		},
	},
	devtool: options.devtool,
	target: 'electron-renderer', // Make web variables accessible to webpack, e.g. window
	performance: options.performance || { hints:false },
	
	devServer: options.devServer,
});
