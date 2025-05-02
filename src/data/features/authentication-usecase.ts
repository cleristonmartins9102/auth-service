import { UserNotFoundError } from "@/application/errors/errors";
import { Auth, GetUserByEmail } from "@/data/domain";

export class AuthenticationUseCase {
  constructor (private readonly userService: GetUserByEmail) {}
  async auth(params: Auth.Params): Promise<void> {
    const user = await this.userService.getByEmail(params.email)
    if (null === user) throw new UserNotFoundError('email', params.email)
  }
}