import mock from "jest-mock-extended/lib/Mock"

import { Encrypt } from "@/data/domain"
import { JSONType } from "@/data/model"
import { GenerateTokenController } from "@/application/controllers"
import { faker } from "@faker-js/faker/."

describe('GenerateTokenController', () => {
  const jtwAdapter = mock<Encrypt<JSONType>>()
  
  it('should call JwtAdapter.encrypt with correct value', async () => {
    const httpRequest = { 
      body: { name: faker.person.firstName() },
      params: {},
      query: {}
    }
    const sut = new GenerateTokenController(jtwAdapter)

    await sut.perform(httpRequest)

    expect(jtwAdapter.encrypt).toHaveBeenCalled()
    expect(jtwAdapter.encrypt).toHaveBeenCalledWith(httpRequest.body)
  })
})