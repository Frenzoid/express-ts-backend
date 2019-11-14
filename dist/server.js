"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config({ path: 'env' });
const app_1 = require("./app");
exports.expressServer = app_1.default.listen(process.env.APPPORT);
//# sourceMappingURL=server.js.map