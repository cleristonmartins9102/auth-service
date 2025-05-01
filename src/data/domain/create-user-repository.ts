import { CreateUserRepositoryModel, UserModel } from "@/data/model";

export interface CreateUserRepository {
  create (params: CreateUserRepositoryModel): Promise<UserModel>
}