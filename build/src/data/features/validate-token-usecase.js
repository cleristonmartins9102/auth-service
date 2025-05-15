"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateTokenUsecase = void 0;
const errors_1 = require("@/application/errors/errors");
class ValidateTokenUsecase {
    constructor(jwtAdapter, refreshTokenUsecase) {
        this.jwtAdapter = jwtAdapter;
        this.refreshTokenUsecase = refreshTokenUsecase;
    }
    async validate(token, refreshToken) {
        try {
            const userModel = this.jwtAdapter.decrypt(token);
            return { token, refreshToken, payload: userModel };
        }
        catch (error) {
            if (error instanceof errors_1.ExpiredTokenError) {
                const userModel = this.jwtAdapter.decrypt(refreshToken);
                const newTokens = await this.refreshTokenUsecase.refresh(refreshToken);
                return { ...newTokens, payload: userModel };
            }
            else {
                throw error;
            }
        }
    }
}
exports.ValidateTokenUsecase = ValidateTokenUsecase;
//# sourceMappingURL=validate-token-usecase.js.map