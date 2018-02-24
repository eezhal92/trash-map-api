import status from 'http-status'
import { GarbageBin, GarbageBinLog } from '../models'
import { getIO } from '../lib/web-socket'

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

  // todo: only persist in 1 hour interval

  const payload = {
    tpsId: id,
    humidity,
    temperature,
    elevation
  }

  const io = getIO()

  io.emit('garbage-bin-log:added', payload)

  res.status(status.CREATED).json(payload)
}

export default {
  index,
  store
}
