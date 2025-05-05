import { CreateCredential, CreateCredentialRepository, Encrypt, Hash } from "../domain";
import { UserModel } from "../model";

export class DbCreateCredential implements CreateCredential {
  constructor (
    private readonly jwtAdapter: Encrypt<UserModel>,
    private readonly bcryptAdapter: Hash,
    private readonly fsCredentialRepository: CreateCredentialRepository
  ) {}
  async create (userModel: UserModel): Promise<{ token: string, refreshToken: string, payload: UserModel }> {
    const token = this.jwtAdapter.encrypt(userModel, '15m')
    const refreshToken = this.jwtAdapter.encrypt(userModel, '730h')
    const password = await this.bcryptAdapter.hash(userModel.password)
    await this.fsCredentialRepository.create({
      token,
      refreshToken,
      email: userModel.email,
      password: password,
      phoneVerified: false
    })
    return {
      token,
      refreshToken,
      payload: userModel
    }
  }
}