"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const express_adapter_1 = require("@/infra/adapters/express-adapter");
const authentication_controller_factory_1 = require("../factories/controllers/authentication-controller-factory");
const authenticationRouter = (router) => {
    router.post('/auth', (0, express_adapter_1.expressAdapter)((0, authentication_controller_factory_1.authenticationControllerFactory)()));
};
exports.authenticationRouter = authenticationRouter;
//# sourceMappingURL=authentication-router.js.map