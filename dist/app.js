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
// Import libraries.
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const favicon = require("express-favicon");
const express_fileupload = require("express-fileupload");
const logger = require("morgan");
const passport = require("passport");
const path = require("path");
// Import config, the response template, and the utils (in this case the jwt manager).
const response_1 = require("./config/response");
const database_config_1 = require("./config/database_config");
const tokenManager_1 = require("./utils/tokenManager");
// Imports the routers.
const authRouter_1 = require("./routes/authRouter");
const userRouter_1 = require("./routes/userRouter");
class App {
    constructor() {
        this.whiteList = ['/api/v1/auth/', '/api/v1/static/'];
        this.app = express();
        this.middleware();
    }
    middleware() {
        return __awaiter(this, void 0, void 0, function* () {
            // Connect with the server
            database_config_1.Config.sConnector.sync({ force: true }).then((result) => {
                console.log(result);
            })
                .catch((err) => {
                console.error(`Error syncing database: ${err}`);
            });
            // initializatin the libraries and the express config.
            this.app.use(cors()); // Allows Control Acess Protol to work outside of a localhost.
            this.app.use(compression()); // Compresses the requests.
            this.app.use(logger('dev')); // Logs the activity to the console. (It can be configured to write it to a file).
            this.app.use(bodyParser.json({ limit: '100mb' })); // Parses automaticallythe requests, and adds a limit.
            this.app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' })); // Manages the encoded urls, and adds a limit.
            this.app.use(express_fileupload({ debug: true, abortOnLimit: true, preserveExtension: true })); // Manages the file uploads and adds a limit.
            this.app.use('/api/v1/static', express.static(path.join(__dirname, '/public'))); // Exposes a static folder to the exterior.
            this.app.use(favicon(`${__dirname}/public/coffe.png`));
            passport.use(tokenManager_1.TokenManagement.getStrategy()); // Initializes and gets the JWT strategy.
            this.app.use((req, res, next) => {
                response_1.Response.clearData();
                next();
            });
            // DenyAll Policy: Denies access to protected paths, unless its on the "whiteList".
            this.app.use((req, res, next) => {
                passport.authenticate('jwt', (err, user, info) => {
                    if ((err || !user) && !this.whiteList.find(url => req.url.startsWith(url))) {
                        response_1.Response.errors.push('User unauthorized');
                        return res.status(401).end(JSON.stringify(response_1.Response.export()));
                    }
                    next();
                })(req, res, next);
            });
            // token interceptor. Sends a renewed token on each petition if user is logged in.
            this.app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                if (req.get('authorization')) {
                    const newToken = yield tokenManager_1.TokenManagement.renovarToken(req.get('authorization')).catch((err) => {
                        response_1.Response.errors.push(err);
                        res.status(401).json(response_1.Response.export());
                        next();
                    });
                    res.setHeader('Authorization', newToken);
                }
                res.setHeader('access-control-expose-headers', 'Authorization');
                next();
            }));
            // Routers
            this.app.use('/api/v1/auth', authRouter_1.default);
            this.app.use('/api/v1/users', userRouter_1.default);
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map