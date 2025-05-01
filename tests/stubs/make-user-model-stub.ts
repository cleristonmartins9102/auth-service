import { CreateUserModel, UserModel } from "@/data/model";

export const makeUserModelStub = (createUserStub: CreateUserModel, token: string, refreshToken: string): UserModel => ({
  id: 1,
  ...createUserStub,
  token,
  refreshToken,
  created_at: new Date()
})