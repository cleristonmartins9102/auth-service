import { CreateUserModel, UserModel } from "../model";

export interface CreateUser {
  create (params: CreateUserModel): Promise<UserModel>
}