const webpack = require('webpack');
const path = require('path');
const outDir = 'lib';
const devTool = 'inline-source-map';
const config = (env, argv = {}) => {
  const mode = argv.mode || 'production';

  const result = {
    mode,
    entry: './src/index.ts',
    output: {
      filename: `index.js`,
      path: path.join(__dirname, outDir),
      library: { name: 'core', type: 'umd' }
    },
    module: {
      rules: [
        {
          test: /\.tsx?|.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ],
    },
    resolve: {
      extensions: ['.ts', '.js']
    }
  }
  
  // add source map for development
  if (mode !== 'production') {
    result.devtool = devTool;
  }

  return result;
}

module.exports = config;
