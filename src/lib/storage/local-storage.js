import fs from 'fs'
import shell from 'shelljs'
import { resolve, join } from 'path'
import { hostname } from 'src/lib/util'

const STORAGE_PATH = resolve(process.env.NODE_PATH, 'public/storage')

const buildTargetDirPath = (dir) => {
  if (dir) {
    return join(STORAGE_PATH, `/${dir}`)
  }

  return join(STORAGE_PATH, `/`)
}

const convertToRelativePath = (absolutePath) => absolutePath.replace(STORAGE_PATH, '')

const filename = (file) => `${file.filename}-${file.originalname}`

const buildTargetFilePath = (file, dir = null) => {
  return join(buildTargetDirPath(dir), filename(file))
}

const isDirectoryExists = (dir) => fs.existsSync(dir)

const makeDir = (dir) => shell.mkdir('-p', dir)

const url = (relativePath) => `${hostname()}/public/storage${relativePath}`

const move = async (file, dir = null) => {
  const tempFilePath = resolve(process.env.NODE_PATH, file.path)

  const targetDirPath = buildTargetDirPath(dir)

  if (!isDirectoryExists(targetDirPath)) {
    await makeDir(targetDirPath)
  }

  const targetFilePath = buildTargetFilePath(file, dir)

  await shell.exec(`mv ${tempFilePath} ${targetFilePath}`)

  const relativePath = convertToRelativePath(targetFilePath)

  return {
    driver: 'local',
    uuid: null,
    url: url(relativePath),
    path: relativePath,
    filename: filename(file),
    size: file.size
  }
}

export default {
  move
}
