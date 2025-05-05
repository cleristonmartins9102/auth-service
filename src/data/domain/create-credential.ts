import { UserModel } from "../model";

export interface CreateCredential {
  create (credentials: UserModel): Promise<{ token: string, refreshToken: string, payload: UserModel }>
}