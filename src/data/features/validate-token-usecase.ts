import { ExpiredTokenError } from "@/application/errors/errors";
import { Decrypt, RefreshToken } from "../domain";

export class ValidateTokenUsecase {
  constructor (
    private readonly jwtAdapter: Decrypt,
    private readonly refreshTokenUsecase: RefreshToken
  ) {}
  async validate (token: string, refreshToken: string): Promise<void> {
    try {
      this.jwtAdapter.decrypt(token)
    } catch (error) {
      if (error instanceof ExpiredTokenError) {
        await this.refreshTokenUsecase.refresh(refreshToken)
      } else {
        throw error
      }
    }
  }
}