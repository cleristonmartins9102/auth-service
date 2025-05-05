import { Decrypt } from "../domain";

export class ValidateTokenUsecase {
  constructor (
    private readonly jwtAdapter: Decrypt
  ) {}
  async validate (token: string): Promise<void> {
    this.jwtAdapter.decrypt(token)
  }
}