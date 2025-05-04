import { CreateCredentialRepository, Encrypt } from "@/data/domain"
import { DbCreateCredentialUsecase } from "@/data/features"
import { UserModel } from "@/data/model"
import mock from "jest-mock-extended/lib/Mock"
import { makeCreateUserStub, makeUserModelStub } from "../stubs"

describe('CreateCredential', () => {
  const jtwAdapter = mock<Encrypt<UserModel>>()
  const fsCredentialRepository = mock<CreateCredentialRepository>()
  const createUser = makeCreateUserStub()
  const mockedUser = makeUserModelStub(createUser, 't', 'r')

  beforeAll(() => {
    jtwAdapter.encrypt.mockReturnValue('generatedToken')
  })


  it('should call JwtAdapter.encrypt with correct value', async () => {
    const sut = new DbCreateCredentialUsecase(jtwAdapter, fsCredentialRepository)

    await sut.create(mockedUser)

    expect(jtwAdapter.encrypt).toHaveBeenCalled()
    expect(jtwAdapter.encrypt).toHaveBeenCalledWith(mockedUser)
  })

  it('should call fsCredentialsRepository.create with correct value', async () => {
    const sut = new DbCreateCredentialUsecase(jtwAdapter, fsCredentialRepository)

    await sut.create(mockedUser)

    expect(fsCredentialRepository.create).toHaveBeenCalled()
    expect(fsCredentialRepository.create).toHaveBeenCalledWith({
      token: 'generatedToken',
      refreshToken: 'generatedToken',
      email: mockedUser.email,
      password: mockedUser.password
    })
  })
})