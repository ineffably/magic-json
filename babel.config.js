/* eslint-disable no-undef */
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {node: 'current'},
      useBuiltIns: 'entry'
    }],
    ['@babel/preset-react', {runtime: 'automatic'}],
    '@babel/preset-typescript',
  ],
};