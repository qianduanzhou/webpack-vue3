const webpack = require('webpack');
const glob = require("glob");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const {
    merge
} = require('webpack-merge');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const smp = new SpeedMeasurePlugin();

const {
    commonConfig,
    resolvePath,
    NODE_ENV
} = require('./webpack.config.common')

let config = merge(commonConfig, {
    mode: 'production',
    module: {
        rules: [],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({//js压缩
                parallel: 4,//多线程
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
            new CssMinimizerPlugin({//css压缩
                parallel: 4,//多线程
            }),
        ],
        splitChunks: {//将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。
            // include all types of chunks
            chunks: "all",
            // 重复打包问题
            cacheGroups: {
              vendors: {
                // node_modules里的代码
                test: /[\\/]node_modules[\\/]/,
                chunks: "all",
                // name: 'vendors', 一定不要定义固定的name
                priority: 10, // 优先级
                enforce: true,
              },
            },
        },
        runtimeChunk: true,//为运行时代码创建一个额外的 chunk，减少 entry chunk 体积，提高性能。
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: resolvePath('../public/favicon.ico'),
                to: resolvePath('../dist/favicon.ico'),
            }]
        }),
        new PurgeCSSPlugin({//未引入的css不打包
            paths: glob.sync(`${resolvePath('../src')}/**/*`, { nodir: true }),
        }),
    ],
})

if (NODE_ENV === 'test') {
    config.plugins.push(
        new BundleAnalyzerPlugin(), // 打包体积分析
    )
    config = smp.wrap(config)
}
module.exports = config;