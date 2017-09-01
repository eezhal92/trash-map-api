import status from 'http-status'
import { Trash, Photo } from '../models'
import { LocalStorage } from '../lib/storage'

const index = async (req, res) => {
  const response = await Trash.find({})

  res.status(status.OK).json(response)
}

const store = async (req, res) => {
  const { file, body } = req

  const path = await LocalStorage.move(file, 'photos')

  const photo = await Photo.create({
    filename: file.originalname,
    path,
    mime: file.mimetype
  })

  const trash = await Trash.create({
    latitude: body.latitude,
    longitude: body.longitude,
    photo: photo.id.toString()
  })

  const response = await trash.populate({ path: 'photo', select: 'path' }).execPopulate()

  res.status(status.OK).json(response)
}

export default {
  index,
  store
}
