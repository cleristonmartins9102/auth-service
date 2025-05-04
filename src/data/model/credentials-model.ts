export class CreateCredentialModel {
  token!: string
  refreshToken!: string
  email!: string
  password!: string
}

export class CredentialsModel extends CreateCredentialModel{
  id!: number
  created_at!: Date
}