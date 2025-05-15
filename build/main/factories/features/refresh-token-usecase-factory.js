"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenUsecaseFactory = void 0;
const features_1 = require("@/data/features");
const adapters_1 = require("@/infra/adapters");
const fs_credential_repository_1 = require("@/infra/repository/fs-credential-repository");
const refreshTokenUsecaseFactory = () => {
    const fsCredentialRepository = new fs_credential_repository_1.FsCredentialRepository();
    const jwtAdapter = new adapters_1.JwtAdapter();
    return new features_1.RefreshTokenUsecase(fsCredentialRepository, jwtAdapter);
};
exports.refreshTokenUsecaseFactory = refreshTokenUsecaseFactory;
//# sourceMappingURL=refresh-token-usecase-factory.js.map