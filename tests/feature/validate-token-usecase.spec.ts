import { ExpiredTokenError } from "@/application/errors/errors"
import { Decrypt, RefreshToken, ValidateToken } from "@/data/domain"
import { ValidateTokenUsecase } from "@/data/features/validate-token-usecase"
import mock from "jest-mock-extended/lib/Mock"

describe('ValidateTokenUsecase', () => {
  const token = 'userToken'
  const refreshToken = 'refreshToken'
  const jwtAdapter = mock<Decrypt>()
  const refreshTokenUsecase = mock<RefreshToken>()
  let sut: ValidateTokenUsecase

  beforeAll(() => {
    sut = new ValidateTokenUsecase(jwtAdapter, refreshTokenUsecase)
  })

  it('should call JwtAdapter.decrypt with correct token', async () => {
    await sut.validate(token, refreshToken)

    expect(jwtAdapter.decrypt).toHaveBeenCalled()
    expect(jwtAdapter.decrypt).toHaveBeenCalledWith(token)
  })

  it('should call rethrow if JwtAdapter throw', async () => {
    jwtAdapter.decrypt.mockImplementationOnce(() => {
      throw new Error()
    })
    let error
    try {
      await sut.validate(token, refreshToken)
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(Error)
  })

  it('should call refreshTokenUsecase if token has expired', async () => {
    jwtAdapter.decrypt.mockImplementationOnce(() => {
      throw new ExpiredTokenError(new Error())
    })
    try {
      await sut.validate(token, refreshToken)
    } catch (err) {
    }

    expect(refreshTokenUsecase.refresh).toHaveBeenCalled()
  })
})