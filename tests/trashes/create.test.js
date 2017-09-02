import app from 'src/app'
import supertest from 'supertest'

const request = supertest(app)

describe('/api/trashes', () => {
  test('latitude field is required', () => {
    const payload = { longitude: 0.1111 }

    return request.post('/api/trashes')
      .send(payload)
      .expect(({ body }) => {
        expect(body.errors.latitude[0]).toMatch(/required/)
      })
  })

  test('longitude field is required', () => {
    const payload = { latitude: 0.2222 }

    return request.post('/api/trashes')
      .send(payload)
      .expect(({ body }) => {
        expect(body.errors.longitude[0]).toMatch(/required/)
      })
  })

  test('photo field is required', () => {
    const payload = { latitude: 0.2222, longitude: 0.1111 }

    return request.post('/api/trashes')
      .send(payload)
      .expect(({ body }) => {
        expect(body.errors.photo[0]).toMatch(/required/)
      })
  })
})
