"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_credential_repository_1 = require("@/infra/repository/fs-credential-repository");
const firestore_1 = require("@google-cloud/firestore");
const stubs_1 = require("../../../../tests/stubs");
jest.mock('@google-cloud/firestore');
describe('FsCredentialRepository', () => {
    const mockAdd = jest.fn();
    const credentials = (0, stubs_1.makeCredentialsStub)();
    beforeEach(() => {
        jest.clearAllMocks();
        firestore_1.Firestore.mockImplementation(() => ({
            collection: jest.fn().mockReturnValue({
                add: mockAdd
            })
        }));
    });
    it('should call Firestore.collection().add() with the correct data', async () => {
        const repo = new fs_credential_repository_1.FsCredentialRepository();
        await repo.create(credentials);
        expect(firestore_1.Firestore).toHaveBeenCalledTimes(1);
        expect(mockAdd).toHaveBeenCalledTimes(1);
        expect(mockAdd.mock.calls[0][0]).toMatchObject({
            email: credentials.email,
            password: credentials.password
        });
        expect(mockAdd.mock.calls[0][0].created_at).toBeInstanceOf(Date);
    });
    it('should log error if Firestore throws', async () => {
        const repo = new fs_credential_repository_1.FsCredentialRepository();
        const error = new Error('Firestore failed');
        mockAdd.mockRejectedValueOnce(error);
        const response = repo.create(credentials);
        expect(response).rejects.toThrow();
    });
});
//# sourceMappingURL=fs-credentials-repository.spec.js.map