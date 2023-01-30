const webpack = require('webpack'),
  path = require('path'),
  nodeExternals = require('webpack-node-externals');

module.exports = (e, t) => ({
  entry: './lib/tezos-earn-event/index.ts',
  output: { path: path.resolve(__dirname, 'dist'), filename: 'tezos-earn-event.js' },
  target: 'node',
  node: { __dirname: !1, __filename: !1 },
  externals: [nodeExternals()],
  resolve: { extensions: ['.ts'] },
  module: { rules: [{ test: /\.ts$/, use: ['ts-loader'] }] },
});
