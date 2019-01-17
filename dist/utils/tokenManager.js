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
const jwt = require("jsonwebtoken");
const passport_jwt_1 = require("passport-jwt");
const userController_1 = require("../controllers/userController");
const const_1 = require("../config/const");
class TokenManagement {
    static get token() {
        return this._token;
    }
    static set token(value) {
        this._token = value;
    }
    static get currentUser() {
        return this._currentUser;
    }
    static set currentUser(value) {
        this._currentUser = value;
    }
    static syncUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentUser = yield userController_1.userController
                .getUser(id)
                .catch(err => console.error(err));
            if (this.currentUser.error)
                console.error('Error Syncing user with API at TokenManager');
            this.currentUser = this.currentUser.data;
        });
    }
    static generateToken(userId) {
        this.token = jwt.sign({ data: userId }, const_1.JWTSECRET, { expiresIn: '2 hours' });
        this.syncUser(userId);
        return this.token;
    }
    static generateForgotPassword(userId, password) {
        this.token = jwt.sign({ data: userId }, password, {
            expiresIn: '30 minutes',
        });
        return this.token;
    }
    static verifyForgorPassword(tokenVer, password) {
        let token = tokenVer;
        return new Promise((resolve, reject) => {
            token = token.replace(/^Bearer\s/, '');
            try {
                const resultado = jwt.verify(token, password, (err, tokenDb) => {
                    if (err) {
                        reject(`Token deprecated. Detail ${err}`);
                    }
                    else {
                        // this.currentUser = token.data;
                        resolve(tokenDb);
                    }
                });
            }
            catch (e) {
                reject(`User not autenticated. Detail ${e}`);
            }
            reject('User not autenticated');
        });
    }
    static getStrategy() {
        return new passport_jwt_1.Strategy({
            secretOrKey: const_1.JWTSECRET,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        }, (payload, done) => {
            if (payload.data)
                return done(null, { data: payload.data });
            return done({ error: 'User not autenticated' }, null);
        });
    }
    static verifyToken(tokenVer) {
        let token = tokenVer;
        return new Promise((resolve, reject) => {
            token = token.replace(/^Bearer\s/, '');
            try {
                const resultado = jwt.verify(token, const_1.JWTSECRET, (err, tokenDb) => {
                    if (err) {
                        reject(`User not autenticated. Detail ${err}`);
                    }
                    else {
                        resolve(tokenDb);
                    }
                });
            }
            catch (e) {
                reject(`User not autenticated. Detail ${e}`);
            }
            reject('User not autenticated');
        });
    }
    static renovarToken(tokenRen) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = tokenRen;
            token = token.replace(/^Bearer\s/, '');
            const userId = (yield TokenManagement.verifyToken(token)).data;
            this.token = yield TokenManagement.generateToken(userId);
            return this.token;
        });
    }
    static decodeJWT(token) {
        const decoded = jwt.decode(token);
        console.log(decoded);
        return decoded;
    }
}
exports.TokenManagement = TokenManagement;
//# sourceMappingURL=tokenManager.js.map