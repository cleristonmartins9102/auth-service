import { Decrypt, Encrypt, GetCredentialsByRefreshToken, RefreshToken, UpdateCredentialRepository } from "@/data/domain"
import { RefreshTokenUsecase } from "@/data/features"
import { UserModel } from "@/data/model"
import mock from "jest-mock-extended/lib/Mock"
import { makeCredentialsStub } from "../../tests/stubs"

describe('RefreshTokenUsecase', () => {
  const fsCredentialRepository = mock<GetCredentialsByRefreshToken & UpdateCredentialRepository>()
  const jwtAdapter = mock<Encrypt<UserModel> & Decrypt<UserModel>>()
  const credential = makeCredentialsStub()

  beforeAll(() => {
    fsCredentialRepository.getByRefreshToken.mockResolvedValue(credential)
  })

  it('should call fsCredentialRepository.getByRefreshToken', async () => {
    const sut = new RefreshTokenUsecase(fsCredentialRepository, jwtAdapter)

    await sut.refresh('refreshTokenValue')

    expect(fsCredentialRepository.getByRefreshToken).toHaveBeenCalled()
    expect(fsCredentialRepository.getByRefreshToken).toHaveBeenCalledWith('refreshTokenValue')
  })

  it('should throw CredentialNotFoundError if fsCredentialRepository returns null', async () => {
    fsCredentialRepository.getByRefreshToken.mockResolvedValueOnce(null)
    const sut = new RefreshTokenUsecase(fsCredentialRepository, jwtAdapter)

    const response = sut.refresh('refreshTokenValue')

    await expect(response).rejects.toThrow()
  })

  it('should call JwtAdapter.decrypt with correct token', async () => {
    const sut = new RefreshTokenUsecase(fsCredentialRepository, jwtAdapter)

    await sut.refresh('refreshTokenValue')

    expect(jwtAdapter.decrypt).toHaveBeenCalled()
    expect(jwtAdapter.decrypt).toHaveBeenCalledWith(credential.token)
  })
})