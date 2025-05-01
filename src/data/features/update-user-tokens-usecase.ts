import { Encrypt, UpdateToken, UpdateUserRepository } from "@/data/domain";
import { CreateUserModel, UserModel } from "@/data/model";

export class UpdateUserTokensUseCase implements UpdateToken {
  constructor(
    private readonly jwtAdapter: Encrypt<CreateUserModel | UserModel>,
    private readonly fsUserRepository: UpdateUserRepository,
  ) { }

  /**
  * Function for update token and refresh token
  * @returns UserModel
  */
  async update(payload: UserModel): Promise<UserModel> {
    const token = this.jwtAdapter.encrypt(payload)
    const refreshToken = this.jwtAdapter.encrypt(payload)
    return '' as any
  }
}