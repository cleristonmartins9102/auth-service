"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = __importDefault(require("module-alias"));
module_alias_1.default.addAlias('@', __dirname + '/../../src');
const app_1 = require("./config/app");
process.env.SECRET_KEY = '123456';
const app = (0, app_1.createApp)();
const port = 5050;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
//# sourceMappingURL=server.js.map