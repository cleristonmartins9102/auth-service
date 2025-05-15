"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorized = exports.badRequest = exports.serverError = exports.ok = void 0;
const ok = (body) => ({ statusCode: 200, body });
exports.ok = ok;
const serverError = (body) => ({ statusCode: 500, body });
exports.serverError = serverError;
const badRequest = (body) => ({ statusCode: 400, body });
exports.badRequest = badRequest;
const unauthorized = (body) => ({ statusCode: 401, body });
exports.unauthorized = unauthorized;
//# sourceMappingURL=http.js.map