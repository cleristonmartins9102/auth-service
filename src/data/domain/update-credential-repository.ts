import { CredentialsModel } from "../model"

export interface UpdateCredentialRepository {
  update (credentialId: string, credential: UpdateCredentialRepository.Params): Promise<boolean>
}

export namespace UpdateCredentialRepository {
  export type Params = Partial<CredentialsModel>
}