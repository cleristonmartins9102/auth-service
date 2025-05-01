import mock from 'jest-mock-extended/lib/Mock'
import crypto from 'crypto'

import { Encrypt, UpdateToken, UpdateUserRepository } from '@/data/domain'
import { CreateUserModel } from '@/data/model'
import { makeCreateUserStub, makeUserModelStub } from '../stubs'
import { UpdateUserTokensUseCase } from '@/data/features'

const createUserStub = makeCreateUserStub()

describe('UpdateUserTokensUseCase', () => {
  const fakeToken = crypto.randomBytes(32).toString('hex')
  const fakeRefreshToken = crypto.randomBytes(32).toString('hex')
  const jwtAdapter = mock<Encrypt<CreateUserModel>>()
  const fsUserRepository = mock<UpdateUserRepository>()
  let sut: UpdateToken

  const userModel = makeUserModelStub(createUserStub, fakeToken, fakeRefreshToken)

  beforeAll(() => {
    jwtAdapter.encrypt.mockReturnValueOnce(fakeToken).mockReturnValueOnce(fakeRefreshToken)
    fsUserRepository.update.mockResolvedValue(userModel)
  })

  beforeEach(() => {
    sut = new UpdateUserTokensUseCase(jwtAdapter, fsUserRepository)
  })

  describe('JwtAdapter', () => {
    it('should call jwtAdapter.encrypt with correct payload', async () => {
      await sut.update(userModel)

      expect(jwtAdapter.encrypt.mock.calls[0][0]).toEqual(userModel)
      expect(jwtAdapter.encrypt.mock.calls[1][0]).toEqual(userModel)
    })
  })
})