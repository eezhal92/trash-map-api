import app from 'src/app'
import { resolve } from 'path'
import supertest from 'supertest'
import { setup } from 'src/database'

const request = supertest(app)

const db = setup('mongodb://localhost/trash-map-test', {
  useMongoClient: true
})

beforeAll(async () => {
  await db.connect()
})

afterAll(async () => {
  await db.clear()
  await db.close()
})

describe('POST /api/trashes', () => {
  test('latitude field is required', () => {
    const payload = { longitude: 0.1111 }

    return request.post('/api/trashes')
      .send(payload)
      .expect((response) => {
        expect(response.status).toBe(422)
        expect(response.body.errors.latitude[0]).toMatch(/required/)
      })
  })

  test('longitude field is required', () => {
    const payload = { latitude: 0.2222 }

    return request.post('/api/trashes')
      .send(payload)
      .expect((response) => {
        expect(response.status).toBe(422)
        expect(response.body.errors.longitude[0]).toMatch(/required/)
      })
  })

  test('photo field is required', () => {
    const payload = { latitude: 0.2222, longitude: 0.1111 }

    return request.post('/api/trashes')
      .send(payload)
      .expect((response) => {
        expect(response.status).toBe(422)
        expect(response.body.errors.photo[0]).toMatch(/required/)
      })
  })

  test('able to submit trash coordinate', () => {
    const photoPath = resolve(__dirname, '../fixtures/photo.jpeg')

    return request.post('/api/trashes')
      .field('latitude', 0.2222)
      .field('longitude', 0.1111)
      .attach('photo', photoPath)
      .expect((response) => {
        expect(response.status).toBe(201)
        expect(response.body.latitude).toBe(0.2222)
        expect(response.body.longitude).toBe(0.1111)
        expect(response.body.photo.url).toMatch('localhost/public/storage')
      })
  })
})
