import mock, { MockProxy } from 'jest-mock-extended/lib/Mock'
import { faker } from '@faker-js/faker'
import crypto from 'crypto'

import { CreateUserUseCase } from "@/data/features/create-user-use-case"
import { CreateUser, Encrypt, Hash } from '@/data/domain'
import { CreateUserModel } from '@/data/model'

const createUserStub: CreateUserModel = {
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  countryDialCode: '+44',
  phoneNumber: faker.phone.number()
} 

describe('CreateUserUseCase', () => {
  const hashedPassordStub = crypto.createHash('sha256').update(createUserStub.password).digest('hex')
  const hasher = mock<Hash>()
  const jwtAdapter = mock<Encrypt<CreateUserModel>>()
  let sut: CreateUser

  beforeAll(() => {
    hasher.hash.mockReturnValueOnce(hashedPassordStub)
  })

  beforeEach(() => {
    sut = new CreateUserUseCase(hasher, jwtAdapter)
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
      it('should call jwtAdapter.encript with correct payload', async () => {
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
})