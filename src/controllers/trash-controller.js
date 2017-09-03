import status from 'http-status'
import { Trash, Photo } from '../models'
import Storage from '../lib/storage'

const index = async (req, res) => {
  const response = await Trash.find({}).sort({ createdAt: -1 }).populate({ path: 'photo', select: 'url' }).exec()

  res.status(status.OK).json(response)
}

const store = async (req, res) => {
  const { file, body } = req

  const photoFile = await Storage.move(file, 'photos')

  const photo = await Photo.create({ filename: photoFile.filename, url: photoFile.original_file_url })

  const trash = await Trash.create({
    latitude: body.latitude,
    longitude: body.longitude,
    photo: photo.id.toString()
  })

  const response = await trash.populate({ path: 'photo', select: 'url' }).execPopulate()

  res.status(status.CREATED).json(response)
}

export default {
  index,
  store
}
