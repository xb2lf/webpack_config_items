const path = require('path');
const HtmlWebpackPulgin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'js/[name]-[chunkhash:10].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          fix: true,
        },
      },
      {
        oneOf: [
          {
            test: /\.(css|less)$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            use: [
              /* {
                loader: 'style-loader',
                options: {
                  injectType: 'singletonStyleTag',
                },
            
              }, */
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                },
              },
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-preset-env')(),
                  ],
                },
              },
              'less-loader',
            ],
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  worker: 2,
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: {
                          version: 3,
                        },
                        targets: {
                          chrome: '60',
                          firefox: '50',
                          ie: '9',
                          safari: '10',
                          edge: '17',
                        },
                      },
                    ],
                  ],
                  // 开启babel缓存，第二次构建时，会读取之前的缓存
                  cacheDirectory: true,
                },
              },
            ],
          },
          {
            test: /\.(jpg|png|webp|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'assets/images',
              esModule: false,
            },
          },
          {
            exclude: /\.(html|js|css|less|jpg|png|webp|gif)/,
            loader: 'file-loader',
            options: {
              name: '[hash:10].[ext]',
              outputPath: 'media/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPulgin({
      template: './src/index.html',
      title: '这是我的webpack配置',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    /**
     * 1. 帮助serviceworker快速启动
     * 2. 删除旧的serviceworker
    */
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new AddAssetHtmlWebpackPlugin({ filepath: path.resolve(__dirname, 'dll/jquery.js') }),
  ],
  mode: 'development',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  externals: {
    // 要忽略的库名 --npm包名
    // 拒绝jQuery被打包进来
    jquery: 'jQuery',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
    opetn: true,
    hot: true,
  },
  devtool: 'eval-source-map',
};
