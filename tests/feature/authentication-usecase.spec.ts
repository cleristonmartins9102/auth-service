import mock from "jest-mock-extended/lib/Mock"
import { faker } from "@faker-js/faker/."

import { CredentialsNotFoundError, WrongPasswordError } from "@/application/errors/errors"
import { Auth, Decrypt, Compare, GetUserByEmail } from "@/data/domain"
import { AuthenticationUseCase } from "@/data/features"
import { makeCreateUserStub, makeUserModelStub } from "../../tests/stubs"
import { GetCredentialsByEmail } from "@/data/domain/get-credentials-by-email"
import { CredentialsModel } from "@/data/model"


const credentialModel: CredentialsModel = {
  email: faker.internet.email(),
  token: faker.database.mongodbObjectId(),
  refreshToken: faker.database.mongodbObjectId(),
  password: faker.internet.password(),
  id: 1,
  created_at: new Date()
}

describe('AuthenticationUseCase', () => {
  const userService = mock<GetUserByEmail>()
  const fsCredentialsRepository = mock<GetCredentialsByEmail>()
  const bcryptAdapter = mock<Compare>()
  const jwtAdapter = mock<Decrypt<CredentialsModel>>()
  const createUser = makeCreateUserStub()
  const mockedUser = makeUserModelStub(createUser, 't', 'r')
  const credentials = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  let sut: Auth

  beforeAll(() => {
    fsCredentialsRepository.getByEmail.mockResolvedValue(mockedUser)
    userService.getByEmail.mockResolvedValue(mockedUser)
    bcryptAdapter.compare.mockResolvedValue(true)
    fsCredentialsRepository.getByEmail.mockResolvedValue(credentialModel)
  })

  beforeEach(() => {
    fsCredentialsRepository.getByEmail.mockClear()
    bcryptAdapter.compare.mockClear()
    jwtAdapter.decrypt.mockClear()
    sut = new AuthenticationUseCase(fsCredentialsRepository, userService, bcryptAdapter, jwtAdapter)
  })

  it('should call FsCredentialsRepository with correct email', async () => {
    await sut.auth(credentials)

    expect(fsCredentialsRepository.getByEmail).toHaveBeenCalled()
    expect(fsCredentialsRepository.getByEmail).toHaveBeenCalledWith(credentials.email)
  })

  it('should returns error CredentialsNotFoundError if FsCredentialsRepository returns null', async () => {
    fsCredentialsRepository.getByEmail.mockResolvedValueOnce(null)

    const response = sut.auth(credentials)

    await expect(response).rejects.toThrow(CredentialsNotFoundError)
  })

  it('should returns thow if CredentialsNotFoundError thows', async () => {
    fsCredentialsRepository.getByEmail.mockRejectedValueOnce(new Error())

    const response = sut.auth(credentials)

    await expect(response).rejects.toThrow()
  })

  it('should call Bcrypt.compare with correct values ', async () => {
    await sut.auth(credentials)

    expect(bcryptAdapter.compare).toHaveBeenCalled()
    expect(bcryptAdapter.compare).toHaveBeenCalledWith(credentials.password, credentialModel.password)
  })

  it('should throws WrongPasswordError if bcrypt.compare returns false', async () => {
    bcryptAdapter.compare.mockResolvedValueOnce(false)
    const response = sut.auth(credentials)

    await expect(response).rejects.toThrow(WrongPasswordError)
  })

  it('should calls JwtAdapter.decrypt if password match', async () => {
    await sut.auth(credentials)

    expect(jwtAdapter.decrypt).toHaveBeenCalled()
    expect(jwtAdapter.decrypt).toHaveBeenCalledWith(credentialModel.token)
  })
})