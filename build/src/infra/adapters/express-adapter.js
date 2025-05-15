"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAdapter = void 0;
const expressAdapter = (controller) => {
    return async (req, res, next) => {
        const response = await controller.handler({ body: req.body, query: req.query, params: req.params });
        res.status(response.statusCode).json(response.body);
    };
};
exports.expressAdapter = expressAdapter;
//# sourceMappingURL=express-adapter.js.map