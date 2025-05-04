import { Encrypt } from "@/data/domain"
import { CreateCredentialUsecase } from "@/data/features"
import { UserModel } from "@/data/model"
import mock from "jest-mock-extended/lib/Mock"
import { makeCreateUserStub, makeUserModelStub } from "../stubs"

describe('CreateCredential', () => {
  const jtwAdapter = mock<Encrypt<UserModel>>()
  const createUser = makeCreateUserStub()
  const mockedUser = makeUserModelStub(createUser, 't', 'r')

  it('should call JwtAdapter.encrypt with correct value', async () => {
    const sut = new CreateCredentialUsecase(jtwAdapter)

    await sut.create(mockedUser)

    expect(jtwAdapter.encrypt).toHaveBeenCalled()
    expect(jtwAdapter.encrypt).toHaveBeenCalledWith(mockedUser)
  })
})