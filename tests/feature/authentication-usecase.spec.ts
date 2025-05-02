import mock from "jest-mock-extended/lib/Mock"
import { faker } from "@faker-js/faker/."

import { UserNotFoundError, WrongPasswordError } from "@/application/errors/errors"
import { Auth, Compare, GetUserByEmail } from "@/data/domain"
import { AuthenticationUseCase } from "@/data/features"
import { makeCreateUserStub, makeUserModelStub } from "../../tests/stubs"

describe('AuthenticationUseCase', () => {
  const userService = mock<GetUserByEmail>()
  const bcryptAdapter = mock<Compare>()
  const createUser = makeCreateUserStub()
  const mockedUser = makeUserModelStub(createUser, 't', 'r')
  const credentials = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  let sut: Auth

  beforeAll(() => {
    userService.getByEmail.mockResolvedValue(mockedUser)
    bcryptAdapter.compare.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = new AuthenticationUseCase(userService, bcryptAdapter)
  })

  it('should call UserService.getUserByEmail with correct email', async () => {
    await sut.auth(credentials)

    expect(userService.getByEmail).toHaveBeenCalled()
    expect(userService.getByEmail).toHaveBeenCalledWith(credentials.email)
  })

  it('should returns error UserNotFoundError if UserService returns null', async () => {
    userService.getByEmail.mockResolvedValueOnce(null)

    const response = sut.auth(credentials)

    await expect(response).rejects.toThrow(UserNotFoundError)
  })

  it('should returns thow if UserService thows', async () => {
    userService.getByEmail.mockRejectedValueOnce(new Error())

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