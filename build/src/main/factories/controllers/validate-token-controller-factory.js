"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenControllerFactory = void 0;
const validate_token_controller_1 = require("@/application/controllers/validate-token-controller");
const validate_token_usecase_factory_1 = require("../features/validate-token-usecase-factory");
const validateTokenControllerFactory = () => {
    return new validate_token_controller_1.ValidateTokenController((0, validate_token_usecase_factory_1.validateTokenUsecaseFactory)());
};
exports.validateTokenControllerFactory = validateTokenControllerFactory;
//# sourceMappingURL=validate-token-controller-factory.js.map