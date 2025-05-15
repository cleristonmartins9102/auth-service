"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationUsecase = void 0;
const errors_1 = require("@/application/errors/errors");
class AuthenticationUsecase {
    constructor(fsCredentialsRepository, bcryptAdapter, jwtAdapter, refreshTokenUsecase) {
        this.fsCredentialsRepository = fsCredentialsRepository;
        this.bcryptAdapter = bcryptAdapter;
        this.jwtAdapter = jwtAdapter;
        this.refreshTokenUsecase = refreshTokenUsecase;
    }
    async auth(params) {
        const credentials = await this.fsCredentialsRepository.getByEmail(params.email);
        if (null === credentials)
            throw new errors_1.CredentialsNotFoundError('email', params.email);
        const response = await this.bcryptAdapter.compare(params.password, credentials.password);
        if (false === response)
            throw new errors_1.WrongPasswordError();
        const refreshedTokend = await this.refreshTokenUsecase.refresh(credentials.refreshToken);
        const tokenPayload = this.jwtAdapter.decrypt(credentials.token);
        const { password, iat, exp, ...withoutPassword } = tokenPayload;
        return { token: refreshedTokend.token, refreshToken: refreshedTokend.refreshToken, payload: withoutPassword };
    }
}
exports.AuthenticationUsecase = AuthenticationUsecase;
//# sourceMappingURL=authentication-usecase.js.map