import { GetUserByEmail } from "@/data/domain"
import { AuthenticationUseCase } from "@/data/features"
import { faker } from "@faker-js/faker/."
import mock from "jest-mock-extended/lib/Mock"

describe('AuthenticationUseCase', () => {
  const userService = mock<GetUserByEmail>()
  const credentials = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  it('should call UserService.getUserByEmail with correct email', async () => {
    const sut = new AuthenticationUseCase(userService)

    await sut.auth(credentials)

    expect(userService.getByEmail).toHaveBeenCalled()
    expect(userService.getByEmail).toHaveBeenCalledWith(credentials.email)
  })
})