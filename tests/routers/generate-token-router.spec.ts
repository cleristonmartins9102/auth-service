import { createApp } from '@/main/config/app'
import request from 'supertest'

describe('Generate Token Router', () => {
  process.env.SECRET_KEY = '123456'
  it('should returns 400 if missing param name', async () => {
    const httpResponse = await request(createApp())
      .post('/api/token')
      .send({})
      .expect(400)
      expect(httpResponse.body.errors[0].path).toContain('name')
  })

  it('should returns 400 if missing param surname', async () => {
    const httpResponse = await request(createApp())
      .post('/api/token')
      .send({})
      .expect(400)
      expect(httpResponse.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: expect.arrayContaining(['surname'])
          })
        ])
      )
  })

  it('should returns 400 if missing param email', async () => {
    const httpResponse = await request(createApp())
      .post('/api/token')
      .send({})
      .expect(400)
      expect(httpResponse.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: expect.arrayContaining(['email'])
          })
        ])
      )
  })
})