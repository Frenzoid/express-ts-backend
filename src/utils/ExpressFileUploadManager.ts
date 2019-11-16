import { UploadedFile } from 'express-fileupload';
import * as mkdir from 'mkdirp';
import { USERAVATARSTATIC } from '../config/const';

export class ExpressFileUploadManager {

  public static getExtension(expressFile: UploadedFile){
    return `.${expressFile.name.split('.')[1]}`;
  }

  public static getSize(expressFile: UploadedFile){
    const bytes = expressFile.data.byteLength;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const div = Math.log(bytes) / Math.log(1024);
    const i = parseInt(`${Math.floor(div)}`, 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
  }

  public static checkMimetype(expressFile: UploadedFile, type: string){
    return expressFile.mimetype.startsWith(type) ? true : false;
  }

  public static manageFile(expressFile: UploadedFile, movePath: string, newName: string = expressFile.name): Promise<string> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      const completePath: string = movePath + newName;

      mkdir(movePath, (errMkdir) => {
        if (errMkdir) {
          reject(`Error creating folder for the user's avatar: ${errMkdir}`);
        }

        expressFile.mv(completePath, (errMoving: string) => {
          if (errMoving) {
            reject(`Error moving file: ${errMoving}`);
          }

          resolve(newName);
        });
      });
    });
  }
}
