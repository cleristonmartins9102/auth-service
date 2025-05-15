"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateTokenController = void 0;
const controller_1 = require("../contracts/controller");
const http_1 = require("../helpers/http");
class ValidateTokenController extends controller_1.Controller {
    constructor(validateTokenUsecase) {
        super();
        this.validateTokenUsecase = validateTokenUsecase;
    }
    async perform(httpRequest) {
        const { token, refreshToken } = httpRequest.body;
        try {
            return (0, http_1.ok)(await this.validateTokenUsecase.validate(token, refreshToken));
        }
        catch (error) {
            console.log(error);
            return (0, http_1.unauthorized)({ message: 'unauthorized' });
        }
    }
}
exports.ValidateTokenController = ValidateTokenController;
//# sourceMappingURL=validate-token-controller.js.map