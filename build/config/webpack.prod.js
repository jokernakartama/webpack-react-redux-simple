const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackConfig = require('./webpack.common')
const loaders = require('./loaders')
const config = require('./build.config')
// paths
const rootDir = path.join(__dirname, '../../')
const buildPath = path.join(rootDir, 'dist')
const sourcePath = path.join(rootDir, 'src')

const rules = [
  { test: /\.css$/, use: [MiniCssExtractPlugin.loader].concat(loaders(['style', 'css', 'postcss', 'import-glob'])) },
  // { test: /\.scss$/, use: [MiniCssExtractPlugin.loader].concat(loaders(['style', 'css', 'postcss', 'sass', 'import-glob'])) },
  // { test: /\.sass$/, use: [MiniCssExtractPlugin.loader].concat(loaders(['style', 'css', 'postcss', 'sass', 'import-glob'])) },
  // { test: /\.less$/, use: [MiniCssExtractPlugin.loader].concat(loaders(['style', 'css', 'postcss', 'less', 'sass', 'import-glob'])) },
  { test: /\.styl$/, use: [MiniCssExtractPlugin.loader].concat(loaders(['css', 'postcss', 'stylus', 'import-glob'])) }
]

const plugins = [
 new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
    },
  }),
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, 'index.html'),
    path: buildPath,
    filename: 'index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  }),
  // copy static files from source directory
  new CopyWebpackPlugin([
    {
      from: path.resolve(rootDir, 'static'),
      to: config.assetsSubDirectory,
      ignore: ['.*']
    }
  ]),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    filename: path.posix.join(config.assetsSubDirectory, 'css/[name].[contenthash].css'),
    chunkFilename: path.posix.join(config.assetsSubDirectory, 'css/[name].[contenthash].css')
  }),
]

module.exports =  merge(webpackConfig, {
  devtool: 'cheap-source-map',
  mode: 'production',
  output: {
    path: config.assetsRoot,
    publicPath: '/',
    filename: path.posix.join(config.assetsSubDirectory, 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join(config.assetsSubDirectory, 'js/[name].[chunkhash].js')
  },
  module: {
    rules
  },
  plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
          },
          ie8: false,
          output: {
            comments: false
          }
        }
      })
    ]
  }
})
