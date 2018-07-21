const webpack = require('webpack')
const path = require('path')
// paths
const rootDir = path.join(__dirname, '../../')
const nodeModulesPath = path.join(rootDir, 'node_modules')
const buildPath = path.join(rootDir, 'dist')
const sourcePath = path.join(rootDir, 'src')

const rules = [
  {
    test: /\.(js|jsx)$/,
    include: sourcePath,
    exclude: /node_modules/,
    use: [
      'babel-loader',
      'eslint-loader',
    ],
  }
]

module.exports = {
  devtool: false,
  context: sourcePath,
  entry: {
    app: ['babel-polyfill', path.join(sourcePath, 'index.js')],
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'app.js',
  },
  module: {
    rules
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // set the same aliases in tsconfig.json
    alias: {
      '~': sourcePath,
      // add an extra alias for stylus loader
      'src': sourcePath
    },
    modules: [
      nodeModulesPath,
      rootDir
    ],
  },
  optimization: {
    noEmitOnErrors: true
  }
}
