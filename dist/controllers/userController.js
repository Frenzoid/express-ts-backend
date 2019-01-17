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
const const_1 = require("../config/const");
const tokenManager_1 = require("../utils/tokenManager");
const mkdir = require("mkdirp");
const bcrypt = require("bcrypt-nodejs");
class UserController {
    // Get all Users
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            response_1.Response.data = yield user_1.User.findAll({
                attributes: {
                    exclude: ['password'],
                },
            }).catch((err) => {
                const error = `Error find user: ${err}`;
                console.error(error);
                response_1.Response.errors.push(error);
            });
            return response_1.Response.export();
        });
    }
    // Get current logged user.
    getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (tokenManager_1.TokenManagement.currentUser.id) {
                response_1.Response.data = tokenManager_1.TokenManagement.currentUser;
            }
            else {
                const err = 'User not synced or not found.';
                console.error(err);
                response_1.Response.errors.push(err);
            }
            return response_1.Response.export();
        });
    }
    // Get a User
    getUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.User.findByPk(idUser, { attributes: {
                    exclude: ['password'],
                } })
                .then((user) => {
                if (user) {
                    response_1.Response.data = user;
                }
                else {
                    const err = 'User not found';
                    console.error(err);
                    response_1.Response.errors.push(err);
                }
            })
                .catch((err) => {
                const error = `Error finding user: ${err}`;
                console.error(error);
                response_1.Response.errors.push(error);
            });
            return response_1.Response.export();
        });
    }
    // Create a new user.
    newUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body.user;
            // Encripts password.
            user.password = bcrypt.hashSync(user.password);
            yield user_1.User.create(user).then((newUser) => {
                if (!newUser) {
                    const error = 'Error creating user, user empty';
                    console.error(error);
                    response_1.Response.errors.push(error);
                }
                else {
                    // Checks if there was a file for the avatar image, and uploads it.
                    let uploadFailed = false;
                    if (req.files.avatar && req.files.avatar.mimetype.startsWith('image/')) {
                        const userMediaPath = `${const_1.USERAVATAR}/${newUser.id}/`;
                        const userMediaPathComplete = userMediaPath + req.files.avatar.name;
                        mkdir(userMediaPath, (errMkdir) => {
                            if (errMkdir) {
                                console.error(`Error creating folder for the user's avatar: ${errMkdir}`);
                                uploadFailed = true;
                            }
                            else {
                                req.files.avatar.mv(userMediaPathComplete, (errMoving) => {
                                    if (errMoving) {
                                        console.error(`Error moving file: ${errMoving}`);
                                        uploadFailed = true;
                                    }
                                    else
                                        newUser.avatar = userMediaPathComplete;
                                });
                            }
                        });
                    }
                    delete newUser.password;
                    response_1.Response.data = newUser;
                }
            }).catch((err) => {
                const error = `Error find user: ${err}`;
                console.error(error);
                response_1.Response.errors.push(error);
            });
            return response_1.Response;
        });
    }
    // Update a user
    putUser(idUser, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userdb = yield user_1.User.findById(idUser);
            if (!userdb || !user) {
                const err = 'Not found user or not found user in body';
                console.error(err);
                response_1.Response.errors.push(err);
                return response_1.Response.export();
            }
            if (user.password) {
                user.password = bcrypt.hashSync(user.password);
            }
            yield userdb.updateAttributes(user).then(() => __awaiter(this, void 0, void 0, function* () {
                yield user_1.User.findOne({ where: { id: idUser } }).then((updatedUser) => {
                    delete updatedUser.password;
                    response_1.Response.data = updatedUser;
                }).catch((err) => {
                    const error = `Error update user: ${err}`;
                    console.error(error);
                    response_1.Response.errors.push(error);
                });
                return response_1.Response.export();
            }));
        });
    }
    // Update current logged user.
    updateCurrentUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = tokenManager_1.TokenManagement.currentUser.id;
            return yield this.putUser(id, user);
        });
    }
    // Suspend user.
    delUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const userdb = yield user_1.User.findById(idUser);
            if (!userdb) {
                const err = 'User to suspend not found.';
                console.error(err);
                response_1.Response.errors.push(err);
                return response_1.Response.export();
            }
            yield userdb.updateAttributes({ suspended: true }).then(() => __awaiter(this, void 0, void 0, function* () {
                yield user_1.User.findOne({ where: { id: idUser } }).then((updatedUser) => {
                    delete updatedUser.password;
                    response_1.Response.data = updatedUser;
                });
            })).catch((err) => {
                const error = `User to delete not found: ${err}`;
                console.error(error);
                response_1.Response.errors.push(err);
            });
            return response_1.Response.export();
        });
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map