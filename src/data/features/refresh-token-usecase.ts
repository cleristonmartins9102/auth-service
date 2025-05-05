import { CredentialsNotFoundError } from "@/application/errors/errors";
import { Decrypt, Encrypt, GetCredentialsByRefreshToken, RefreshToken } from "../domain";
import { UserModel } from "../model";

export class RefreshTokenUsecase {
  constructor (
    private readonly fsCredentialRepository: GetCredentialsByRefreshToken,
    private readonly jwtAdapter: Decrypt<UserModel>
  ) {}
  async refresh (refreshToken: string): Promise<void> {
    const credential = await this.fsCredentialRepository.getByRefreshToken(refreshToken)
    if (credential === null) throw new CredentialsNotFoundError('refreshToken', refreshToken)
    this.jwtAdapter.decrypt(credential.token)
  }
}