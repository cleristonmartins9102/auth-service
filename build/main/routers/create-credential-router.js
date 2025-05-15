"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenRouter = void 0;
const express_adapter_1 = require("@/infra/adapters/express-adapter");
const factories_1 = require("../factories");
const generateTokenRouter = (router) => {
    router.post('/token', (0, express_adapter_1.expressAdapter)((0, factories_1.generateTokenControllerFactory)()));
};
exports.generateTokenRouter = generateTokenRouter;
//# sourceMappingURL=create-credential-router.js.map