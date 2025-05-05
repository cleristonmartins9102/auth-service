import { Decrypt } from "@/data/domain"
import { ValidateTokenUsecase } from "@/data/features/validate-token-usecase"
import mock from "jest-mock-extended/lib/Mock"

describe('ValidateTokenUsecase', () => {
  const token = 'userToken'
  const jwtAdapter = mock<Decrypt>()

  it('should call JwtAdapter.decrypt with correct token', async () => {
    const sut = new ValidateTokenUsecase(jwtAdapter)

    await sut.validate(token)

    expect(jwtAdapter.decrypt).toHaveBeenCalled()
    expect(jwtAdapter.decrypt).toHaveBeenCalledWith(token)
  })
})