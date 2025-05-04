import { CredentialsModel } from "@/data/model";

export interface GetCredentialsByEmail {
  getByEmail (email: string): Promise<CredentialsModel | null>
}