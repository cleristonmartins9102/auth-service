"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenRouter = void 0;
const express_adapter_1 = require("@/infra/adapters/express-adapter");
const validate_token_controller_factory_1 = require("../factories/controllers/validate-token-controller-factory");
const validateTokenRouter = (router) => {
    router.post('/auth/validate', (0, express_adapter_1.expressAdapter)((0, validate_token_controller_factory_1.validateTokenControllerFactory)()));
};
exports.validateTokenRouter = validateTokenRouter;
//# sourceMappingURL=validate-token-router.js.map