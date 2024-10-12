const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outDir = 'lib';

// note this examples webpack is hard-coded for development
// see other webpack.configs in monorepo for a more progromatic approach
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, outDir),
    filename: `examples.js`
  },
  
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, './'),
      publicPath: '/'
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?|.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html')
    }),
  ]
}