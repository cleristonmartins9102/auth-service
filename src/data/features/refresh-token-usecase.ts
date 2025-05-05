import { CredentialsNotFoundError } from "@/application/errors/errors";
import { Decrypt, Encrypt, GetCredentialsByRefreshToken, RefreshToken, UpdateCredentialRepository } from "../domain";
import { UserModel } from "../model";

export class RefreshTokenUsecase implements RefreshToken {
  constructor (
    private readonly fsCredentialRepository: GetCredentialsByRefreshToken & UpdateCredentialRepository,
    private readonly jwtAdapter: Decrypt & Encrypt<UserModel>
  ) {}
  async refresh (refreshToken: string): Promise<RefreshToken.Return> {
    const credential = await this.fsCredentialRepository.getByRefreshToken(refreshToken)
    if (credential === null) throw new CredentialsNotFoundError('refreshToken', refreshToken)
    const tokenPayload = this.jwtAdapter.decrypt(credential.refreshToken)
    const { iat, exp, ...cleanedPayload } = tokenPayload
    const updatedToken = this.jwtAdapter.encrypt(cleanedPayload, '15m')
    const updatedRefreshToken = this.jwtAdapter.encrypt(cleanedPayload, '730h')
    await this.fsCredentialRepository.update(credential.id, { token: updatedToken, refreshToken: updatedRefreshToken })
    return {
      token: updatedToken,
      refreshToken: updatedRefreshToken
    }
  }
}