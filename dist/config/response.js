"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseModel {
    constructor() {
        this.data = { object: 'default' };
        this.errors = { critical: false, messages: [] };
        this.timestamp = new Date();
    }
    // Adds a warning, (http status 199).
    addWarning(msg) {
        this.errors.messages.push(msg);
    }
    // Adds a critical error, (http status 500).
    addError(msg) {
        this.errors.critical = true;
        this.errors.messages.push(msg);
    }
}
exports.ResponseModel = ResponseModel;
//# sourceMappingURL=response.js.map