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
const Tag_1 = require("../models/Tag");
const dbcon_1 = require("../config/dbcon");
class TagController {
    // Get all tags
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dbcon_1.DbConnector.connection.manager.find(Tag_1.Tag).catch((err) => { throw err; });
        });
    }
}
exports.tagController = new TagController();
//# sourceMappingURL=tagController.js.map