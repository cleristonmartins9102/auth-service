"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcrypt_adapter_1 = require("@/infra/adapters/bcrypt-adapter");
const _1 = require("@faker-js/faker/.");
jest.mock('bcrypt');
describe('BcryptAdapter', () => {
    const fakePassword = _1.faker.internet.password();
    const spy = jest.spyOn(bcrypt_1.default, 'hash');
    it('should call bcrypt.hash with correct values', async () => {
        const sut = new bcrypt_adapter_1.BcryptAdapter();
        await sut.hash(fakePassword);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(fakePassword, 10);
    });
    it.only('should returns the same value received from bcrypt.hash', async () => {
        spy.mockReturnValueOnce('hashedValue');
        const sut = new bcrypt_adapter_1.BcryptAdapter();
        const response = await sut.hash(fakePassword);
        expect(response).toBe('hashedValue');
    });
});
//# sourceMappingURL=bcrypt-adapter.spec.js.map