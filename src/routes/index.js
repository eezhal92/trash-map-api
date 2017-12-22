import express from 'express'

import trashes from './trashes'
import garbageBins from './garbage-bins'

const router = express.Router()

router.use('/trashes', trashes)
router.use('/garbage-bins', garbageBins)

export default router
