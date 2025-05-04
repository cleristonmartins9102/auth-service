import { CreateCredentialModel, CredentialsModel } from "../model";

export interface CreateCredential {
  create (credentials: CreateCredentialModel): Promise<CredentialsModel>
}