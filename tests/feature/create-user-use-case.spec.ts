import mock, { MockProxy } from 'jest-mock-extended/lib/Mock'
import { faker } from '@faker-js/faker'
import { CreateUserUseCase } from "@/data/features/create-user-use-case"
import { Hash } from '@/data/domain'
import { CreateUserModel } from '@/data/model'

const createUserStub: CreateUserModel = {
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  countryDialCode: '+44',
  phoneNumber: faker.phone.number()
} 

describe('CreateUserUseCase', () => {
  const hasher = mock<Hash>()
  it('should call hasher.hash with correct password', async () => {
    const sut = new CreateUserUseCase(hasher)

    await sut.create(createUserStub)

    expect(hasher.hash).toHaveBeenCalled()
    expect(hasher.hash).toHaveBeenCalledWith(createUserStub.password)
  })

  it('should throws error if hasher.hash throw', async () => {
    hasher.hash.mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new CreateUserUseCase(hasher)

    const response = sut.create(createUserStub)

    await expect(response).rejects.toThrow()
  })
})