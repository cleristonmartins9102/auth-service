import { GetCredentialsByRefreshToken, RefreshToken } from "@/data/domain"
import { RefreshTokenUsecase } from "@/data/features"
import { FsCredentialRepository } from "@/infra/repository/fs-credential-repository"
import mock from "jest-mock-extended/lib/Mock"

describe('RefreshTokenUsecase', () => {
  const fsCredentialRepository = mock<GetCredentialsByRefreshToken>()
  it('should call fsCredentialRepository.getByRefreshToken', async () => {
    const sut = new RefreshTokenUsecase(fsCredentialRepository)

    await sut.refresh('refreshTokenValue')

    expect(fsCredentialRepository.getByRefreshToken).toHaveBeenCalled()
    expect(fsCredentialRepository.getByRefreshToken).toHaveBeenCalledWith('refreshTokenValue')
  })
})