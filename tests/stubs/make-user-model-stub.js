"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserModelStub = void 0;
const makeUserModelStub = (createUserStub, token, refreshToken) => ({
    id: 1,
    ...createUserStub,
    token,
    refreshToken,
    created_at: new Date()
});
exports.makeUserModelStub = makeUserModelStub;
//# sourceMappingURL=make-user-model-stub.js.map