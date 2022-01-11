/**
 * 使用dll技术 对某些库(第三方的库：jquery/vue/react)进行单独打包
 *   当运行webpack时，默认查找webpack.config.js配置文件
 *   需求：需要运行webpack.dll.js 文件
 *      --> webpack --config webpack.dll.js
 */
const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry: {
    jquery: ['jquery'],
    /* react: ['react', 'react-dom', 'react-router-dom'], */
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dll'),
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.resolve(__dirname, 'dll/manifest.json'),
    }),
  ],
  mode: 'production',
};
