import { Auth, GetUserByEmail } from "@/data/domain";

export class AuthenticationUseCase {
  constructor (private readonly userService: GetUserByEmail) {}
  async auth(params: Auth.Params): Promise<void> {
    await this.userService.getByEmail(params.email)
  }
}