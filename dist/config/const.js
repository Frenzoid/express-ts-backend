"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const SERVER = `${process.env.APPAPIURL}:${process.env.APPPORT}/`;
const API = 'api/v1/';
const MEDIASTATIC = `${SERVER}${API}static/media/`;
const MEDIAPUBLIC = path.join(__dirname, '..', 'public', 'media');
exports.USERAVATARSTATIC = `${MEDIASTATIC}users/`;
exports.USERAVATARPUBLIC = path.join(MEDIAPUBLIC, 'users');
exports.JWTSECRET = process.env.JWTSECRET;
exports.whitelist = ['/api/v1/auth/', '/api/v1/static/'];
/* STATIC: url paths to access to the media externally: example:
          http://localhost:8001/api/v1/static/media/users/f23b64940e9842e04382cdb6a2c6c712.jpeg

  PUBLIC: folder paths to access the media internally: example:
          express-typescript\dist\public\media\users
*/ 
//# sourceMappingURL=const.js.map