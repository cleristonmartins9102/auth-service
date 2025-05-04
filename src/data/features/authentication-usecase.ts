import { CredentialsNotFoundError, WrongPasswordError } from "@/application/errors/errors";
import { Auth, Compare, Decrypt, GetUserByEmail, GetCredentialsByEmail } from "@/data/domain";
import { CredentialsModel, UserModel } from "@/data/model";

export class AuthenticationUseCase implements Auth {
  constructor (
    private readonly fsCredentialsRepository: GetCredentialsByEmail,
    private readonly userService: GetUserByEmail,
    private readonly bcryptAdapter: Compare,
    private readonly jwtAdapter: Decrypt<UserModel & { iat: number }>,
  ) {}
  async auth(params: Auth.Params): Promise<Auth.Result> {
    const credentials = await this.fsCredentialsRepository.getByEmail(params.email)
    if (null === credentials) throw new CredentialsNotFoundError('email', params.email)
    const response = await this.bcryptAdapter.compare(params.password, credentials.password)
    if (false === response) throw new WrongPasswordError()
    const tokenPayload = this.jwtAdapter.decrypt(credentials.token)
    return { token: credentials.token, refreshToken: credentials.refreshToken, payload: tokenPayload }
  }
}