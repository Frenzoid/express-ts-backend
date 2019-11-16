"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md5 = require("md5");
const path = require("path");
const fs = require("fs");
class B64UploadManager {
    static getSize(encodedData) {
        const bytes = Buffer.from(encodedData, 'base64').byteLength;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0)
            return 'n/a';
        const div = Math.log(bytes) / Math.log(1024);
        const i = parseInt(`${Math.floor(div)}`, 10);
        if (i === 0)
            return `${bytes} ${sizes[i]})`;
        return `${(bytes / (Math.pow(1024, i))).toFixed(1)} ${sizes[i]}`;
    }
    static getExtension(encodedData) {
        let extension;
        if (!encodedData.startsWith('data')) {
            switch (encodedData.charAt(0)) {
                case '/':
                    extension = '.jpg';
                    break;
                case 'i':
                    extension = '.png';
                    break;
                case 'R':
                    extension = '.gif';
                    break;
                case 'U':
                    extension = '.webp';
                    break;
            }
        }
        else if (encodedData.startsWith('data')) {
            extension = encodedData.substring('data:image/'.length, encodedData.indexOf(';base64'));
        }
        else
            throw new Error('B64UM: No extension for image found.');
        return extension;
    }
    static manageFile(encodedData, localPath) {
        const base64Image = encodedData.split(';base64,').pop();
        const extension = B64UploadManager.getExtension(encodedData);
        const randomStr = md5(Date.now());
        return new Promise((resolve, reject) => {
            const fullLocalPath = path.join(localPath, `${randomStr}.${extension}`);
            fs.writeFile(fullLocalPath, base64Image, { encoding: 'base64' }, (err) => {
                if (err)
                    reject(err);
                resolve(`${randomStr}.${extension}`);
            });
        });
    }
}
exports.B64UploadManager = B64UploadManager;
//# sourceMappingURL=Base64ImadeUploadManager.js.map