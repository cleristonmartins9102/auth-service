"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationUsecaseFactory = void 0;
const features_1 = require("@/data/features");
const adapters_1 = require("@/infra/adapters");
const fs_credential_repository_1 = require("@/infra/repository/fs-credential-repository");
const authenticationUsecaseFactory = () => {
    const fsCredentialRepository = new fs_credential_repository_1.FsCredentialRepository();
    const bcryptAdapter = new adapters_1.BcryptAdapter();
    const jwtAdapter = new adapters_1.JwtAdapter();
    const refreshTokenUsecase = new features_1.RefreshTokenUsecase(fsCredentialRepository, jwtAdapter);
    const authenticationUsecase = new features_1.AuthenticationUsecase(fsCredentialRepository, bcryptAdapter, jwtAdapter, refreshTokenUsecase);
    return authenticationUsecase;
};
exports.authenticationUsecaseFactory = authenticationUsecaseFactory;
//# sourceMappingURL=authentication-usecase-factory.js.map