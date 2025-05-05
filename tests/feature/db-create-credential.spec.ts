import { CreateCredentialRepository, Encrypt, Hash } from "@/data/domain"
import { DbCreateCredential } from "@/data/features"
import { UserModel } from "@/data/model"
import mock from "jest-mock-extended/lib/Mock"
import { makeCreateUserStub, makeUserModelStub } from "../stubs"

describe('CreateCredential', () => {
  const jtwAdapter = mock<Encrypt<UserModel>>()
  const bcryptAdapter = mock<Hash>()
  const fsCredentialRepository = mock<CreateCredentialRepository>()
  const createUser = makeCreateUserStub()
  const mockedUser = makeUserModelStub(createUser, 't', 'r')

  beforeAll(() => {
    jtwAdapter.encrypt.mockReturnValue('generatedToken')
    bcryptAdapter.hash.mockResolvedValue('hashedValue')
  })


  it('should call JwtAdapter.encrypt with correct value', async () => {
    const sut = new DbCreateCredential(jtwAdapter, bcryptAdapter, fsCredentialRepository)

    await sut.create(mockedUser)

    expect(jtwAdapter.encrypt).toHaveBeenCalled()
    expect(jtwAdapter.encrypt).toHaveBeenCalledWith(mockedUser)
  })

  it('should call fsCredentialsRepository.create with correct value', async () => {
    const sut = new DbCreateCredential(jtwAdapter, bcryptAdapter, fsCredentialRepository)

    await sut.create(mockedUser)

    expect(fsCredentialRepository.create).toHaveBeenCalled()
    expect(fsCredentialRepository.create).toHaveBeenCalledWith({
      token: 'generatedToken',
      refreshToken: 'generatedToken',
      email: mockedUser.email,
      password: 'hashedValue',
      phoneVerified: false
    })
  })

  it('should returns correct value', async () => {
    const sut = new DbCreateCredential(jtwAdapter, bcryptAdapter, fsCredentialRepository)

    const response = await sut.create(mockedUser)

    expect(response).toEqual({
      token: 'generatedToken',
      refreshToken: 'generatedToken',
      payload: mockedUser
    })
  })
})