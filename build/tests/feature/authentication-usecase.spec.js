"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mock_1 = __importDefault(require("jest-mock-extended/lib/Mock"));
const _1 = require("@faker-js/faker/.");
const errors_1 = require("@/application/errors/errors");
const features_1 = require("@/data/features");
const stubs_1 = require("../../tests/stubs");
const credentialModel = (0, stubs_1.makeCredentialsStub)();
describe('AuthenticationUseCase', () => {
    const refreshTokenUseCase = (0, Mock_1.default)();
    const fsCredentialsRepository = (0, Mock_1.default)();
    const bcryptAdapter = (0, Mock_1.default)();
    const jwtAdapter = (0, Mock_1.default)();
    const createUser = (0, stubs_1.makeCreateUserStub)();
    const mockedUser = (0, stubs_1.makeUserModelStub)(createUser, 't', 'r');
    const credentialsStub = (0, stubs_1.makeCredentialsStub)();
    const credentials = {
        email: _1.faker.internet.email(),
        password: _1.faker.internet.password()
    };
    let sut;
    beforeAll(() => {
        fsCredentialsRepository.getByEmail.mockResolvedValue(credentialsStub);
        bcryptAdapter.compare.mockResolvedValue(true);
        fsCredentialsRepository.getByEmail.mockResolvedValue(credentialModel);
        jwtAdapter.decrypt.mockReturnValue({ ...mockedUser, iat: 3333, exp: 222 });
        refreshTokenUseCase.refresh.mockResolvedValue({ token: 'fakeToken', refreshToken: 'fakeRefreshToken' });
    });
    beforeEach(() => {
        fsCredentialsRepository.getByEmail.mockClear();
        bcryptAdapter.compare.mockClear();
        jwtAdapter.decrypt.mockClear();
        sut = new features_1.AuthenticationUsecase(fsCredentialsRepository, bcryptAdapter, jwtAdapter, refreshTokenUseCase);
    });
    it('should call FsCredentialsRepository with correct email', async () => {
        await sut.auth(credentials);
        expect(fsCredentialsRepository.getByEmail).toHaveBeenCalled();
        expect(fsCredentialsRepository.getByEmail).toHaveBeenCalledWith(credentials.email);
    });
    it('should returns error CredentialsNotFoundError if FsCredentialsRepository returns null', async () => {
        fsCredentialsRepository.getByEmail.mockResolvedValueOnce(null);
        const response = sut.auth(credentials);
        await expect(response).rejects.toThrow(errors_1.CredentialsNotFoundError);
    });
    it('should returns thow if CredentialsNotFoundError thows', async () => {
        fsCredentialsRepository.getByEmail.mockRejectedValueOnce(new Error());
        const response = sut.auth(credentials);
        await expect(response).rejects.toThrow();
    });
    it('should call Bcrypt.compare with correct values ', async () => {
        await sut.auth(credentials);
        expect(bcryptAdapter.compare).toHaveBeenCalled();
        expect(bcryptAdapter.compare).toHaveBeenCalledWith(credentials.password, credentialModel.password);
    });
    it('should throws WrongPasswordError if bcrypt.compare returns false', async () => {
        bcryptAdapter.compare.mockResolvedValueOnce(false);
        const response = sut.auth(credentials);
        await expect(response).rejects.toThrow(errors_1.WrongPasswordError);
    });
    it('should calls refreshTokenUsecase with correct value', async () => {
        await sut.auth(credentials);
        expect(refreshTokenUseCase.refresh).toHaveBeenCalled();
        expect(refreshTokenUseCase.refresh).toHaveBeenCalledWith(credentialModel.refreshToken);
    });
    it('should calls JwtAdapter.decrypt if password match', async () => {
        await sut.auth(credentials);
        expect(jwtAdapter.decrypt).toHaveBeenCalled();
        expect(jwtAdapter.decrypt).toHaveBeenCalledWith(credentialModel.token);
    });
    it('should returns the correct value', async () => {
        const { password, ...withoutPassword } = mockedUser;
        const response = await sut.auth(credentials);
        expect(response).toEqual({ token: 'fakeToken', refreshToken: 'fakeRefreshToken', payload: withoutPassword });
    });
});
//# sourceMappingURL=authentication-usecase.spec.js.map