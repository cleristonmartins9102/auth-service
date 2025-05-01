import { CreateUser, Hash } from "@/data/domain";
import { CreateUserModel, UserModel } from "../model";

export class CreateUserUseCase implements CreateUser {
  constructor (private readonly hasher: Hash) {}
  async create(params: CreateUserModel): Promise<UserModel> {
    const hashedPassword = this.hasher.hash(params.password)
    return '' as any
  }
}