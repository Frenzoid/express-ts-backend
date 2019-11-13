"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const favicon = require("express-favicon");
const express_fileupload = require("express-fileupload");
const logger = require("morgan");
const path = require("path");
// Import configs.
const dbcon_1 = require("./config/dbcon");
const fileuploadOptions_1 = require("./config/fileuploadOptions");
// Imports the routers.
const userRouter_1 = require("./routes/userRouter");
class App {
    constructor() {
        this.app = express();
        this.middleware();
    }
    middleware() {
        return __awaiter(this, void 0, void 0, function* () {
            // Connect with the server
            dbcon_1.DbConnector.connection.connect().then((result) => {
                dbcon_1.DbConnector.connection.synchronize(true).catch((err) => {
                    console.error(`but interaction with the db failed. Error: ${err}`);
                }); // Force tables to recreate (clear out) on load.
                if (result.isConnected)
                    console.log('DB: Connection with database established!.');
            }).catch((err) => {
                console.error(`Error syncing database: ${err}`);
            });
            // Initializating the libraries and the express config.
            this.app.use(cors()); // Allows Control Acess Protol to work outside of a localhost.
            this.app.use(compression()); // Compresses the requests.
            this.app.use(logger('dev')); // Logs the activity to the console.
            this.app.use(bodyParser.json({ limit: '100mb' })); // Parses automaticallythe requests, and adds a limit.
            this.app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' })); // Manages the encoded urls, and adds a limit.
            this.app.use(express_fileupload(fileuploadOptions_1.fileuploadOptions)); // Manages the file uploads and adds a limit.
            this.app.use('/api/v1/static', express.static(path.join(__dirname, '/public'))); // Exposes a static folder to the exterior.
            this.app.use(favicon(`${__dirname}/public/coffe.png`));
            // Routers
            this.app.use('/api/v1/users', userRouter_1.default);
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map