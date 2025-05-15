"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptAdapter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptAdapter {
    async hash(value) {
        return await bcrypt_1.default.hash(value, 10);
    }
    async compare(password, hash) {
        return await bcrypt_1.default.compare(password, hash);
    }
}
exports.BcryptAdapter = BcryptAdapter;
//# sourceMappingURL=bcrypt-adapter.js.map