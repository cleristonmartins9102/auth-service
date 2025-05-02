import mock from "jest-mock-extended/lib/Mock"

import { Encrypt } from "@/data/domain"
import { JSONType } from "@/data/model"
import { GenerateTokenController } from "@/application/controllers"
import { faker } from "@faker-js/faker/."

describe('GenerateTokenController', () => {
  const jtwAdapter = mock<Encrypt<JSONType>>()
  const httpRequest = { 
    body: { name: faker.person.firstName() },
    params: {},
    query: {}
  }

  beforeAll(() => {
    jtwAdapter.encrypt.mockReturnValue('generatedToken')
  })

  it('should call JwtAdapter.encrypt with correct value', async () => {
    const sut = new GenerateTokenController(jtwAdapter)

    await sut.perform(httpRequest)

    expect(jtwAdapter.encrypt).toHaveBeenCalled()
    expect(jtwAdapter.encrypt).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should returns the same value received from JWTAdapter.encrypt', async () => {
    const sut = new GenerateTokenController(jtwAdapter)

    const response = await sut.perform(httpRequest)

    expect(response).toEqual({ statusCode: 200, body: 'generatedToken'})
  })
})