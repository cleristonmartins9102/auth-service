"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCredentialsStub = void 0;
const _1 = require("@faker-js/faker/.");
const makeCredentialsStub = () => ({
    email: _1.faker.internet.email(),
    token: _1.faker.database.mongodbObjectId(),
    refreshToken: _1.faker.database.mongodbObjectId(),
    password: _1.faker.internet.password(),
    id: _1.faker.database.mongodbObjectId(),
    created_at: new Date(),
    phoneVerified: false
});
exports.makeCredentialsStub = makeCredentialsStub;
//# sourceMappingURL=make-credentials-stub.js.map