import { ExpiredTokenError } from "@/application/errors/errors"
import { Decrypt, RefreshToken } from "@/data/domain"
import { ValidateTokenUsecase } from "@/data/features/validate-token-usecase"
import mock from "jest-mock-extended/lib/Mock"
import { makeCreateUserStub, makeUserModelStub } from "../../tests/stubs"

describe('ValidateTokenUsecase', () => {
  const token = 'userToken'
  const refreshToken = 'refreshToken'
  const jwtAdapter = mock<Decrypt>()
  const refreshTokenUsecase = mock<RefreshToken>()
  const createUser = makeCreateUserStub()
  const mockedUser = makeUserModelStub(createUser, 't', 'r')  
  let sut: ValidateTokenUsecase

  beforeAll(() => {
    jwtAdapter.decrypt.mockReturnValue({ ...mockedUser, iat: 333, exp: 111 })
    refreshTokenUsecase.refresh.mockResolvedValue({ token: 'newToken', refreshToken: 'newRefreshToken'})

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

  it('should return correct value if is a valid token', async () => {
    const response = await sut.validate(token, refreshToken)

    expect(response).toEqual({ token, refreshToken, payload: { ...mockedUser, iat: 333, exp: 111 }})
  })

  it('should return correct value if is a invalid token and refreshed', async () => {
    jwtAdapter.decrypt.mockImplementationOnce(() => {
      throw new ExpiredTokenError(new Error())
    })
    const response = await sut.validate(token, refreshToken)

    expect(response).toEqual({ token: 'newToken', refreshToken: 'newRefreshToken', payload: { ...mockedUser, iat: 333, exp: 111 } })
  })
})