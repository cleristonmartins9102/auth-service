export class CreateCredentialModel {
  token!: string
  refreshToken!: string
  email!: string
  password!: string
  phoneVerified!: boolean
}

export class CredentialsModel extends CreateCredentialModel{
  id!: number
  created_at!: Date
}