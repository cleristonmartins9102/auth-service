"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@/application/errors/errors");
const validate_token_usecase_1 = require("@/data/features/validate-token-usecase");
const Mock_1 = __importDefault(require("jest-mock-extended/lib/Mock"));
const stubs_1 = require("../../tests/stubs");
describe('ValidateTokenUsecase', () => {
    const token = 'userToken';
    const refreshToken = 'refreshToken';
    const jwtAdapter = (0, Mock_1.default)();
    const refreshTokenUsecase = (0, Mock_1.default)();
    const createUser = (0, stubs_1.makeCreateUserStub)();
    const mockedUser = (0, stubs_1.makeUserModelStub)(createUser, 't', 'r');
    let sut;
    beforeAll(() => {
        jwtAdapter.decrypt.mockReturnValue({ ...mockedUser, iat: 333, exp: 111 });
        refreshTokenUsecase.refresh.mockResolvedValue({ token: 'newToken', refreshToken: 'newRefreshToken' });
        sut = new validate_token_usecase_1.ValidateTokenUsecase(jwtAdapter, refreshTokenUsecase);
    });
    it('should call JwtAdapter.decrypt with correct token', async () => {
        await sut.validate(token, refreshToken);
        expect(jwtAdapter.decrypt).toHaveBeenCalled();
        expect(jwtAdapter.decrypt).toHaveBeenCalledWith(token);
    });
    it('should call rethrow if JwtAdapter throw', async () => {
        jwtAdapter.decrypt.mockImplementationOnce(() => {
            throw new Error();
        });
        let error;
        try {
            await sut.validate(token, refreshToken);
        }
        catch (err) {
            error = err;
        }
        expect(error).toBeInstanceOf(Error);
    });
    it('should call refreshTokenUsecase if token has expired', async () => {
        jwtAdapter.decrypt.mockImplementationOnce(() => {
            throw new errors_1.ExpiredTokenError(new Error());
        });
        try {
            await sut.validate(token, refreshToken);
        }
        catch (err) {
        }
        expect(refreshTokenUsecase.refresh).toHaveBeenCalled();
    });
    it('should return correct value if is a valid token', async () => {
        const response = await sut.validate(token, refreshToken);
        expect(response).toEqual({ token, refreshToken, payload: { ...mockedUser, iat: 333, exp: 111 } });
    });
    it('should return correct value if is a invalid token and refreshed', async () => {
        jwtAdapter.decrypt.mockImplementationOnce(() => {
            throw new errors_1.ExpiredTokenError(new Error());
        });
        const response = await sut.validate(token, refreshToken);
        expect(response).toEqual({ token: 'newToken', refreshToken: 'newRefreshToken', payload: { ...mockedUser, iat: 333, exp: 111 } });
    });
});
//# sourceMappingURL=validate-token-usecase.spec.js.map