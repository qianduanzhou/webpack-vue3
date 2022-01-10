const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const {
    VueLoaderPlugin
} = require('vue-loader');
const webpack = require('webpack');
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {
    ElementPlusResolver
} = require('unplugin-vue-components/resolvers')
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");


function resolvePath(filePath) {
    return path.resolve(__dirname, filePath);
}
const NODE_ENV = process.env.NODE_ENV
console.log('当前环境', NODE_ENV)

const commonConfig = {
    entry: resolvePath('../src/main.js'),
    output: {
        path: resolvePath('../dist'),
        filename: '[contenthash].bundle.js',
    },
    cache: {
        type: "filesystem", // 使用文件缓存
    },
    resolve: {
        alias: {
            "@": resolvePath('../src'), // @ 代表 src 路径
        },
        extensions: ['.ts', '.js', '.vue', '.json', '.mjs'], //需要解析的文件类型列表
        symlinks: false,
    },
    module: {
        rules: [{
                test: /\.vue$/,
                include: resolvePath('../src'),
                loader: 'vue-loader'
            }, 
            {
                test: /\.s?css$/,
                use: [
                    NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, //分离css
                    'css-loader',
                    'sass-loader',
                    {
                        loader: "thread-loader",
                        options: {
                            workerParallelJobs: 2,
                        },
                    }
                ]
            }, {
                test: /\.js$/,
                include: resolvePath('../src'),
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.mjs$/i,
                resolve: {
                    byDependency: {
                        esm: {
                            fullySpecified: false
                        }
                    }
                }
            }, { //webpack5 新方式，取代之前的raw url file-loader 
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                include: resolvePath('../src'),
                type: "asset/resource",
            },
        ],
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
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }), //抽离css，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`
        }), // 进度条
    ],
};
module.exports = {
    commonConfig,
    resolvePath,
    NODE_ENV
}