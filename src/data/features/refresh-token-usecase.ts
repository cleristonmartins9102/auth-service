import { CredentialsNotFoundError } from "@/application/errors/errors";
import { GetCredentialsByRefreshToken, RefreshToken } from "../domain";

export class RefreshTokenUsecase {
  constructor (private readonly fsCredentialRepository: GetCredentialsByRefreshToken) {}
  async refresh (refreshToken: string): Promise<void> {
    const credential = await this.fsCredentialRepository.getByRefreshToken(refreshToken)
    if (credential === null) throw new CredentialsNotFoundError('refreshToken', refreshToken)
  }
}