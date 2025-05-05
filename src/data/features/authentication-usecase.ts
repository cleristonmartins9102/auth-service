import { CredentialsNotFoundError, WrongPasswordError } from "@/application/errors/errors";
import { Auth, Compare, Decrypt, GetCredentialsByEmail, RefreshToken } from "@/data/domain";
import { UserModel } from "@/data/model";

export class AuthenticationUsecase implements Auth {
  constructor (
    private readonly fsCredentialsRepository: GetCredentialsByEmail,
    private readonly bcryptAdapter: Compare,
    private readonly jwtAdapter: Decrypt<UserModel & { iat: number }>,
    private readonly refreshTokenUsecase: RefreshToken
  ) {}
  async auth(params: Auth.Params): Promise<Auth.Result> {
    const credentials = await this.fsCredentialsRepository.getByEmail(params.email)
    if (null === credentials) throw new CredentialsNotFoundError('email', params.email)
    const response = await this.bcryptAdapter.compare(params.password, credentials.password)
    if (false === response) throw new WrongPasswordError()
    const refreshedTokend = await this.refreshTokenUsecase.refresh(credentials.refreshToken)
    const tokenPayload = this.jwtAdapter.decrypt(credentials.token)
    const { password, ...withoutPassword } = tokenPayload
    return { token: refreshedTokend.token, refreshToken: refreshedTokend.refreshToken, payload: withoutPassword }
  }
}