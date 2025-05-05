import { UserModel } from "../model";

export interface ValidateToken {
  validate (token: string): Promise<UserModel>
}