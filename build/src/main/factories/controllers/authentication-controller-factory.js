"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationControllerFactory = void 0;
const authentication_controller_1 = require("@/application/controllers/authentication-controller");
const authentication_usecase_factory_1 = require("../features/authentication-usecase-factory");
const authenticationControllerFactory = () => {
    const authenticationUsecase = (0, authentication_usecase_factory_1.authenticationUsecaseFactory)();
    return new authentication_controller_1.AuthenticationController(authenticationUsecase);
};
exports.authenticationControllerFactory = authenticationControllerFactory;
//# sourceMappingURL=authentication-controller-factory.js.map