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
const bcrypt = require("bcrypt-nodejs");
const response_1 = require("../config/response");
const user_1 = require("../models/user");
/* import { mailer } from '../utils/Mailer';*/
const tokenManager_1 = require("../utils/tokenManager");
class AuthController {
    // UNCOMMENT THIS TO CHECK IF THE TOKEN MANAGER WORKS FINE!
    /*
      public async genTestChekToken(req: Request, res: Response): Promise<Rp> {
        const token = req.params.test;
         await TokenManagement.verifyToken(token).then(async (tkn) => {
          Rp.data = { payload: tkn.data };
        }).catch((err) => {
          const error = `Error verifying token: ${err}`;
          console.error(error);
          Rp.errors.push(error);
        });
    
        return Rp.export();
      }
    
      public async genTestToken(req: Request, res: Response): Promise<Rp> {
        const payload = req.params.test;
        const token = await TokenManagement.generateToken(payload);
        res.setHeader('Authorization', token);
        Rp.data = { JWToken: token };
        return Rp.export();
      } */
    // Logins a user.
    login(user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userdb = yield user_1.User.findOne({
                where: {
                    email: user.email,
                },
                attributes: {
                    include: ['password'],
                },
            }).catch((err) => {
                const error = `Login failed by server-side, Error detail:  ${err}`;
                console.error(error);
                response_1.Response.errors.push(error);
                return response_1.Response.export();
            });
            if (!userdb) {
                response_1.Response.errors.push('Incorrect credentials or user not found.');
            }
            else {
                if (bcrypt.compareSync(user.password, userdb.password)) {
                    userdb.password = '';
                    response_1.Response.data = userdb;
                    res.setHeader('Authorization', yield tokenManager_1.TokenManagement.generateToken(response_1.Response.data.id));
                }
                else {
                    const err = 'Incorrect credentials.';
                    console.error('Incorrect credentials.');
                    response_1.Response.errors.push(err);
                }
            }
            return response_1.Response.export();
        });
    }
    checkToken(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.get('authorization');
            let error;
            if (!token) {
                error = 'Token not found in headers. Token must be on header \'authorization\'';
                console.error(error);
                response_1.Response.errors.push(error);
                return response_1.Response.export();
            }
            yield tokenManager_1.TokenManagement.verifyToken(token).then((tkn) => __awaiter(this, void 0, void 0, function* () {
                const user = yield user_1.User.findById(tkn.data);
                if (!user) {
                    const err = 'User not found';
                    console.error(err);
                    response_1.Response.errors.push(err);
                }
                else {
                    response_1.Response.data = true;
                }
            })).catch((err) => {
                error = `Error verifying token: ${err}`;
                console.error(error);
                response_1.Response.errors.push(error);
            });
            return response_1.Response.export();
        });
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map