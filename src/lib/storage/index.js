export default (function () {
  const driver = process.env.STORAGE_DRIVER

  switch (driver) {
    case 'local':
      return require('./local-storage').default
    case 'uploadcare':
      return require('./upload-care').default
    default:
      throw new Error(`STORAGE_DRIVER of '${driver}' is not available`)
  }
})()
