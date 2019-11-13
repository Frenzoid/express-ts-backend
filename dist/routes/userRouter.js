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
const userController_1 = require("../controllers/userController");
const response_1 = require("../config/response");
class UsersRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield userController_1.userController.getUsers());
            }
            catch (err) {
                console.log(err);
                response_1.response.errors.push(err);
                return response_1.response.export();
            }
        });
    }
    postUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield userController_1.userController.postUser(req));
            }
            catch (err) {
                console.log(err);
                response_1.response.errors.push(err);
                return response_1.response.export();
            }
        });
    }
    putUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield userController_1.userController.putUser(req));
            }
            catch (err) {
                console.log(err);
                response_1.response.errors.push(err);
                return response_1.response.export();
            }
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield userController_1.userController.getUser(req));
            }
            catch (err) {
                console.log(err);
                response_1.response.errors.push(err);
                return response_1.response.export();
            }
        });
    }
    delUSer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield userController_1.userController.delUser(req));
            }
            catch (err) {
                console.log(err);
                response_1.response.errors.push(err);
                return response_1.response.export();
            }
        });
    }
    init() {
        this.router.get('/', this.getAllUsers);
        this.router.post('/', this.postUser);
        this.router.get('/:id', this.getUser);
        this.router.put('/:id', this.putUser);
        this.router.delete('/:id', this.delUSer);
    }
}
exports.UsersRouter = UsersRouter;
const userRoutes = new UsersRouter();
userRoutes.init();
exports.default = userRoutes.router;
//# sourceMappingURL=userRouter.js.map