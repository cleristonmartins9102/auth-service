import mock from "jest-mock-extended/lib/Mock"
import { faker } from "@faker-js/faker/."

import { UserNotFoundError } from "@/application/errors/errors"
import { GetUserByEmail } from "@/data/domain"
import { AuthenticationUseCase } from "@/data/features"
import { makeCreateUserStub, makeUserModelStub } from "../../tests/stubs"

describe('AuthenticationUseCase', () => {
  const userService = mock<GetUserByEmail>()
  const createUser = makeCreateUserStub()
  const mockedUser = makeUserModelStub(createUser, 't', 'r')
  const credentials = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  beforeAll(() => {
    userService.getByEmail.mockResolvedValue(mockedUser)
  })

  it('should call UserService.getUserByEmail with correct email', async () => {
    const sut = new AuthenticationUseCase(userService)

    await sut.auth(credentials)

    expect(userService.getByEmail).toHaveBeenCalled()
    expect(userService.getByEmail).toHaveBeenCalledWith(credentials.email)
  })

  it('should returns error UserNotFoundError if UserService returns null', async () => {
    userService.getByEmail.mockResolvedValueOnce(null)
    const sut = new AuthenticationUseCase(userService)

    const response = sut.auth(credentials)

    await expect(response).rejects.toThrow(UserNotFoundError)
  })

  it('should returns thow if UserService thows', async () => {
    userService.getByEmail.mockRejectedValueOnce(new Error())
    const sut = new AuthenticationUseCase(userService)

    const response = sut.auth(credentials)

    await expect(response).rejects.toThrow()
  })

  it('should returns the same value received from UserService', async () => {
    const sut = new AuthenticationUseCase(userService)

    const response = await sut.auth(credentials)

    expect(response).toEqual(mockedUser)
  })
})