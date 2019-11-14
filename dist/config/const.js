"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IMAGES = `${__dirname}/../public/media/`;
exports.USERAVATAR = `${IMAGES}users/`;
exports.JWTSECRET = process.env.JWTSECRET;
exports.whitelist = ['/api/v1/auth/', '/api/v1/static/'];
//# sourceMappingURL=const.js.map