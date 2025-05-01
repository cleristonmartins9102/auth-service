import { CreateUser, Hash, Encrypt } from "@/data/domain";
import { CreateUserModel, UserModel } from "../model";

export class CreateUserUseCase implements CreateUser {
  constructor (
    private readonly hasher: Hash,
    private readonly jwtAdapter: Encrypt<CreateUserModel>
  ) {}
  async create(params: CreateUserModel): Promise<UserModel> {
    const hashedPassword = this.hasher.hash(params.password)
    this.jwtAdapter.encrypt({...params, password: hashedPassword })
    return '' as any
  }
}