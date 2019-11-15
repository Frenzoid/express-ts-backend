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
const User_1 = require("../models/User");
const Tag_1 = require("../models/Tag");
const dbcon_1 = require("../config/dbcon");
class UserController {
    // Get all active Users
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = { deleted: false };
            const dRelations = ['tags'];
            return yield dbcon_1.DbConnector.connection.manager.find(User_1.User, { where: searchOptions, relations: dRelations }).catch((err) => { throw err; });
        });
    }
    // Get all Users
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const dRelations = ['tags'];
            return yield dbcon_1.DbConnector.connection.manager.find(User_1.User, { relations: dRelations }).catch((err) => { throw err; });
        });
    }
    // Get users with tags.
    getUsersWithTags(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const dRelations = ['users', 'users.tags'];
            const reqBody = req.body;
            const tagslen = reqBody.tags.length;
            const taggedUsers = [];
            for (let i = 0; i < tagslen; i = i + 1) {
                const searchOptions = { name: reqBody.tags[i] };
                const tag = yield dbcon_1.DbConnector.connection.manager.findOne(Tag_1.Tag, { relations: dRelations, where: searchOptions }).catch((err) => { throw err; });
                if (tag)
                    taggedUsers.push(...tag.users);
            }
            return taggedUsers.filter((set => (f) => !set.has(f.id) && set.add(f.id))(new Set()));
        });
    }
    // Get an User
    getUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = (typeof req === 'number') ? { id: req } : { id: req.params.id };
            const dRelations = ['tags'];
            return yield dbcon_1.DbConnector.connection.manager.findOne(User_1.User, { where: searchOptions, relations: dRelations }).catch((err) => { throw err; });
        });
    }
    // Create a new user.
    postUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User(req.body.user);
            if (Array.isArray(req.body.user.tags) && req.body.user.tags.length > 0) {
                const tagslen = req.body.user.tags.length;
                for (let i = 0; i < tagslen; i = i + 1) {
                    const tag = yield dbcon_1.DbConnector.connection.manager.findOne(Tag_1.Tag, { name: req.body.user.tags[i] }).catch((err) => { throw err; });
                    if (tag)
                        user.tags.push(tag);
                }
            }
            return yield dbcon_1.DbConnector.connection.manager.save(user).catch((err) => { throw err; });
        });
    }
    // Edit an user.
    putUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = { id: req.params.id };
            const dRelations = ['tags'];
            const usrBody = req.body.user;
            const user = yield dbcon_1.DbConnector.connection.manager.findOne(User_1.User, { where: searchOptions, relations: dRelations })
                .catch((err) => { throw err; });
            if (!user)
                throw new Error(`user with id ${searchOptions.id} not found.`);
            user.update(req.body.user);
            // Updates tags array.
            if (Array.isArray(usrBody.tags) && usrBody.tags.length > 0) {
                const tagslen = usrBody.tags.length;
                const newTags = [];
                for (let i = 0; i < tagslen; i = i + 1) {
                    const tag = yield dbcon_1.DbConnector.connection.manager.findOne(Tag_1.Tag, { name: usrBody.tags[i] }).catch((err) => { throw err; });
                    if (tag)
                        newTags.push(tag);
                }
                user.tags = newTags;
            }
            return yield dbcon_1.DbConnector.connection.manager.save(user).catch((err) => { throw err; });
        });
    }
    // Suspend user.
    delUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchOptions = { id: req.params.id };
            const user = yield dbcon_1.DbConnector.connection.manager.findOne(User_1.User, searchOptions).catch((err) => { throw err; });
            if (!user)
                throw new Error(`user with id ${searchOptions.id} not found.`);
            user.suspend();
            return yield dbcon_1.DbConnector.connection.manager.save(user).catch((err) => { throw err; });
        });
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map