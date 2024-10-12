const webpack = require('webpack');
const path = require('path');
const outDir = 'lib';
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const plugins = [];

const config = (env, argv = {}) => {
  const mode = argv.mode || 'production';
  const isDev = mode !== 'production';

  if (!isDev) {
    plugins.push(new MiniCssExtractPlugin())
    // plugins.push(new BundleStatsWebpackPlugin()); // Uncomment to enable bundle stats
  }

  const result = {
    mode,
    entry: './src/index.ts',
    output: {
      path: path.join(__dirname, outDir),
      filename: `index.js`,
      library: { name: 'editor', type: 'umd' }
    },
    externals: {
      // Note that React and ReactDOM are external and declared as peer dependencies.
      // I would expect React to be available by external app.
      // you can include React as part of this library by removing the following lines 
      // and adding it as a dependency in package.json
      React: 'react',
      ReactDOM: 'react-dom',
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react': 'react',
      'react-dom': 'react-dom',
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
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            'css-loader'
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins
  }

  if (isDev) {
    result.devtool = 'inline-source-map';
  }

  return result;
}

module.exports = config;