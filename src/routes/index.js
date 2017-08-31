import express from 'express'

import trashes from './trashes'

const router = express.Router()

router.use('/trashes', trashes)

export default router
