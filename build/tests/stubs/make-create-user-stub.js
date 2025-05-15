"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateUserStub = void 0;
const _1 = require("@faker-js/faker/.");
const makeCreateUserStub = () => ({
    name: _1.faker.person.firstName(),
    email: _1.faker.internet.email(),
    password: _1.faker.internet.password(),
    countryDialCode: '+44',
    phoneNumber: _1.faker.phone.number()
});
exports.makeCreateUserStub = makeCreateUserStub;
//# sourceMappingURL=make-create-user-stub.js.map