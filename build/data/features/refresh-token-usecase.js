"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUsecase = void 0;
const errors_1 = require("@/application/errors/errors");
class RefreshTokenUsecase {
    constructor(fsCredentialRepository, jwtAdapter) {
        this.fsCredentialRepository = fsCredentialRepository;
        this.jwtAdapter = jwtAdapter;
    }
    async refresh(refreshToken) {
        const credential = await this.fsCredentialRepository.getByRefreshToken(refreshToken);
        if (credential === null)
            throw new errors_1.CredentialsNotFoundError('refreshToken', refreshToken);
        const tokenPayload = this.jwtAdapter.decrypt(credential.refreshToken);
        const { iat, exp, ...cleanedPayload } = tokenPayload;
        const updatedToken = this.jwtAdapter.encrypt(cleanedPayload, '15m');
        const updatedRefreshToken = this.jwtAdapter.encrypt(cleanedPayload, '730h');
        await this.fsCredentialRepository.update(credential.id, { token: updatedToken, refreshToken: updatedRefreshToken });
        return {
            token: updatedToken,
            refreshToken: updatedRefreshToken
        };
    }
}
exports.RefreshTokenUsecase = RefreshTokenUsecase;
//# sourceMappingURL=refresh-token-usecase.js.map