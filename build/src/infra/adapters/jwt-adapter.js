"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("@/application/errors/errors");
class JwtAdapter {
    encrypt(payload, expireAt) {
        const secretKey = process.env.SECRET_KEY;
        if (undefined === secretKey)
            throw new errors_1.NoSecretFoundError();
        try {
            return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: expireAt });
        }
        catch (error) {
            throw new errors_1.JwtAdapterError(error);
        }
    }
    decrypt(value) {
        const secretKey = process.env.SECRET_KEY;
        if (undefined === secretKey)
            throw new errors_1.NoSecretFoundError();
        try {
            return jsonwebtoken_1.default.verify(value, secretKey);
        }
        catch (error) {
            throw new errors_1.ExpiredTokenError(error);
        }
    }
}
exports.JwtAdapter = JwtAdapter;
//# sourceMappingURL=jwt-adapter.js.map