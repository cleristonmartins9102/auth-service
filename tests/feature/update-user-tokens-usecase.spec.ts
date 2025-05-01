import mock from 'jest-mock-extended/lib/Mock'
import crypto from 'crypto'

import { Encrypt, UpdateToken, UpdateUserRepository } from '@/data/domain'
import { CreateUserModel } from '@/data/model'
import { makeCreateUserStub, makeUserModelStub } from '../stubs'
import { UpdateUserTokensUseCase } from '@/data/features'

const createUserStub = makeCreateUserStub()
const fakeToken = crypto.randomBytes(32).toString('hex')
const fakeRefreshToken = crypto.randomBytes(32).toString('hex')
const userModel = makeUserModelStub(createUserStub, fakeToken, fakeRefreshToken)

describe('UpdateUserTokensUseCase', () => {
  const jwtAdapter = mock<Encrypt<CreateUserModel>>()
  const fsUserRepository = mock<UpdateUserRepository>()
  let sut: UpdateToken

  beforeEach(() => {
    jest.clearAllMocks()
    fsUserRepository.update.mockResolvedValue(userModel)
  })

  describe('JwtAdapter', () => {
    it('should call jwtAdapter.encrypt with correct payload', async () => {
      jwtAdapter.encrypt
        .mockReturnValueOnce(fakeToken)
        .mockReturnValueOnce(fakeRefreshToken)

      sut = new UpdateUserTokensUseCase(jwtAdapter, fsUserRepository)

      await sut.update(userModel)

      expect(jwtAdapter.encrypt.mock.calls[0][0]).toEqual(userModel)
      expect(jwtAdapter.encrypt.mock.calls[1][0]).toEqual(userModel)
    })

    it('should throw if jwtAdapter.encrypt throws', async () => {
      jwtAdapter.encrypt.mockImplementationOnce(() => {
        throw new Error('encrypt failed')
      })

      sut = new UpdateUserTokensUseCase(jwtAdapter, fsUserRepository)
      
      await expect(sut.update(userModel)).rejects.toThrow('encrypt failed')
    })

    it('should return values with updated token and refreshToken', async () => {
      jwtAdapter.encrypt
        .mockReturnValueOnce(fakeToken)
        .mockReturnValueOnce(fakeRefreshToken)

      sut = new UpdateUserTokensUseCase(jwtAdapter, fsUserRepository)
      const response = await sut.update(userModel)

      expect(response).toEqual({ ...userModel, token: fakeToken, refreshToken: fakeRefreshToken })
    })
  })
})
