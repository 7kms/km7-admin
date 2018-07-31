'use strict';

// const path = require('path')
const webpack = require('webpack');
const pathConfig = require('./pathConfig')
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const styleConfig = require('./styleConfig')

module.exports = merge({
  name: 'client',
  mode:  'development',
  devtool: 'source-map',
  target: 'web',
  entry: {
      app: pathConfig.clientEntry
   },
  output: {
      path: pathConfig.clientOutput,
      filename: pathConfig.generageStaticPath('js/[name].js') ,
      publicPath: pathConfig.publicPath,
      libraryTarget: "umd"
  }, 
  devServer: {
    port: 6900,
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // },
    contentBase: pathConfig.clientOutput, // boolean | string | array, static file location
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload,
    host: "0.0.0.0",
    publicPath: "/",
    after(){
      console.log(arguments)
    }
  },
  module:{
    rules:[
      ...styleConfig(),
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //https://github.com/jantimon/html-webpack-plugin#configuration
    new HtmlWebpackPlugin({
      title: '7km',
      template: pathConfig.htmlTemplate
    }) 
  ],
  optimization:{
    runtimeChunk: 'single',
    splitChunks: {
      chunks: "all",
      minSize: 1000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true
    }
  }
},baseConfig)