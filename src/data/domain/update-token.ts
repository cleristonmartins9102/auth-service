import { UserModel } from "../model";

export interface UpdateToken {
  update (payload: UserModel): Promise<UserModel>
}