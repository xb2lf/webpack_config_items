const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CommonCSSLoader = [
  {
    /* loader: 'style-loader', */
    loader: 'vue-style-loader',
    options: {
      injectType: 'singletonStyleTag',
    },

  },
  /* {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
    },
  }, */
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
];

module.exports = {
  entry: './src/main.js',
  output: {
    filename: this.mode === 'production' ? 'js/[name].[contenthash:10].js' : 'js/[name].[hash:10].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          fix: true,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [...CommonCSSLoader],
          },
          {
            test: /\.less$/,
            use: [
              ...CommonCSSLoader,
              'less-loader',
            ],
          },
          {
            test: /\.(sass|scss)$/,
            use: [
              ...CommonCSSLoader,
              'sass-loader'
            ],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
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
              cacheDirectory: true,
            },
          },
          {
            test: /\.(jpg|png|webp|gif|svg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  outputPath: 'assets/images/',
                  limit: 6 * 1024,
                  name: '[hash:10].[ext]',
                  esModule: false,
                },
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  /* bypassOnDebug: true,
                  disable: true, */
                  mozjpeg: {
                    progressive: true,
                    quality: 65,
                  },
                  // optipng.enabled: false will disable optipng
                  optipng: {
                    enabled: true,
                  },
                  pngquant: {
                    quality: [0.65, 0.90],
                    speed: 4,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  // the webp option will enable WEBP
                  webp: {
                    quality: 75,
                  },
                  svgo: {
                    multipass: true, // boolean. false by default
                    datauri: 'enc', // 'base64', 'enc' or 'unenc'. 'base64' by default
                    js2svg: {
                      indent: 2, // string with spaces or number of spaces. 4 by default
                      pretty: true, // boolean, false by default
                    },
                  },
                },
              },
            ],
          },
          {
            test: /\.html/,
            loader: 'html-loader',
          },
          {
            exclude: /\.(html|vue|js|css|lesssass|scss|jpg|png|webp|gif|svg)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'assets/media/',
              name: '[hash:10].[ext]',
            },
          },
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{css,sss,less,scss,sass}'],
      exclude: ['node_modules', 'dist'],
      extensions: ['css', 'less', 'scss', 'sass'],
      threads: true,
      fix: true,
    }),
  ],
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.jsx', '.vue'],
    modules: [path.resolve(__dirname, '../../node_modules'), 'node_modules'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    // 将当前模块的记录其他模块的hash值单独打包为一个文件，这个文件名为runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    // 开启压缩
    minimize: true,
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启用source-map
        sourceMap: true,
        // 移除注释
        extractComments: true,
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'], // 移除console
          },
        },
      }),
    ],
  },
  devtool: 'eval-source-map',
};
