import * as md5 from 'md5';
import * as path from 'path';
import * as fs from 'fs';

export class B64UploadManager {

  public static getSize(encodedData: string) {
    const bytes = Buffer.from(encodedData, 'base64').byteLength;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const div = Math.log(bytes) / Math.log(1024);
    const i = parseInt(`${Math.floor(div)}`, 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
  }

  public static getExtension(encodedData: string): string {
    let extension: string;

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
    } else if (encodedData.startsWith('data')) {
      extension = encodedData.substring('data:image/'.length, encodedData.indexOf(';base64'));
    } else throw new Error('B64UM: No extension for image found.');

    return extension;
  }

  public static manageFile(encodedData: string, localPath: string): Promise<string> {
    const base64Image = encodedData.split(';base64,').pop();
    const extension = B64UploadManager.getExtension(encodedData);
    const randomStr = md5(Date.now());

    return new Promise((resolve, reject) => {
      const fullLocalPath = path.join(localPath, `${randomStr}.${extension}`);
      fs.writeFile(fullLocalPath, base64Image, { encoding: 'base64' }, (err) => {
        if (err) reject(err);
        resolve(`${randomStr}.${extension}`);
      });
    });
  }
}
