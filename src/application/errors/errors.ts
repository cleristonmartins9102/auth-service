export class NoSecretFoundError extends Error {
  constructor () {
    super('Not found secret key')
    this.name = 'NoSecretFoundError'
  }
}