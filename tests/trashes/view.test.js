import app from 'src/app'
import supertest from 'supertest'
import { setup } from 'src/database'

import { createWithPhoto } from '../factory/trashes'

const request = supertest(app)

const db = setup('mongodb://localhost/trash-map-test', {
  useMongoClient: true
})

beforeAll(async () => {
  await db.connect()

  // Create one record
  await createWithPhoto({
    latitude: 128.111,
    longitude: 0.2222
  }, {
    filename: 'test.jpg',
    url: 'http://localhost/public/storage/photos/test.jpg'
  })
})

afterAll(async () => {
  await db.clear()
  await db.close()
})

describe('GET /api/trashes', () => {
  test('can retrieve all of trash coordinates', () => {
    return request.get('/api/trashes')
      .expect((response) => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
      })
  })
})
