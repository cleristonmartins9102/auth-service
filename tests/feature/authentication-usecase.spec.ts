import mock from "jest-mock-extended/lib/Mock"
import { faker } from "@faker-js/faker/."

import { CredentialsNotFoundError, WrongPasswordError } from "@/application/errors/errors"
import { Auth, Compare, GetUserByEmail } from "@/data/domain"
import { AuthenticationUseCase } from "@/data/features"
import { makeCreateUserStub, makeUserModelStub } from "../../tests/stubs"
import { GetCredentialsByEmail } from "@/data/domain/get-credentials-by-email"

describe('AuthenticationUseCase', () => {
  const userService = mock<GetUserByEmail>()
  const fsCredentialsRepository = mock<GetCredentialsByEmail>()
  const bcryptAdapter = mock<Compare>()
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
  })

  beforeEach(() => {
    sut = new AuthenticationUseCase(fsCredentialsRepository, userService, bcryptAdapter)
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
    expect(bcryptAdapter.compare).toHaveBeenCalledWith(credentials.password, mockedUser.password)
  })

  it('should throws WrongPasswordError if bcrypt.compare returns false', async () => {
    bcryptAdapter.compare.mockResolvedValueOnce(false)
    const response = sut.auth(credentials)

    await expect(response).rejects.toThrow(WrongPasswordError)
  })
})