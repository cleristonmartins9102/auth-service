import bcrypt from 'bcrypt'

import { BcryptAdapter } from "@/infra/adapters/bcrypt-adapter"
import { faker } from "@faker-js/faker/."

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  const fakePassword = faker.internet.password()
  const spy = jest.spyOn(bcrypt, 'hash')

  it('should call bcrypt.hash with correct values', async () => {
    const sut = new BcryptAdapter()

    await sut.hash(fakePassword)

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(fakePassword, 10)
  })

  it.only('should returns the same value received from bcrypt.hash', async () => {
    spy.mockReturnValueOnce('hashedValue' as any)
    const sut = new BcryptAdapter()

    const response = await sut.hash(fakePassword)
    expect(response).toBe('hashedValue')
  })
})