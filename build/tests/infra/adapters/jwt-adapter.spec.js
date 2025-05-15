"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("@/infra/adapters");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const stubs_1 = require("../../../tests/stubs");
jest.mock('jsonwebtoken');
describe('JwtAdapter', () => {
    const createUserStub = (0, stubs_1.makeCreateUserStub)();
    const userModelStub = (0, stubs_1.makeUserModelStub)(createUserStub, 'r', 'r');
    const payload = userModelStub;
    const jsonwebtokenSpy = jest.spyOn(jsonwebtoken_1.default, 'sign');
    beforeAll(() => {
        jsonwebtokenSpy.mockReturnValue('mockedToken');
    });
    beforeEach(() => {
        process.env.SECRET_KEY = '123456';
    });
    it('should call jsonwebtoken.sign with correct values', () => {
        const sut = new adapters_1.JwtAdapter();
        sut.encrypt(payload, '1h');
        expect(jsonwebtokenSpy).toHaveBeenCalled();
        expect(jsonwebtokenSpy).toHaveBeenCalledWith(payload, '123456', { expiresIn: '1h' });
    });
    it('should return the same value received from jsonwebtoken.sign', () => {
        const sut = new adapters_1.JwtAdapter();
        const response = sut.encrypt(payload, '1h');
        expect(response).toBe('mockedToken');
    });
    it('should return NoSecretFoundError if SECRET_KEY not found', () => {
        delete process.env.SECRET_KEY;
        const sut = new adapters_1.JwtAdapter();
        let error = null;
        try {
            sut.encrypt(payload, '1h');
        }
        catch (err) {
            error = err;
        }
        expect(error.constructor.name).toBe('NoSecretFoundError');
    });
    it('should return JwtAdapterError if jsonwebtoken.sign throws', () => {
        jsonwebtokenSpy.mockImplementationOnce(() => {
            throw new Error();
        });
        const sut = new adapters_1.JwtAdapter();
        let error = null;
        try {
            sut.encrypt(payload, '1h');
        }
        catch (err) {
            error = err;
        }
        expect(error.constructor.name).toBe('JwtAdapterError');
    });
});
//# sourceMappingURL=jwt-adapter.spec.js.map