export class CreateCredentialModel {
  token!: string
  refreshToken!: string
  email!: string
  password!: string
  phoneVerified!: boolean
}

export class CredentialsModel extends CreateCredentialModel{
  id!: string
  created_at!: Date
}