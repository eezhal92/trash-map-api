import fs from 'fs'
import shell from 'shelljs'
import { resolve, join } from 'path'

const STORAGE_PATH = resolve(process.env.NODE_PATH, 'public/storage')

const buildTargetDirPath = (dir) => {
  if (dir) {
    return join(STORAGE_PATH, `/${dir}`)
  }

  return join(STORAGE_PATH, `/`)
}

const convertToRelativePath = (absolutePath) => absolutePath.replace(STORAGE_PATH, '')

const buildTargetFilePath = (file, dir = null) => {
  return join(buildTargetDirPath(dir), `${file.filename}-${file.originalname}`)
}

const isDirectoryExists = (dir) => fs.existsSync(dir)

const makeDir = (dir) => shell.mkdir('-p', dir)

const move = async (file, dir = null) => {
  const tempFilePath = resolve(process.env.NODE_PATH, file.path)

  const targetDirPath = buildTargetDirPath(dir)

  if (!isDirectoryExists(targetDirPath)) {
    await makeDir(targetDirPath)
  }

  const targetFilePath = buildTargetFilePath(file, dir)

  await shell.exec(`mv ${tempFilePath} ${targetFilePath}`)

  return convertToRelativePath(targetFilePath)
}

export default {
  move
}
