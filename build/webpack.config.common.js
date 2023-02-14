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
        filename: 'bundle/[name].[chunkhash].bundle.js', //在entry中的被引入的文件
        chunkFilename: 'bundle/[name].[chunkhash].bundle.js', //未被列在entry中，却又需要被打包出来的文件命名配置，如异步加载
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
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, //分离css
                    'css-loader',
                    'sass-loader',
                    {
                        loader: "thread-loader", //多进程打包，代替happywebpack
                        options: {
                            workerParallelJobs: 2,
                        },
                    }
                ]
            }, 
            {
                test: /\.m?js$/,
                // include: resolvePath('../src'),
                // exclude: /(node_modules|bower_components)/,
                use: [{
                        loader: 'babel-loader?cacheDirectory',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        loader: "thread-loader", //多进程打包，代替happywebpack
                        options: {
                            workerParallelJobs: 2,
                        },
                    }
                ],
                resolve: {
                    byDependency: {
                        esm: {
                            fullySpecified: false
                        }
                    }
                }
            }, 
            { //webpack5 新方式，取代之前的raw url file-loader 
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                include: resolvePath('../src'),
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 超过多少k采用生成文件（resource ）的形式，否则内联在js里（inline）
                    }
                },
                generator: {
                    filename: 'static/img/[name].[contenthash][ext][query]' //指定目录和文件名
                }
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            BASE_URL: '"./public/"'
        }),
        new HtmlWebpackPlugin({
            title: 'vue3-app',
            filename: 'index.html',
            template: resolvePath('../public/index.html'),
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash].css",
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