import { JwtAdapter } from "@/infra/adapters"
import jsonwebtoken from 'jsonwebtoken'
import { makeCreateUserStub, makeUserModelStub } from "../../../tests/stubs"

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  const createUserStub = makeCreateUserStub()
  const userModelStub = makeUserModelStub(createUserStub, 'r','r')
  const payload = userModelStub
  const jsonwebtokenSpy = jest.spyOn(jsonwebtoken, 'sign')

  beforeAll(() => {
    jsonwebtokenSpy.mockReturnValue('mockedToken' as any)
  })
  
  beforeEach(() => {
    process.env.SECRET_KEY = '123456'
  })
  
  it('should call jsonwebtoken.sign with correct values', () => {
    const sut = new JwtAdapter()

    sut.encrypt(payload)

    expect(jsonwebtokenSpy).toHaveBeenCalled()
    expect(jsonwebtokenSpy).toHaveBeenCalledWith(payload, '123456', { expiresIn: '1h' })
  })

  it('should return the same value received from jsonwebtoken.sign', () => {
    const sut = new JwtAdapter()

    const response = sut.encrypt(payload)

    expect(response).toBe('mockedToken')
  })

  it('should return NoSecretFoundError if SECRET_KEY not found', () => {
    delete process.env.SECRET_KEY
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