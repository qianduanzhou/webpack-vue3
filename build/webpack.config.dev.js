const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

function resolvePath(filePath) {
    return path.resolve(__dirname, filePath);
}

module.exports = {
    mode: 'development',
    entry: resolvePath('../src/main.js'),
    output: {
        path: resolvePath('../dist'),
        filename: '[contenthash].bundle.js',
    },
    devServer: {
        static: {
          directory: resolvePath('../public'),
        },
        open: true,
        hot: true,
        compress: true,
        port: 9000,
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.s?css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            BASE_URL: '"./"'
        }),
        new HtmlWebpackPlugin({
            title: 'vue3-app',
            filename: 'index.html',
            template: resolvePath('../public/index.html'),
        }),
        new VueLoaderPlugin(),
    ],
};