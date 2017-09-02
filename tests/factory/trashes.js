import { Trash, Photo } from 'src/models'

export const createWithPhoto = async (trashData, photoData) => {
  const photo = await Photo.create(photoData)
  const trash = await Trash.create({ ...trashData, photo: photo.id.toString() })

  return trash
}
