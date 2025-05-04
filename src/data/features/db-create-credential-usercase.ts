import { CreateCredential, CreateCredentialRepository, Encrypt } from "../domain";
import { UserModel } from "../model";

export class DbCreateCredentialUsecase implements CreateCredential {
  constructor (
    private readonly jwtAdapter: Encrypt<UserModel>,
    private readonly fsCredentialRepository: CreateCredentialRepository
  ) {}
  async create (userModel: UserModel): Promise<{ token: string, refreshToken: string, payload: UserModel }> {
    const token = this.jwtAdapter.encrypt(userModel)
    const refreshToken = this.jwtAdapter.encrypt(userModel)
    await this.fsCredentialRepository.create({
      token,
      refreshToken,
      email: userModel.email,
      password: userModel.password
    })
    return {
      token,
      refreshToken,
      payload: userModel
    }
  }
}