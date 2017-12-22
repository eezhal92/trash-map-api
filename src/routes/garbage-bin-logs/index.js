import express from 'express'
import { inputValidation } from 'src/middlewares'
import garbageBinControllerLog from 'src/controllers/garbage-bin-log-controller'

import validations from './validations'

const router = express.Router()

router.route('/')
  .post(
    inputValidation(validations.store),
    garbageBinControllerLog.store
  )

export default router
