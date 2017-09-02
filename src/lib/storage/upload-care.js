import fs from 'fs'
import path from 'path'
import uploadcare from 'uploadcare'

const uploader = uploadcare(process.env.UPLOADCARE_PUBLIC_KEY, process.env.UPLOADCARE_SECRET_KEY)

const info = (fileId) => new Promise((resolve, reject) => {
  uploader.files.info(fileId, (err, result) => {
    err ? reject(err) : resolve(result)
  })
}).then(info => ({
  ...info,
  // unknown issue: original_file_url in response keep returns null, build original file url manually
  original_file_url: `https://ucarecdn.com/${info.uuid}/${info.original_filename}`
}))

const move = (file, dir = null) => new Promise((resolve, reject) => {
  const tempFilePath = path.resolve(process.env.NODE_PATH, file.path)

  uploader.file.upload(fs.createReadStream(tempFilePath), (err, result) => {
    err ? reject(err) : resolve(result)
  })
}).then((result) => {
  return info(result.file)
})

export default {
  move,
  info
}
