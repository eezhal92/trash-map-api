import http from 'http'
import cors from 'cors'
import express from 'express'
import { resolve } from 'path'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'

import routes from './routes'
import { NotFoundError } from './errors/http'
import { initSocketIO } from './lib/web-socket'
import { errorToResponse } from './middlewares'

const app = express()

app.use('/public', express.static(resolve(__dirname, '../public')))
app.use(cors({
  origin: '*'
}))
app.use(methodOverride())
app.use(bodyParser.json({ limit: '250kb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', routes)

app.use((req, res, next) => {
  const err = new NotFoundError('Endpoint was not found')
  return next(err)
})
app.use(errorToResponse())

const server = http.Server(app)

initSocketIO(server)

export default server
