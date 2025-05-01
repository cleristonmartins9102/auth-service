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
})