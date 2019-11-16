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
const tagController_1 = require("../controllers/tagController");
const response_1 = require("../config/response");
class TagsRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    // Theses methods handle the process between the data process and the response.
    // Get all tags
    getTags(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reply = new response_1.ResponseModel();
            reply.data = yield tagController_1.tagController.getTags().catch((err) => {
                reply.addError(err.message);
            });
            res.setHeader('Content-Type', 'application/json');
            return res.json(reply);
        });
    }
    init() {
        this.router.get('/', this.getTags);
    }
}
exports.TagsRouter = TagsRouter;
const tagsRouter = new TagsRouter();
exports.default = tagsRouter.router;
//# sourceMappingURL=tagRouter.js.map