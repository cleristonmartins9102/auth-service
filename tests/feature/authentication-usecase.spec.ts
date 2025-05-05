import mock from "jest-mock-extended/lib/Mock"
import { faker } from "@faker-js/faker/."

import { CredentialsNotFoundError, WrongPasswordError } from "@/application/errors/errors"
import { Auth, Decrypt, Compare, GetUserByEmail, Encrypt, RefreshToken } from "@/data/domain"
import { AuthenticationUsecase } from "@/data/features"
import { makeCreateUserStub, makeCredentialsStub, makeUserModelStub } from "../../tests/stubs"
import { GetCredentialsByEmail } from "@/data/domain/get-credentials-by-email"
import { UserModel } from "@/data/model"

const credentialModel = makeCredentialsStub()

describe('AuthenticationUseCase', () => {
  const refreshTokenUseCase = mock<RefreshToken>()
  const fsCredentialsRepository = mock<GetCredentialsByEmail>()
  const bcryptAdapter = mock<Compare>()
  const jwtAdapter = mock<Decrypt & Encrypt<UserModel>>()
  const createUser = makeCreateUserStub()
  const mockedUser = makeUserModelStub(createUser, 't', 'r')
  const credentialsStub = makeCredentialsStub()
  const credentials = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  let sut: Auth

  beforeAll(() => {
    fsCredentialsRepository.getByEmail.mockResolvedValue(credentialsStub)
    bcryptAdapter.compare.mockResolvedValue(true)
    fsCredentialsRepository.getByEmail.mockResolvedValue(credentialModel)
    jwtAdapter.decrypt.mockReturnValue({...mockedUser, iat: 3333, exp: 222 })
    refreshTokenUseCase.refresh.mockResolvedValue({ token: 'fakeToken', refreshToken: 'fakeRefreshToken' })
  })

  beforeEach(() => {
    fsCredentialsRepository.getByEmail.mockClear()
    bcryptAdapter.compare.mockClear()
    jwtAdapter.decrypt.mockClear()
    sut = new AuthenticationUsecase(fsCredentialsRepository, bcryptAdapter, jwtAdapter, refreshTokenUseCase)
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

  it('should calls refreshTokenUsecase with correct value', async () => {
    await sut.auth(credentials)

    expect(refreshTokenUseCase.refresh).toHaveBeenCalled()
    expect(refreshTokenUseCase.refresh).toHaveBeenCalledWith(credentialModel.refreshToken)
  })

  it('should calls JwtAdapter.decrypt if password match', async () => {
    await sut.auth(credentials)

    expect(jwtAdapter.decrypt).toHaveBeenCalled()
    expect(jwtAdapter.decrypt).toHaveBeenCalledWith(credentialModel.token)
  })

  it('should returns the correct value', async () => {
    const { password, ...withoutPassword } = mockedUser

    const response = await sut.auth(credentials)

    expect(response).toEqual({ token: 'fakeToken', refreshToken: 'fakeRefreshToken', payload: withoutPassword })
  })
})