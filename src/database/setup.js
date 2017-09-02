import mongoose from 'mongoose'

export default (url, options = {}) => {
  mongoose.Promise = global.Promise

  let connection = null

  /**
   * @return {Promise}
   */
  const connect = () => new Promise((resolve, reject) => {
    if (connection) {
      resolve(connection)
    }

    mongoose.connect(url, options)
      .then(() => {
        console.log(`[App] Successfully connected to ${url}! `)
        connection = mongoose.connection

        resolve(connection)
      })
      .catch((err) => {
        reject(err)
      })
  })

  /**
   * @return {Promise}
   */
  const close = () => new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('[App] There is no mongodb connection yet'))
    }

    connection.close(() => {
      // eslint-disable-next-line
      console.log(`[App] Successfully disconnected from ${url}!`)
      resolve(true)
    })
  })

  /**
   * @return {void}
   */
  const clear = async () => {
    try {
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (const collectionName in mongoose.connection.collections) {
        const collection = mongoose.connection.collections[collectionName]

        await collection.collection.remove()
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log('[App] Error when attempting to clear mongo collections', err)
    }
  }

  return {
    connect,
    close,
    clear
  }
}
