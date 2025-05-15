"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenControllerFactory = void 0;
const controllers_1 = require("@/application/controllers");
const db_create_credential_factory_1 = require("../features/db-create-credential-factory");
const generateTokenControllerFactory = () => {
    const dbCreateCredential = (0, db_create_credential_factory_1.dbCreateCredentialFactory)();
    return new controllers_1.CreateCredentialController(dbCreateCredential);
};
exports.generateTokenControllerFactory = generateTokenControllerFactory;
//# sourceMappingURL=create-credential-controller-factory.js.map