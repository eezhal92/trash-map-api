import express from 'express'
import { inputValidation } from 'src/middlewares'
import garbageBinController from 'src/controllers/garbage-bin-controller'
import garbageBinLogController from 'src/controllers/garbage-bin-log-controller'

import validations from './validations'
import garbageBinLogValidations from '../garbage-bin-logs/validations'

const router = express.Router()

router.route('/')
  .get(garbageBinController.index)
  .post(
    inputValidation(validations.store),
    garbageBinController.store
  )

router.route('/:id')
  .delete(garbageBinController.destroy)

router.route('/:id/logs')
  .get(garbageBinLogController.index)
  .post(
    inputValidation(garbageBinLogValidations.store),
    garbageBinLogController.store
  )

export default router
