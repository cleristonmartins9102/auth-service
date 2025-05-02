import { UserNotFoundError } from "@/application/errors/errors";
import { Auth, GetUserByEmail } from "@/data/domain";
import { UserModel } from "../model";

export class AuthenticationUseCase implements Auth {
  constructor (private readonly userService: GetUserByEmail) {}
  async auth(params: Auth.Params): Promise<UserModel> {
    const user = await this.userService.getByEmail(params.email)
    if (null === user) throw new UserNotFoundError('email', params.email)
    return user
  }
}