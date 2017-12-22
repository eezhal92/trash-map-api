import status from 'http-status'
import { GarbageBin, GarbageBinLog } from '../models'

const index = async (req, res) => {
  const { id } = req.params

  const garbageBin = await GarbageBin.findById(id)

  if (!garbageBin) {
    return res.status(status.NOT_FOUND).json({
      message: `Garbage Bin with ID of ${id} is not found`
    })
  }

  const garbageBinLogs = await GarbageBinLog.find({
    garbageBin: id
  })

  res.status(status.OK).json(garbageBinLogs)
}

const store = async (req, res) => {
  const { id } = req.params
  const { elevation, humidity, temperature } = req.body

  const garbageBin = await GarbageBin.findById(id)

  if (!garbageBin) {
    return res.status(status.NOT_FOUND).json({
      message: `Garbage Bin with ID of ${id} is not found`
    })
  }

  const garbageBinLog = await GarbageBinLog.create({
    garbageBin: id,
    elevation,
    humidity,
    temperature
  })

  res.status(status.CREATED).json(garbageBinLog)
}

export default {
  index,
  store
}
