"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class ServerConfig {
    constructor() {
        this.loggerFormat = { COMBINED: "combined", COMMON: 'common', DEV: 'dev', TINY: 'tiny', DEFINED: ':date :method :url :status :res[content-length] - :response-time ms' };
        this.loggerPath = {
            stream: fs.createWriteStream(process.env.LOGGERPATH, { flags: "a" })
        };
        this.esnConfig = {
            title: process.env.APPNAME,
            theme: "default.css",
            path: "/status",
            spans: [
                {
                    interval: 1,
                    retention: 60 // Keep 60 datapoints in memory
                },
                {
                    interval: 5,
                    retention: 60
                },
                {
                    interval: 15,
                    retention: 60
                }
            ],
            chartVisibility: {
                cpu: true,
                mem: true,
                load: true,
                responseTime: true,
                rps: true,
                statusCodes: true
            },
            healthChecks: []
        };
    }
}
exports.default = new ServerConfig();
//# sourceMappingURL=server_config.js.map