import status from 'http-status'
import { Trash, Photo } from '../models'
import Storage from '../lib/storage'

const index = async (req, res) => {
  const response = await Trash.find({}).populate({ path: 'photo', select: 'url' }).exec()

  res.status(status.OK).json(response)
}

const store = async (req, res) => {
  let { file, body } = req

  file = await Storage.move(file, 'photos')

  const photo = await Photo.create({ filename: file.filename, url: file.url })

  const trash = await Trash.create({
    latitude: body.latitude,
    longitude: body.longitude,
    photo: photo.id.toString()
  })

  const response = await trash.populate({ path: 'photo', select: 'url' }).execPopulate()

  res.status(status.OK).json(response)
}

export default {
  index,
  store
}
