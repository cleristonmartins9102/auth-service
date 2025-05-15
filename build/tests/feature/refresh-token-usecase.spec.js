"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const features_1 = require("@/data/features");
const Mock_1 = __importDefault(require("jest-mock-extended/lib/Mock"));
const stubs_1 = require("../../tests/stubs");
describe('RefreshTokenUsecase', () => {
    const fsCredentialRepository = (0, Mock_1.default)();
    const jwtAdapter = (0, Mock_1.default)();
    const credential = (0, stubs_1.makeCredentialsStub)();
    beforeAll(() => {
        fsCredentialRepository.getByRefreshToken.mockResolvedValue(credential);
        jwtAdapter.decrypt.mockReturnValue(credential);
        jwtAdapter.encrypt.mockReturnValue('encryptedValue');
    });
    beforeEach(() => {
        jwtAdapter.decrypt.mockClear();
        jwtAdapter.encrypt.mockClear();
        fsCredentialRepository.update.mockClear();
        fsCredentialRepository.getByRefreshToken.mockClear();
    });
    it('should call fsCredentialRepository.getByRefreshToken', async () => {
        const sut = new features_1.RefreshTokenUsecase(fsCredentialRepository, jwtAdapter);
        await sut.refresh('refreshTokenValue');
        expect(fsCredentialRepository.getByRefreshToken).toHaveBeenCalled();
        expect(fsCredentialRepository.getByRefreshToken).toHaveBeenCalledWith('refreshTokenValue');
    });
    it('should throw CredentialNotFoundError if fsCredentialRepository returns null', async () => {
        fsCredentialRepository.getByRefreshToken.mockResolvedValueOnce(null);
        const sut = new features_1.RefreshTokenUsecase(fsCredentialRepository, jwtAdapter);
        const response = sut.refresh('refreshTokenValue');
        await expect(response).rejects.toThrow();
    });
    it('should call JwtAdapter.decrypt with correct refreshToken', async () => {
        const sut = new features_1.RefreshTokenUsecase(fsCredentialRepository, jwtAdapter);
        await sut.refresh('refreshTokenValue');
        expect(jwtAdapter.decrypt).toHaveBeenCalled();
        expect(jwtAdapter.decrypt).toHaveBeenCalledWith(credential.refreshToken);
    });
    it('should call JwtAdapter.encrypt with correct token and expireAt 15m', async () => {
        const sut = new features_1.RefreshTokenUsecase(fsCredentialRepository, jwtAdapter);
        await sut.refresh('refreshTokenValue');
        expect(jwtAdapter.encrypt).toHaveBeenCalled();
        expect(jwtAdapter.encrypt.mock.calls[0]).toEqual([credential, '15m']);
    });
    it('should call JwtAdapter.encrypt with correct token and expireAt 730h', async () => {
        const sut = new features_1.RefreshTokenUsecase(fsCredentialRepository, jwtAdapter);
        await sut.refresh('refreshTokenValue');
        expect(jwtAdapter.encrypt).toHaveBeenCalled();
        expect(jwtAdapter.encrypt.mock.calls[1]).toEqual([credential, '730h']);
    });
    it('should call fsCredentialRepository.update with correct token and refreshToken', async () => {
        const sut = new features_1.RefreshTokenUsecase(fsCredentialRepository, jwtAdapter);
        await sut.refresh('refreshTokenValue');
        expect(fsCredentialRepository.update).toHaveBeenCalled();
        expect(fsCredentialRepository.update).toHaveBeenCalledWith(credential.id, { token: 'encryptedValue', refreshToken: 'encryptedValue' });
    });
    it('should returns correct value', async () => {
        const sut = new features_1.RefreshTokenUsecase(fsCredentialRepository, jwtAdapter);
        const response = await sut.refresh('refreshTokenValue');
        expect(response).toEqual({ token: 'encryptedValue', refreshToken: 'encryptedValue' });
    });
});
//# sourceMappingURL=refresh-token-usecase.spec.js.map