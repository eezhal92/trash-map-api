const { join, resolve } = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: resolve(__dirname, './src/index.js'),

  output: {
    path: resolve(__dirname, './dist/'),
    filename: 'server.bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: join(__dirname, '/src'),
        use: 'babel-loader'
      }
    ]
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true
  },

  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    alias: {
      src: resolve(__dirname, 'src')
    }
  },

  externals: [
    nodeExternals()
  ],

  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
}
