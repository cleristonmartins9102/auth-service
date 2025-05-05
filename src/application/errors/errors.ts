export class NoSecretFoundError extends Error {
  constructor () {
    super('Not found secret key')
    this.name = 'NoSecretFoundError'
  }
}

export class JwtAdapterError extends Error {
  constructor (error: Error) {
    super(error.message)
    this.name = 'JwtAdapterError'
  }
}
export class CredentialsNotFoundError extends Error {
  constructor (fieldName: string, value: string) {
    super(`Cresdentials not found with ${fieldName} ${value}`)
    this.name = 'CredentialsNotFoundError'
  }
}
export class WrongPasswordError extends Error {
  constructor () {
    super(`Wrong password!`)
    this.name = 'WrongPasswordError'
  }
}
export class FirestoreError extends Error {
  constructor (error: Error) {
    super(`Firestore error ${error.message}`)
    this.name = 'FirestoreError'
  }
}