const path = require('path')
const vueConfig = require('./vue-loader.config')

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './client/client-entry.js',
    vendor: ['vue', 'vue-router', 'vuex', 'lru-cache', 'core-js'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'client-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue',
        options: vueConfig,
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
}
