import { GetCredentialsByRefreshToken, RefreshToken } from "@/data/domain"
import { RefreshTokenUsecase } from "@/data/features"
import mock from "jest-mock-extended/lib/Mock"

describe('RefreshTokenUsecase', () => {
  const fsCredentialRepository = mock<GetCredentialsByRefreshToken>()
  it('should call fsCredentialRepository.getByRefreshToken', async () => {
    const sut = new RefreshTokenUsecase(fsCredentialRepository)

    await sut.refresh('refreshTokenValue')

    expect(fsCredentialRepository.getByRefreshToken).toHaveBeenCalled()
    expect(fsCredentialRepository.getByRefreshToken).toHaveBeenCalledWith('refreshTokenValue')
  })

  it('should throw CredentialNotFoundError if fsCredentialRepository returns null', async () => {
    fsCredentialRepository.getByRefreshToken.mockResolvedValueOnce(null)
    const sut = new RefreshTokenUsecase(fsCredentialRepository)

    const response = sut.refresh('refreshTokenValue')

    await expect(response).rejects.toThrow()
  })
})