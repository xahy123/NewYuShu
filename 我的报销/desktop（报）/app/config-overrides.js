const { override, fixBabelImports } = require('customize-cra');
    module.exports = override(
        fixBabelImports('import', {
            libraryName: 'ant-design-pro',
            libraryDirectory: 'lib',
            style: true,
            camel2DashComponentName: false,
        }),
    );