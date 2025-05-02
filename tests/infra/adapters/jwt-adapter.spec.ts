import { JwtAdapter } from "@/infra/adapters"
import { faker } from "@faker-js/faker/."
import jsonwebtoken from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  const payload = { 
    name: faker.person.firstName()
  }
  const jsonwebtokenSpy = jest.spyOn(jsonwebtoken, 'sign')

  beforeAll(() => {
    jsonwebtokenSpy.mockReturnValue('mockedToken' as any)
  })
  
  beforeEach(() => {
    process.env.SECRET_KEY = '123456'
  })
  
  it('should call jsonwebtoken.sign with correct values', () => {
    const bufferSpy = jest.spyOn(Buffer, 'from')
    bufferSpy.mockReturnValueOnce('mockedBuffer' as any)
    const sut = new JwtAdapter()

    sut.encrypt(payload)

    expect(jsonwebtokenSpy).toHaveBeenCalled()
    expect(jsonwebtokenSpy).toHaveBeenCalledWith('mockedBuffer', '123456', { expiresIn: 3600 })
  })

  it('should return the same value received from jsonwebtoken.sign', () => {
    const bufferSpy = jest.spyOn(Buffer, 'from')
    bufferSpy.mockReturnValueOnce('mockedBuffer' as any)
    const sut = new JwtAdapter()

    const response = sut.encrypt(payload)

    expect(response).toBe('mockedToken')
  })

  it('should return NoSecretFoundError if SECRET_KEY not found', () => {
    delete process.env.SECRET_KEY
 
    const bufferSpy = jest.spyOn(Buffer, 'from')
    bufferSpy.mockReturnValueOnce('mockedBuffer' as any)
    const sut = new JwtAdapter()
    
    let error = null
    try {
      sut.encrypt(payload)
    } catch(err) {
      error = err
    }
    expect((error as any).constructor.name).toBe('NoSecretFoundError')
  })

  it('should return JwtAdapterError if jsonwebtoken.sign throws', () => {
    jsonwebtokenSpy.mockImplementationOnce(() => {
      throw new Error()
    })
    const bufferSpy = jest.spyOn(Buffer, 'from')
    bufferSpy.mockReturnValueOnce('mockedBuffer' as any)
    const sut = new JwtAdapter()
    
    let error = null
    try {
      sut.encrypt(payload)
    } catch(err) {
      error = err
    }
    expect((error as any).constructor.name).toBe('JwtAdapterError')
  })
})