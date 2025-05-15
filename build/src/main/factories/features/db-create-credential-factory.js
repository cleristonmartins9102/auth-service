"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbCreateCredentialFactory = void 0;
const features_1 = require("@/data/features");
const adapters_1 = require("@/infra/adapters");
const fs_credential_repository_1 = require("@/infra/repository/fs-credential-repository");
const dbCreateCredentialFactory = () => {
    const jwtAdapter = new adapters_1.JwtAdapter();
    const bcrypterAdapter = new adapters_1.BcryptAdapter();
    const fsCredentialRepository = new fs_credential_repository_1.FsCredentialRepository();
    return new features_1.DbCreateCredential(jwtAdapter, bcrypterAdapter, fsCredentialRepository);
};
exports.dbCreateCredentialFactory = dbCreateCredentialFactory;
//# sourceMappingURL=db-create-credential-factory.js.map