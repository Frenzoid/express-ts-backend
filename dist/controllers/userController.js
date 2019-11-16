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
const UploadedFile_1 = require("../models/UploadedFile");
const dbcon_1 = require("../config/dbcon");
const const_1 = require("../config/const");
const ExpressFileUploadManager_1 = require("../utils/ExpressFileUploadManager");
const md5 = require("md5");
const Base64ImadeUploadManager_1 = require("../utils/Base64ImadeUploadManager");
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
            const usrBody = req.body.user;
            // Checks if there is any tag, and adds it.
            if (Array.isArray(usrBody.tags) && usrBody.tags.length > 0) {
                const tagslen = usrBody.tags.length;
                for (let i = 0; i < tagslen; i = i + 1) {
                    const currentTag = usrBody.tags[i].toUpperCase();
                    const tag = yield dbcon_1.DbConnector.connection.manager.findOne(Tag_1.Tag, { name: currentTag }).catch((err) => { throw err; });
                    if (tag)
                        user.tags.push(tag);
                }
            }
            // Checks if theres any EXPRESS FILE (FORM FILE) for the avatar image, and uploads it.
            const expressFile = (req.files && req.files.avatar);
            if (expressFile && ExpressFileUploadManager_1.ExpressFileUploadManager.checkMimetype(expressFile, 'image/')) {
                const randomStr = md5(Date.now());
                const ext = ExpressFileUploadManager_1.ExpressFileUploadManager.getExtension(expressFile);
                const userMediaPath = `${const_1.USERAVATARPUBLIC}`;
                const newName = `${randomStr}.${ext}`;
                yield ExpressFileUploadManager_1.ExpressFileUploadManager.manageFile(expressFile, userMediaPath, newName)
                    .then((newNameSaved) => __awaiter(this, void 0, void 0, function* () {
                    const size = ExpressFileUploadManager_1.ExpressFileUploadManager.getSize(expressFile);
                    const filePacket = { ext, size, externalPath: `${const_1.USERAVATARSTATIC}${newNameSaved}`, internalPath: `${const_1.USERAVATARPUBLIC}${newNameSaved}` };
                    const unsavedAvatar = new UploadedFile_1.UploadedFile(filePacket);
                    const savedAvatar = yield dbcon_1.DbConnector.connection.manager.save(unsavedAvatar).catch((err) => { throw err; });
                    user.avatar = savedAvatar;
                })).catch((err) => { throw err; });
            }
            else {
                user.avatar = yield dbcon_1.DbConnector.connection.manager.findOne(UploadedFile_1.UploadedFile, { where: { id: 1 } }).catch((err) => { throw err; });
            }
            // Checks if theres any BASE 64 FILE for the avatar image, and uploads it.
            if (usrBody && usrBody.B64avatar) {
                const userMediaPath = `${const_1.USERAVATARPUBLIC}`;
                const ext = Base64ImadeUploadManager_1.B64UploadManager.getExtension(usrBody.B64avatar);
                const size = Base64ImadeUploadManager_1.B64UploadManager.getSize(usrBody.B64avatar);
                const imageFileName = yield Base64ImadeUploadManager_1.B64UploadManager.manageFile(usrBody.B64avatar, userMediaPath);
                const filePacket = { ext, size, externalPath: `${const_1.USERAVATARSTATIC}${imageFileName}`, internalPath: `${const_1.USERAVATARPUBLIC}${imageFileName}` };
                const unsavedAvatar = new UploadedFile_1.UploadedFile(filePacket);
                const savedAvatar = yield dbcon_1.DbConnector.connection.manager.save(unsavedAvatar).catch((err) => { throw err; });
                user.avatar = savedAvatar;
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
            // Updates tags.
            if (Array.isArray(usrBody.tags) && usrBody.tags.length > 0) {
                const tagslen = usrBody.tags.length;
                const newTags = [];
                for (let i = 0; i < tagslen; i = i + 1) {
                    const currentTag = usrBody.tags[i].toUpperCase();
                    const tag = yield dbcon_1.DbConnector.connection.manager.findOne(Tag_1.Tag, { name: currentTag }).catch((err) => { throw err; });
                    if (tag)
                        newTags.push(tag);
                }
                user.tags = newTags;
            }
            // Checks if theres any EXPRESS FILE (FORM FILE) for the avatar image, and uploads it.
            const expressFile = (req.files && req.files.avatar);
            if (expressFile && ExpressFileUploadManager_1.ExpressFileUploadManager.checkMimetype(expressFile, 'image/')) {
                const randomStr = md5(Date.now());
                const ext = ExpressFileUploadManager_1.ExpressFileUploadManager.getExtension(expressFile);
                const userMediaPath = `${const_1.USERAVATARPUBLIC}`;
                const newName = `${randomStr}.${ext}`;
                yield ExpressFileUploadManager_1.ExpressFileUploadManager.manageFile(expressFile, userMediaPath, newName)
                    .then((newNameSaved) => __awaiter(this, void 0, void 0, function* () {
                    const size = ExpressFileUploadManager_1.ExpressFileUploadManager.getSize(expressFile);
                    const filePacket = { ext, size, path: `${const_1.USERAVATARSTATIC}${newNameSaved}` };
                    const unsavedAvatar = new UploadedFile_1.UploadedFile(filePacket);
                    const savedAvatar = yield dbcon_1.DbConnector.connection.manager.save(unsavedAvatar).catch((err) => { throw err; });
                    user.avatar = savedAvatar;
                })).catch((err) => { throw err; });
            }
            else {
                user.avatar = yield dbcon_1.DbConnector.connection.manager.findOne(UploadedFile_1.UploadedFile, { where: { id: 1 } }).catch((err) => { throw err; });
            }
            // Checks if theres any BASE 64 FILE for the avatar image, and uploads it.
            if (usrBody && usrBody.B64avatar) {
                const userMediaPath = `${const_1.USERAVATARPUBLIC}`;
                const ext = Base64ImadeUploadManager_1.B64UploadManager.getExtension(usrBody.B64avatar);
                const size = Base64ImadeUploadManager_1.B64UploadManager.getSize(usrBody.B64avatar);
                const imageFileName = yield Base64ImadeUploadManager_1.B64UploadManager.manageFile(usrBody.B64avatar, userMediaPath);
                const filePacket = { ext, size, path: `${const_1.USERAVATARSTATIC}${imageFileName}` };
                const unsavedAvatar = new UploadedFile_1.UploadedFile(filePacket);
                const savedAvatar = yield dbcon_1.DbConnector.connection.manager.save(unsavedAvatar).catch((err) => { throw err; });
                user.avatar = savedAvatar;
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