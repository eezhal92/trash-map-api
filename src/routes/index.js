import Twilio from 'twilio'
import express from 'express'

import trashes from './trashes'
import garbageBins from './garbage-bins'

const router = express.Router()

router.use('/trashes', trashes)
router.use('/garbage-bins', garbageBins)
router.post('/notif', (request, response, next) => {
  const accountSid = process.env.TWILIO_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_NUMBER
  const client = new Twilio(accountSid, authToken)

  client.messages.create({
    body: `${Date.now()} - Sampah di titik Palu Smart City telah penuh dan belum diambil selama 3 hari`,
    to: '+6285225575696',
    from: fromNumber
  }).then((message) => {
    response.json({
      sid: message.sid
    })
  }).catch((err) => {
    console.log(err)
    next(err)
  })
})

export default router
