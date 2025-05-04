import { CreateCredentialModel, CredentialsModel, UserModel } from "../model";

export interface CreateCredential {
  create (credentials: CreateCredentialModel): Promise<{ token: string, refreshToken: string, payload: UserModel }>
}