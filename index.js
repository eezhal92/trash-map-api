/* eslint-disable global-require, import/no-extraneous-dependencies */

if (!process.env.NODE_ENV) {
  console.log('[App] NODE_ENV value must be set')
  return
}

const { resolve } = require('path')

if (resolve(process.env.NODE_PATH) !== resolve(__dirname)) {
  console.log('[App] NODE_PATH value should be equal to root app path')
  return
}

require('dotenv').config()

require('babel-polyfill')

if (process.env.NODE_ENV === 'production') {
  require('./dist/server.bundle')
} else {
  process.on('unhandledRejection', r => console.log(r))

  require('babel-register')()

  require('./src/index')
}
