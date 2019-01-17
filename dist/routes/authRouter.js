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
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const response_1 = require("../config/response");
class AuthRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /*   public async genTestChekToken(req: Request, res: Response, next: NextFunction) {
        res.json(await authController.genTestChekToken(req, res).catch((err) => {
          console.log(err);
          Rp.errors.push(err);
          return Rp.export();
        }));
      }
    
      public async genTestToken(req: Request, res: Response, next: NextFunction) {
        res.json(await authController.genTestToken(req, res).catch((err) => {
          console.log(err);
          Rp.errors.push(err);
          return Rp.export();
        }));
      } */
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield authController_1.authController.login(req.body.user, res).catch((err) => {
                console.log(err);
                response_1.Response.errors.push(err);
                return response_1.Response.export();
            }));
        });
    }
    checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield authController_1.authController.checkToken(req).catch((err) => {
                console.log(err);
                response_1.Response.errors.push(err);
                return response_1.Response.export();
            }));
        });
    }
    /*   public async forgotPassword(req: Request, res: Response, next: NextFunction) {
        res.json(await authController.forgotPassword(req).catch((err) => {
          console.log(err);
          Rp.errors.push(err);
          return Rp.export();
        }));
      } */
    /*   public async resForgotPassword(req: Request, res: Response, next: NextFunction) {
        res.json(await authController.resForgotPassword(req).catch((err) => {
          console.log(err);
          Rp.errors.push(err);
          return Rp.export();
        }));
      }
     */
    init() {
        /*     this.router.get('/genTestToken/:test', this.genTestToken);
            this.router.get('/genTestCheckToken/:test', this.genTestChekToken); */
        this.router.post('/login', this.login);
        /*     this.router.post('/forgotPassword', this.forgotPassword);
            this.router.post('/resForgotPassword', this.resForgotPassword); */
        this.router.get('/checkToken', this.checkToken);
    }
}
exports.AuthRouter = AuthRouter;
const authRouter = new AuthRouter();
exports.default = authRouter.router;
//# sourceMappingURL=authRouter.js.map