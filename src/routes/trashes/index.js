import multer from 'multer'
import express from 'express'
import { inputValidation, fileInputValidation } from 'src/middlewares'
import trashController from 'src/controllers/trash-controller'

import validations from './validations'

const upload = multer({ dest: 'public/tmp/uploads/' })

const router = express.Router()

router.route('/')
  .get(trashController.index)
  .post(
    upload.single('photo'),
    inputValidation(validations.store),
    fileInputValidation('photo'),
    trashController.store
  )

export default router
