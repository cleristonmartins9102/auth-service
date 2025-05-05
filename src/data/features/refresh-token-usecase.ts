import { CredentialsNotFoundError } from "@/application/errors/errors";
import { Decrypt, Encrypt, GetCredentialsByRefreshToken, RefreshToken, UpdateCredentialRepository } from "../domain";
import { UserModel } from "../model";

export class RefreshTokenUsecase implements RefreshToken {
  constructor (
    private readonly fsCredentialRepository: GetCredentialsByRefreshToken & UpdateCredentialRepository,
    private readonly jwtAdapter: Decrypt<UserModel> & Encrypt<UserModel>
  ) {}
  async refresh (refreshToken: string): Promise<RefreshToken.Return> {
    const credential = await this.fsCredentialRepository.getByRefreshToken(refreshToken)
    if (credential === null) throw new CredentialsNotFoundError('refreshToken', refreshToken)
    const tokenPayload = this.jwtAdapter.decrypt(credential.token)
    const updatedToken = this.jwtAdapter.encrypt(tokenPayload)
    const updatedRefreshToken = this.jwtAdapter.encrypt(tokenPayload)
    await this.fsCredentialRepository.update(credential.id, { token: updatedToken, refreshToken: updatedRefreshToken })
    return {
      token: updatedToken,
      refreshToken: updatedRefreshToken
    }
  }
}