"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const requestId = require("express-request-id");
const logger = require("morgan");
const esn = require("express-status-monitor");
//Server config.
const server_config_1 = require("./config/server_config");
//Declaration of the express server.
const app = express();
//Configuring the logger with the server config.
app.use(logger(server_config_1.default.loggerFormat, {
    skip: (_req, res) => {
        return res.statusCode < 400;
    },
    stream: process.stderr
}));
app.use(logger(server_config_1.default.loggerFormat, {
    skip: (_req, res) => {
        return res.statusCode >= 400;
    },
    stream: process.stdout
}));
//Middlewares
app.use(bodyParser.json());
app.use(requestId);
app.use(cors());
app.use(esn());
//Set the port of the Express API Server.
app.set('port', process.env.PORT || 8081);
exports.default = app;
//# sourceMappingURL=main.js.map