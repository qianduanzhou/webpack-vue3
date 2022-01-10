const webpack = require('webpack');
const { merge } = require('webpack-merge'); 
const { commonConfig, resolvePath } = require('./webpack.config.common')

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: {
          directory: resolvePath('../public'),
        },
        open: false,
        hot: true,
        compress: true,
        port: 9000,
    },
    module: {
        rules: [],
    },
    plugins: [],
});