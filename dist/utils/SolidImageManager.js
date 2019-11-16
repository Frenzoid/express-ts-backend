"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mkdir = require("mkdirp");
class FileManager {
    static getExtension(expressFile) {
        return `.${expressFile.name.split('.')[1]}`;
    }
    static getSize(expressFile) {
        const bytes = expressFile.data.byteLength;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0)
            return 'n/a';
        const div = Math.log(bytes) / Math.log(1024);
        const i = parseInt(`${Math.floor(div)}`, 10);
        if (i === 0)
            return `${bytes} ${sizes[i]})`;
        return `${(bytes / (Math.pow(1024, i))).toFixed(1)} ${sizes[i]}`;
    }
    static checkMimetype(expressFile, type) {
        return expressFile.mimetype.startsWith(type) ? true : false;
    }
    static manageFile(expressFile, movePath, newName = expressFile.name) {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise((resolve, reject) => {
            const completePath = movePath + newName;
            mkdir(movePath, (errMkdir) => {
                if (errMkdir) {
                    reject(`Error creating folder for the user's avatar: ${errMkdir}`);
                }
                expressFile.mv(completePath, (errMoving) => {
                    if (errMoving) {
                        reject(`Error moving file: ${errMoving}`);
                    }
                    const serverPath = completePath.split('public')[1];
                    resolve(serverPath);
                });
            });
        });
    }
}
exports.FileManager = FileManager;
//# sourceMappingURL=SolidImageManager.js.map