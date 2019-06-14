module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false
			}
		],
		'@babel/preset-react'
	],
	plugins: [
		'styled-components',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-syntax-dynamic-import',
		[
			'import',
			{
				libraryName: 'antd',
				libraryDirectory: 'es',
				style: 'css' // `style: true` 会加载 less 文件
			}
		]
	]
};
