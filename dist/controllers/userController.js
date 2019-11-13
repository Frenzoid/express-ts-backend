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
const response_1 = require("../config/response");
const user_1 = require("../models/user");
const dbcon_1 = require("../config/dbcon");
class UserController {
    // Get all Users
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield dbcon_1.DbConnector.connection.manager.find(user_1.User).catch(err => { throw err; });
            response_1.response.data = users;
            return response_1.response.export();
        });
    }
    // Get an User
    getUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = { IdUser: req.params.id };
            const user = yield dbcon_1.DbConnector.connection.manager.find(user_1.User, searchOptions).catch(err => { throw err; });
            response_1.response.data = user;
            return response_1.response.export();
        });
    }
    // Create a new user.
    postUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_1.User(req.body.user);
            response_1.response.data = yield dbcon_1.DbConnector.connection.manager.save(user).catch(err => { throw err; });
            return response_1.response.export();
        });
    }
    // Edit an user.
    putUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = { IdUser: req.params.id };
            let user = yield dbcon_1.DbConnector.connection.manager.findOne(user_1.User, searchOptions).catch(err => { throw err; });
            user.update(req.body.user);
            response_1.response.data = yield dbcon_1.DbConnector.connection.manager.save(user).catch(err => { throw err; });
            return response_1.response.export();
        });
    }
    // Suspend user.
    delUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = { IdUser: req.params.id };
            let user = yield dbcon_1.DbConnector.connection.manager.findOne(user_1.User, searchOptions).catch(err => { throw err; });
            user.suspend();
            response_1.response.data = yield dbcon_1.DbConnector.connection.manager.save(user).catch(err => { throw err; });
            return response_1.response.export();
        });
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map