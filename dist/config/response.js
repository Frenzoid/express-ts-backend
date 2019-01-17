"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    static clearData() {
        Response.data = {};
        Response.errors = [];
    }
    static export() {
        return { data: Response.data, errors: Response.errors };
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map