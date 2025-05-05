import { ExpiredTokenError } from "@/application/errors/errors";
import { Decrypt, RefreshToken } from "../domain";

export class ValidateTokenUsecase {
  constructor (
    private readonly jwtAdapter: Decrypt,
    private readonly refreshTokenUsecase: RefreshToken
  ) {}
  async validate (token: string, refreshToken: string): Promise<any> {
    try {
      const userModel = this.jwtAdapter.decrypt(token)
      return { token, refreshToken, payload: userModel }
    } catch (error) {
      if (error instanceof ExpiredTokenError) {
        const userModel = this.jwtAdapter.decrypt(refreshToken)
        const newTokens = await this.refreshTokenUsecase.refresh(refreshToken)
        return { ...newTokens, payload: userModel }
      } else {
        throw error
      }
    }
  }
}