import { CreateUser, Hash, Encrypt } from "@/data/domain";
import { CreateUserModel, UserModel } from "@/data/model";
import { CreateUserRepository } from "@/data/domain/create-user-repository";

export class CreateUserUseCase implements CreateUser {
  constructor(
    private readonly hasher: Hash,
    private readonly jwtAdapter: Encrypt<CreateUserModel>,
    private readonly fsUserRepository: CreateUserRepository
  ) { }

  /**
  * Function for create new user hashing password and creating token and refresh token
  * @returns UserModel
  */
  async create(params: CreateUserModel): Promise<UserModel> {
    const hashedPassword = this.hasher.hash(params.password)
    const token = this.jwtAdapter.encrypt({ ...params, password: hashedPassword })
    const refreshToken = this.jwtAdapter.encrypt({ ...params, password: hashedPassword })
    await this.fsUserRepository.create({ ...params, password: hashedPassword, token, refreshToken })
    return '' as any
  }
}