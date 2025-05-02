import { JwtAdapter } from "@/infra/adapters"
import { faker } from "@faker-js/faker/."
import jsonwebtoken from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  process.env.SECRET_KEY = '123456'
  const payload = { 
    name: faker.person.firstName()
  }
  
  it('should call jsonwebtoken.sign with correct values', () => {
    const spy = jest.spyOn(jsonwebtoken, 'sign')
    const bufferSpy = jest.spyOn(Buffer, 'from')
    bufferSpy.mockReturnValueOnce('mockedBuffer' as any)
    const sut = new JwtAdapter()

    sut.encrypt(payload)

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('mockedBuffer', '123456')
  })
})