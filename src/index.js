import app from './app.js'
import { setup } from './database'

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV

const db = setup(process.env.MONGO_URL, {
  useMongoClient: true,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD
})

db.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`[App] Listening on http://localhost:${PORT} in ${ENV} environment`)
  })
})
