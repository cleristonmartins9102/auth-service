"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenUsecaseFactory = void 0;
const validate_token_usecase_1 = require("@/data/features/validate-token-usecase");
const adapters_1 = require("@/infra/adapters");
const refresh_token_usecase_factory_1 = require("./refresh-token-usecase-factory");
const validateTokenUsecaseFactory = () => {
    const jwtAdapter = new adapters_1.JwtAdapter();
    const refreshTokenUsecase = (0, refresh_token_usecase_factory_1.refreshTokenUsecaseFactory)();
    return new validate_token_usecase_1.ValidateTokenUsecase(jwtAdapter, refreshTokenUsecase);
};
exports.validateTokenUsecaseFactory = validateTokenUsecaseFactory;
//# sourceMappingURL=validate-token-usecase-factory.js.map