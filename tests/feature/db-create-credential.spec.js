"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const features_1 = require("@/data/features");
const Mock_1 = __importDefault(require("jest-mock-extended/lib/Mock"));
const stubs_1 = require("../stubs");
describe('CreateCredential', () => {
    const jtwAdapter = (0, Mock_1.default)();
    const bcryptAdapter = (0, Mock_1.default)();
    const fsCredentialRepository = (0, Mock_1.default)();
    const createUser = (0, stubs_1.makeCreateUserStub)();
    const mockedUser = (0, stubs_1.makeUserModelStub)(createUser, 't', 'r');
    beforeAll(() => {
        jtwAdapter.encrypt.mockReturnValue('generatedToken');
        bcryptAdapter.hash.mockResolvedValue('hashedValue');
    });
    it('should call JwtAdapter.encrypt with correct value', async () => {
        const sut = new features_1.DbCreateCredential(jtwAdapter, bcryptAdapter, fsCredentialRepository);
        await sut.create(mockedUser);
        expect(jtwAdapter.encrypt).toHaveBeenCalled();
        expect(jtwAdapter.encrypt.mock.calls[0]).toEqual([mockedUser, '15m']);
    });
    it('should call fsCredentialsRepository.create with correct value', async () => {
        const sut = new features_1.DbCreateCredential(jtwAdapter, bcryptAdapter, fsCredentialRepository);
        await sut.create(mockedUser);
        expect(fsCredentialRepository.create).toHaveBeenCalled();
        expect(fsCredentialRepository.create).toHaveBeenCalledWith({
            token: 'generatedToken',
            refreshToken: 'generatedToken',
            email: mockedUser.email,
            password: 'hashedValue',
            phoneVerified: false
        });
    });
    it('should returns correct value', async () => {
        const sut = new features_1.DbCreateCredential(jtwAdapter, bcryptAdapter, fsCredentialRepository);
        const response = await sut.create(mockedUser);
        expect(response).toEqual({
            token: 'generatedToken',
            refreshToken: 'generatedToken',
            payload: mockedUser
        });
    });
});
//# sourceMappingURL=db-create-credential.spec.js.map