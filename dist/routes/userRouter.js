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
            res.json(yield userController_1.userController.getUsers().catch((err) => {
                console.log(err);
                response_1.Response.errors.push(err);
                return response_1.Response.export();
            }));
        });
    }
    postUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield userController_1.userController.newUser(req).catch((err) => {
                console.log(err);
                response_1.Response.errors.push(err);
                return response_1.Response.export();
            }));
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield userController_1.userController.getUser(req.params.id).catch((err) => {
                console.log(err);
                response_1.Response.errors.push(err);
                return response_1.Response.export();
            }));
        });
    }
    getCurrentUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield userController_1.userController.getCurrentUser().catch((err) => {
                console.log(err);
                response_1.Response.errors.push(err);
                return response_1.Response.export();
            }));
        });
    }
    putCurrentUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield userController_1.userController.updateCurrentUser(req.body.user).catch((err) => {
                console.log(err);
                response_1.Response.errors.push(err);
                return response_1.Response.export();
            }));
        });
    }
    putUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield userController_1.userController.putUser(req.params.id, req.body.user).catch((err) => {
                console.log(err);
                response_1.Response.errors.push(err);
                return response_1.Response.export();
            }));
        });
    }
    delUSer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield userController_1.userController.delUser(req.params.id).catch((err) => {
                console.log(err);
                response_1.Response.errors.push(err);
                return response_1.Response.export();
            }));
        });
    }
    init() {
        this.router.get('/', this.getAllUsers);
        this.router.get('/:id', this.getUser);
        this.router.get('/mine', this.getCurrentUser);
        this.router.post('/', this.postUser);
        this.router.patch('/', this.putCurrentUser);
        this.router.patch('/:id', this.putUser);
        this.router.delete('/:id', this.delUSer);
    }
}
exports.UsersRouter = UsersRouter;
const userRoutes = new UsersRouter();
userRoutes.init();
exports.default = userRoutes.router;
//# sourceMappingURL=userRouter.js.map