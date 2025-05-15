"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const controller_1 = require("../contracts/controller");
const http_1 = require("../helpers/http");
class AuthenticationController extends controller_1.Controller {
    constructor(authenticationUsecase) {
        super();
        this.authenticationUsecase = authenticationUsecase;
    }
    async perform(httpRequest) {
        try {
            return (0, http_1.ok)(await this.authenticationUsecase.auth(httpRequest.body));
        }
        catch (error) {
            return (0, http_1.unauthorized)('');
        }
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication-controller.js.map