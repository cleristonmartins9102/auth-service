import { CredentialsNotFoundError, WrongPasswordError } from "@/application/errors/errors";
import { Auth, Compare, GetUserByEmail } from "@/data/domain";
import { UserModel } from "../model";
import { GetCredentialsByEmail } from "../domain/get-credentials-by-email";

export class AuthenticationUseCase implements Auth {
  constructor (
    private readonly fsCredentialsRepository: GetCredentialsByEmail,
    private readonly userService: GetUserByEmail,
    private readonly bcryptAdapter: Compare
  ) {}
  async auth(params: Auth.Params): Promise<UserModel> {
    const credentials = await this.fsCredentialsRepository.getByEmail(params.email)
    if (null === credentials) throw new CredentialsNotFoundError('email', params.email)
    const response = await this.bcryptAdapter.compare(params.password, credentials.password)
    if (false === response) throw new WrongPasswordError()
    return '' as any
  }
}