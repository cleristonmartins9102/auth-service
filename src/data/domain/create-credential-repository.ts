import { CreateCredentialModel, CredentialsModel } from "../model";

export interface CreateCredentialRepository {
  create (credentials: CreateCredentialModel): Promise<CredentialsModel>
}