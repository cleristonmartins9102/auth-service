"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCredentialController = void 0;
const controller_1 = require("../contracts/controller");
const http_1 = require("../helpers/http");
const validator_1 = require("@cleriston.marina/validator");
class CreateCredentialController extends controller_1.Controller {
    constructor(dbCreateCredential) {
        super();
        this.dbCreateCredential = dbCreateCredential;
    }
    async perform(httpRequest) {
        try {
            const credential = this.dbCreateCredential.create(httpRequest.body);
            return (0, http_1.ok)(credential);
        }
        catch (error) {
            switch (error.constructor.name) {
                case 'NoSecretFoundError': {
                    return (0, http_1.serverError)('internal server error');
                }
                default:
                    return (0, http_1.serverError)(error.message);
            }
        }
    }
    buildValidator() {
        return validator_1.BuildValidator.object({
            name: validator_1.BuildValidator.string(),
            surname: validator_1.BuildValidator.string(),
            email: validator_1.BuildValidator.email(),
            password: validator_1.BuildValidator.string(),
            countryDialCode: validator_1.BuildValidator.string(),
            phoneNumber: validator_1.BuildValidator.string()
        });
    }
}
exports.CreateCredentialController = CreateCredentialController;
//# sourceMappingURL=create-credential-controller.js.map