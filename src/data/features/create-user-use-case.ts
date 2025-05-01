import { CreateUser, Hash, Encrypt, UpdateToken } from "@/data/domain";
import { CreateUserModel, UserModel } from "@/data/model";
import { CreateUserRepository } from "@/data/domain/create-user-repository";

export class CreateUserUseCase implements CreateUser {
  constructor(
    private readonly hasher: Hash,
    private readonly jwtAdapter: Encrypt<CreateUserModel | UserModel>,
    private readonly fsUserRepository: CreateUserRepository,
    private readonly updateTokenUseCase: UpdateToken
  ) { }

  /**
  * Function for create new user hashing password and creating token and refresh token
  * @returns UserModel
  */
  async create(params: CreateUserModel): Promise<UserModel> {
    const hashedPassword = this.hasher.hash(params.password)
    let token = this.jwtAdapter.encrypt({ ...params, password: hashedPassword })
    let refreshToken = this.jwtAdapter.encrypt({ ...params, password: hashedPassword })
    const userModel = await this.fsUserRepository.create({ ...params, password: hashedPassword, token, refreshToken })
    await this.updateTokenUseCase.update(userModel)
    return '' as any
  }
}