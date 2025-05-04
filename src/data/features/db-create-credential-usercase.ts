import { CreateCredentialRepository, Encrypt } from "../domain";
import { UserModel } from "../model";

export class DbCreateCredentialUsecase {
  constructor (
    private readonly jwtAdapter: Encrypt<UserModel>,
    private readonly fsCredentialRepository: CreateCredentialRepository
  ) {}
  async create (userModel: UserModel): Promise<void> {
    const token = this.jwtAdapter.encrypt(userModel)
    const refreshToken = this.jwtAdapter.encrypt(userModel)
    await this.fsCredentialRepository.create({
      token,
      refreshToken,
      email: userModel.email,
      password: userModel.password
    })
  }
}