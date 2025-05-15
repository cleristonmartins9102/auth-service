"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const http_1 = require("../helpers/http");
const validator_1 = require("@cleriston.marina/validator");
class Controller {
    async handler(httpRequest) {
        const validator = this.buildValidator();
        const { success, error } = validator.validate(httpRequest.body);
        if (!success)
            return (0, http_1.badRequest)(error);
        return await this.perform(httpRequest);
    }
    buildValidator() {
        return validator_1.BuildValidator.object({});
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map