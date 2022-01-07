const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolvePath(filePath) {
    return path.resolve(__dirname, filePath);
}

module.exports = {
    mode: 'production',
    entry: resolvePath('../src/main.js'),
    output: {
        path: resolvePath('../dist'),
        filename: '[contenthash].bundle.js',
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
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            BASE_URL: '"./"'
        }),
        new HtmlWebpackPlugin({
            title: 'vue3-app',
            filename: 'index.html',
            template: resolvePath('../public/index.html'),
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolvePath('../public/favicon.ico'),
                    to: resolvePath('../dist/favicon.ico'),
                }
            ]
        })
    ],
};