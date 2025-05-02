import bcrypt from 'bcrypt'

import { BcryptAdapter } from "@/infra/adapters/bcrypt-adapter"
import { faker } from "@faker-js/faker/."

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  const fakePassword = faker.internet.password()

  it('should call bcrypt.hash with correct values', () => {
    const spy = jest.spyOn(bcrypt, 'hash')
    const sut = new BcryptAdapter()

    sut.hash(fakePassword)

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(fakePassword, 10)
  })

  it('should returns the same value received from bcrypt.hash', () => {
    const spy = jest.spyOn(bcrypt, 'hash') as any
    spy.mockReturnValueOnce('hashedValue')
    const sut = new BcryptAdapter()

    const response = sut.hash(fakePassword)

    expect(response).toBe('hashedValue')
  })
})