import status from 'http-status'
import { GarbageBin } from '../models'

const index = async (req, res) => {
  const response = await GarbageBin.find({}).sort({ createdAt: -1 }).exec()

  res.status(status.OK).json(response)
}

const store = async (req, res) => {
  const { name, address = '', latitude, longitude } = req.body

  const garbageBin = await GarbageBin.create({
    name,
    address,
    latitude,
    longitude
  })

  res.status(status.CREATED).json(garbageBin)
}

const destroy = async (req, res) => {
  const { id } = req.params

  const garbageBin = await GarbageBin.findById(id)

  await garbageBin.remove()

  res.status(200).json({ message: `Garbage Bin with ID of ${id} has been deleted` })
}

export default {
  index,
  store,
  destroy
}
