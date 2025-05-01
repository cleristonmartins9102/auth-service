import mock from 'jest-mock-extended/lib/Mock'
import crypto from 'crypto'

import { CreateUserUseCase } from "@/data/features/create-user-use-case"
import { CreateUser, Encrypt, Hash, UpdateToken } from '@/data/domain'
import { CreateUserModel } from '@/data/model'
import { makeCreateUserStub, makeUserModelStub } from '../../tests/stubs'

const createUserStub = makeCreateUserStub()

describe('CreateUserUseCase', () => {
  const fakeToken = crypto.randomBytes(32).toString('hex')
  const fakeRefreshToken = crypto.randomBytes(32).toString('hex')
  const hashedPassordStub = crypto.createHash('sha256').update(createUserStub.password).digest('hex')
  const hasher = mock<Hash>()
  const jwtAdapter = mock<Encrypt<CreateUserModel>>()
  const fsUserRepository = mock<CreateUser>()
  const updateTokenUseCase = mock<UpdateToken>()
  let sut: CreateUser
  
  const userModel = makeUserModelStub(createUserStub, fakeToken, fakeRefreshToken)

  beforeAll(() => {
    hasher.hash.mockReturnValue(hashedPassordStub)
    jwtAdapter.encrypt.mockReturnValueOnce(fakeToken).mockReturnValueOnce(fakeRefreshToken)
    fsUserRepository.create.mockResolvedValue(userModel)
    updateTokenUseCase.update.mockResolvedValue(userModel)
  })

  beforeEach(() => {
    sut = new CreateUserUseCase(hasher, jwtAdapter, fsUserRepository, updateTokenUseCase)
  })

    describe('Hasher', () => {
      it('should call hasher.hash with correct password', async () => {
        await sut.create(createUserStub)
    
        expect(hasher.hash).toHaveBeenCalled()
        expect(hasher.hash).toHaveBeenCalledWith(createUserStub.password)
      })
    
      it('should throws error if hasher.hash throw', async () => {
        hasher.hash.mockImplementationOnce(() => {
          throw new Error()
        })
        const response = sut.create(createUserStub)
    
        await expect(response).rejects.toThrow()
      })
    })

    describe('JwtAdapter', () => {
      it('should call jwtAdapter.encrypt with correct payload', async () => {
        await sut.create(createUserStub)
    
        expect(jwtAdapter.encrypt).toHaveBeenCalled()
        expect(jwtAdapter.encrypt).toHaveBeenCalledWith({ ...createUserStub, password: hashedPassordStub })
      })

      it('should throws error if JwtAdapter.encrypt throw', async () => {
        jwtAdapter.encrypt.mockImplementationOnce(() => {
          throw new Error()
        })
        const response = sut.create(createUserStub)
    
        await expect(response).rejects.toThrow()
      })
    })

    describe('Persisting user and updating token and refresh token after id is provided', () => {
      it('should call FsUserRepository.create with correct user data', async () => {
        await sut.create(createUserStub)
    
        expect(fsUserRepository.create).toHaveBeenCalled()
        expect(fsUserRepository.create).toHaveBeenCalledWith({ ...createUserStub, password: hashedPassordStub, token: fakeToken, refreshToken: fakeRefreshToken })
      })

      it('should throws if FsUserRepository throw', async () => {
        fsUserRepository.create.mockRejectedValueOnce(new Error(''))
        const response = sut.create(createUserStub)
    
        await expect(response).rejects.toThrow()
      })

      it('should call UpdateTokenUseCase with correct user data', async () => {
        await sut.create(createUserStub)
    
        expect(updateTokenUseCase.update).toHaveBeenCalled()
        expect(updateTokenUseCase.update).toHaveBeenCalledWith(userModel)
      })

      it('should throws if UpdateTokeUseCase throw', async () => {
        updateTokenUseCase.update.mockRejectedValueOnce(new Error(''))
        const response = sut.create(createUserStub)
    
        await expect(response).rejects.toThrow()
      })
    })

    it('should returns the same value received from FsUserRepository.create', async () => {
      const response = await sut.create(createUserStub)
  
      expect(response).toEqual(userModel)
    })
})