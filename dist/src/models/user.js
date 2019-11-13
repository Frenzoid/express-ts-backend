var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, Column } from "typeorm";
export let User = class {
    constructor(userdata) {
        this.nickname = userdata.nickname;
        this.name = userdata.name;
        this.deleted = false;
    }
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
    PrimaryColumn(), 
    __metadata('design:type', String)
], User.prototype, "IdUser");
__decorate([
    Column(), 
    __metadata('design:type', String)
], User.prototype, "nickname");
__decorate([
    Column(), 
    __metadata('design:type', String)
], User.prototype, "name");
__decorate([
    Column(), 
    __metadata('design:type', Boolean)
], User.prototype, "deleted");
User = __decorate([
    Entity(), 
    __metadata('design:paramtypes', [Object])
], User);
//# sourceMappingURL=user.js.map