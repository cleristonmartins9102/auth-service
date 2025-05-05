import { CreateCredential, CreateCredentialRepository, Encrypt, Hash } from "../domain";
import { UserModel } from "../model";

export class DbCreateCredential implements CreateCredential {
  constructor (
    private readonly jwtAdapter: Encrypt<UserModel>,
    private readonly bcryptAdapter: Hash,
    private readonly fsCredentialRepository: CreateCredentialRepository
  ) {}
  async create (userModel: UserModel): Promise<{ token: string, refreshToken: string, payload: UserModel }> {
    const token = this.jwtAdapter.encrypt(userModel)
    const refreshToken = this.jwtAdapter.encrypt(userModel)
    const password = await this.bcryptAdapter.hash(userModel.password)
    await this.fsCredentialRepository.create({
      token,
      refreshToken,
      email: userModel.email,
      password: password
    })
    return {
      token,
      refreshToken,
      payload: userModel
    }
  }
}