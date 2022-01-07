# webpack5搭建vue3开发环境

## 初始化

- npm init创建package.json
- 然后安装webpack相关插件

```
npm i webpack webpack-cli --save-dev
```



- 创建build文件夹并新建webpack配置文件

```javascript
const path = require('path');

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
        rules: [],
    },
    plugins: [
        new webpack.DefinePlugin({
            BASE_URL: '"../public/"'
        })
    ],
};
```



## 安装vue相关依赖

- 安装vue相关依赖

```
npm i vue -S                 //-S 等于 --save   -D 等于 --save-dev   i 等于 install
npm i vue-loader -D          //解析和转换.vue文件。提取出其中的逻辑代码 script,样式代码style,以及HTML 模板template，再分别把他们交给对应的loader去处理  
npm i @vue/compiler-sfc -D   //将解析完的vue单页面组件(sfc)编译为js
```

- 配置vue-loader

```javascript
//webpack.config.js
const { VueLoaderPlugin } = require('vue-loader');
module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
        },
    ];
}
plugins: [
        new VueLoaderPlugin(),
]
```

- 创建main.js文件

```javascript
import { createApp } from 'vue'
import App from './App.vue'       // 测试文件 App.vue 和 用于挂载的index.html 自行创建
createApp(App).mount('#app')
```

## 安装css，sass相关依赖

- 安装

```js
npm i css-loader style-loader sass sass-loader -D
```

- 配置loader

```javascript
    module: {
        {
            test: /\.(sa)|css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }],
    },
```

## 使用模板

- 安装

```js
npm i html-webpack-plugin -D  //在打包结束后，自动生成一个html文件，并把打包生成的js文件引入到这个html文件当中
```

- 配置plugins

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
plugins: [
    new webpack.DefinePlugin({
        BASE_URL: '"./"'
    }),
    new HtmlWebpackPlugin({
        title: 'vue3-app',
        filename: 'index.html',
        template: resolvePath('../public/index.html'),
    }),
],
```

- 创建index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

## 自动删除文件

- 安装

```js
npm i clean-webpack-plugin -D  //在打包之前清空output配置的文件夹
```

- 配置

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
plugins: [
    new CleanWebpackPlugin()
]
```

## 拷贝文件

```
npm i copy-webpack-plugin --save-dev
```

```js
const CopyWebpackPlugin = require('copy-webpack-plugin');
   plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolvePath('../public/favicon.ico'),
                    to: resolvePath('../dist/favicon.ico'),
                }
            ]
        })
    ],
```

## 搭建开发环境

拷贝一份webpack.config.js文件，命名为webpack.config.dev.js，删除拷贝插件相关的代码

- 安装

```js
npm i webpack-dev-server -D  //以file形式在浏览器打开打包后的文件，无法发送ajax请求。所以需要devServer在本地开启一个服务器，以http的形式发送请求。
```

- 配置

```javascript
  devServer: {
        static: {
          directory: resolvePath('../public'),
        },
        open: true,
        hot: true,
        compress: true,
        port: 9000,
  },
```

