"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRouter = void 0;
const express_1 = require("express");
const routers_1 = require("../routers");
const authentication_router_1 = require("../routers/authentication-router");
const setupRouter = (app) => {
    const router = (0, express_1.Router)();
    app.use('/api', router);
    (0, routers_1.generateTokenRouter)(router);
    (0, authentication_router_1.authenticationRouter)(router);
    (0, routers_1.validateTokenRouter)(router);
};
exports.setupRouter = setupRouter;
//# sourceMappingURL=setup-routers.js.map