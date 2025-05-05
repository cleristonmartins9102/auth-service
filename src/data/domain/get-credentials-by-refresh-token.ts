import { CredentialsModel } from "@/data/model";

export interface GetCredentialsByRefreshToken {
  getByRefreshToken (email: string): Promise<CredentialsModel | null>
}