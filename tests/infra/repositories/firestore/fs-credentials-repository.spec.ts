import { FsCredentialRepository } from '@/infra/repository/fs-credential-repository'
import { Firestore } from '@google-cloud/firestore'
import { makeCredentialsStub } from '../../../../tests/stubs'

jest.mock('@google-cloud/firestore')

describe('FsCredentialRepository', () => {
  const mockAdd = jest.fn()
  const credentials = makeCredentialsStub()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(Firestore as jest.Mock).mockImplementation(() => ({
      collection: jest.fn().mockReturnValue({
        add: mockAdd
      })
    }))
  })

  it('should call Firestore.collection().add() with the correct data', async () => {
    const repo = new FsCredentialRepository()

    await repo.create(credentials)

    expect(Firestore).toHaveBeenCalledTimes(1)
    expect(mockAdd).toHaveBeenCalledTimes(1)
    expect(mockAdd.mock.calls[0][0]).toMatchObject({
      email: credentials.email,
      password: credentials.password
    })
    expect(mockAdd.mock.calls[0][0].created_at).toBeInstanceOf(Date)
  })

  it('should log error if Firestore throws', async () => {
    const repo = new FsCredentialRepository()
    const error = new Error('Firestore failed')
    mockAdd.mockRejectedValueOnce(error)

    const response = repo.create(credentials)

    expect(response).rejects.toThrow()   
  })
})