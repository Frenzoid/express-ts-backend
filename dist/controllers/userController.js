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
const user_1 = require("../models/user");
const dbcon_1 = require("../config/dbcon");
class UserController {
    // Get all active Users
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = { deleted: false };
            return yield dbcon_1.DbConnector.connection.manager.find(user_1.User, searchOptions);
        });
    }
    // Get all Users
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dbcon_1.DbConnector.connection.manager.find(user_1.User).catch((err) => { throw err; });
        });
    }
    // Get an User
    getUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = (typeof req === 'number') ? { IdUser: req } : { IdUser: req.params.id };
            return yield dbcon_1.DbConnector.connection.manager.findOne(user_1.User, searchOptions).catch((err) => { throw err; });
        });
    }
    // Create a new user.
    postUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_1.User(req.body.user);
            return yield dbcon_1.DbConnector.connection.manager.save(user).catch((err) => { throw err; });
        });
    }
    // Edit an user.
    putUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = { IdUser: req.params.id };
            const user = yield dbcon_1.DbConnector.connection.manager.findOne(user_1.User, searchOptions).catch((err) => { throw err; });
            user.update(req.body.user);
            return yield dbcon_1.DbConnector.connection.manager.save(user).catch((err) => { throw err; });
        });
    }
    // Suspend user.
    delUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = { IdUser: req.params.id };
            const user = yield dbcon_1.DbConnector.connection.manager.findOne(user_1.User, searchOptions).catch((err) => { throw err; });
            user.suspend();
            return yield dbcon_1.DbConnector.connection.manager.save(user).catch((err) => { throw err; });
        });
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map