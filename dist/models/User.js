"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Tag_1 = require("./Tag");
const UploadedFile_1 = require("./UploadedFile");
let User = class User {
    constructor(userdata) {
        if (userdata) {
            this.nickname = userdata.nickname;
            this.name = userdata.name;
            this.tags = [];
        }
    }
    // Updates static data.
    update(userdata) {
        if (userdata.nickname)
            this.nickname = userdata.nickname;
        if (userdata.name)
            this.name = userdata.name;
    }
    suspend() {
        this.deleted = true;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('bool', { default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "deleted", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Number)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Tag_1.Tag, tag => tag.users),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "tags", void 0);
__decorate([
    typeorm_1.JoinTable(),
    __metadata("design:type", UploadedFile_1.UploadedFile)
], User.prototype, "avatar", void 0);
User = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [User])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map