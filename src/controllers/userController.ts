import { User } from '../models/User';
import { Tag } from '../models/Tag';
import { UploadedFile as UpFileModel } from '../models/UploadedFile';
import { DbConnector } from '../config/dbcon';
import { USERAVATARPUBLIC, USERAVATARSTATIC } from '../config/const';
import { ExpressFileUploadManager as EFUM } from '../utils/ExpressFileUploadManager';
import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import * as md5 from 'md5';
import { B64UploadManager } from '../utils/Base64ImadeUploadManager';

class UserController {
  // Get all active Users
  public async getUsers(): Promise<User[]> {
    const searchOptions = { deleted: false };
    const dRelations = ['tags'];
    return await DbConnector.connection.manager.find(User, { where: searchOptions, relations: dRelations }).catch((err) => { throw err; });
  }

  // Get all Users
  public async getAllUsers(): Promise<User[]> {
    const dRelations = ['tags'];
    return await DbConnector.connection.manager.find(User, { relations: dRelations }).catch((err) => { throw err; });
  }

  // Get users with tags.
  public async getUsersWithTags(req: Request): Promise<User[]> {
    const dRelations = ['users', 'users.tags'];
    const reqBody = req.body;
    const tagslen = reqBody.tags.length;
    const taggedUsers: User[] = [];

    for (let i = 0; i < tagslen; i = i + 1) {
      const searchOptions = { name: reqBody.tags[i] };
      const tag = await DbConnector.connection.manager.findOne(Tag, { relations: dRelations, where: searchOptions }).catch((err) => { throw err; });
      if (tag) taggedUsers.push(...tag.users);
    }
    return taggedUsers.filter((set => (f: { id: number; }) => !set.has(f.id) && set.add(f.id))(new Set()));
  }

  // Get an User
  public async getUser(req: Request | number): Promise<User> {
    const searchOptions = (typeof req === 'number') ? { id: req } : { id: req.params.id };
    const dRelations = ['tags'];
    return await DbConnector.connection.manager.findOne(User, { where: searchOptions, relations: dRelations }).catch((err) => { throw err; });
  }

  // Create a new user.
  public async postUser(req: Request): Promise<User> {
    const user: User = new User(req.body.user);
    const usrBody = req.body.user;

    // Checks if there is any tag, and adds it.
    if (Array.isArray(usrBody.tags) && usrBody.tags.length > 0) {
      const tagslen = usrBody.tags.length;
      for (let i = 0; i < tagslen; i = i + 1) {
        const currentTag = usrBody.tags[i].toUpperCase();
        const tag = await DbConnector.connection.manager.findOne(Tag, { name: currentTag }).catch((err) => { throw err; });
        if (tag) user.tags.push(tag);
      }
    }

    // Checks if theres any EXPRESS FILE (FORM FILE) for the avatar image, and uploads it.
    const expressFile = (req.files && req.files.avatar as UploadedFile);
    if (expressFile && EFUM.checkMimetype(expressFile, 'image/')) {

      const randomStr = md5(Date.now());
      const ext = EFUM.getExtension(expressFile);
      const userMediaPath: string = `${USERAVATARPUBLIC}`;
      const newName = `${randomStr}.${ext}`;

      await EFUM.manageFile(expressFile, userMediaPath, newName)
      .then(async (newNameSaved: string) => {
        const size = EFUM.getSize(expressFile);
        const filePacket: any = { ext, size, path: `${USERAVATARSTATIC}${newNameSaved}` };

        const unsavedAvatar = new UpFileModel(filePacket);
        const savedAvatar = await DbConnector.connection.manager.save(unsavedAvatar).catch((err) => { throw err; });

        user.avatar = savedAvatar;
      }).catch((err) => { throw err; });
    } else { user.avatar = await DbConnector.connection.manager.findOne(UpFileModel, { where: { id: 1 } }).catch((err) => { throw err; }); }

     // Checks if theres any BASE 64 FILE for the avatar image, and uploads it.
    if (usrBody && usrBody.B64avatar) {
      const userMediaPath: string = `${USERAVATARPUBLIC}`;
      const ext: string = B64UploadManager.getExtension(usrBody.B64avatar);
      const size: string = B64UploadManager.getSize(usrBody.B64avatar);

      const imageFileName = await B64UploadManager.manageFile(usrBody.B64avatar, userMediaPath);
      const filePacket: any = { ext, size, path: `${USERAVATARSTATIC}${imageFileName}` };

      const unsavedAvatar = new UpFileModel(filePacket);
      const savedAvatar = await DbConnector.connection.manager.save(unsavedAvatar).catch((err) => { throw err; });

      user.avatar = savedAvatar;
    }

    return await DbConnector.connection.manager.save(user).catch((err) => { throw err; });
  }

  // Edit an user.
  public async putUser(req: Request): Promise<User> {
    const searchOptions = { id: req.params.id };
    const dRelations = ['tags'];
    const usrBody = req.body.user;
    const user: User = await DbConnector.connection.manager.findOne(User, { where: searchOptions, relations: dRelations })
    .catch((err) => { throw err; });

    if (!user) throw new Error(`user with id ${searchOptions.id} not found.`);
    user.update(req.body.user);

    // Updates tags.
    if (Array.isArray(usrBody.tags) && usrBody.tags.length > 0) {
      const tagslen = usrBody.tags.length;
      const newTags: Tag[] = [];
      for (let i = 0; i < tagslen; i = i + 1) {
        const currentTag = usrBody.tags[i].toUpperCase();
        const tag = await DbConnector.connection.manager.findOne(Tag, { name: currentTag }).catch((err) => { throw err; });
        if (tag) newTags.push(tag);
      }
      user.tags = newTags;
    }

    // Checks if theres any EXPRESS FILE (FORM FILE) for the avatar image, and uploads it.
    const expressFile = (req.files && req.files.avatar as UploadedFile);
    if (expressFile && EFUM.checkMimetype(expressFile, 'image/')) {

      const randomStr = md5(Date.now());
      const ext = EFUM.getExtension(expressFile);
      const userMediaPath: string = `${USERAVATARPUBLIC}`;
      const newName = `${randomStr}.${ext}`;

      await EFUM.manageFile(expressFile, userMediaPath, newName)
      .then(async (newNameSaved: string) => {
        const size = EFUM.getSize(expressFile);
        const filePacket: any = { ext, size, path: `${USERAVATARSTATIC}${newNameSaved}` };

        const unsavedAvatar = new UpFileModel(filePacket);
        const savedAvatar = await DbConnector.connection.manager.save(unsavedAvatar).catch((err) => { throw err; });

        user.avatar = savedAvatar;
      }).catch((err) => { throw err; });
    } else { user.avatar = await DbConnector.connection.manager.findOne(UpFileModel, { where: { id: 1 } }).catch((err) => { throw err; }); }

    // Checks if theres any BASE 64 FILE for the avatar image, and uploads it.
    if (usrBody && usrBody.B64avatar) {
      const userMediaPath: string = `${USERAVATARPUBLIC}`;
      const ext: string = B64UploadManager.getExtension(usrBody.B64avatar);
      const size: string = B64UploadManager.getSize(usrBody.B64avatar);

      const imageFileName = await B64UploadManager.manageFile(usrBody.B64avatar, userMediaPath);
      const filePacket: any = { ext, size, path: `${USERAVATARSTATIC}${imageFileName}` };

      const unsavedAvatar = new UpFileModel(filePacket);
      const savedAvatar = await DbConnector.connection.manager.save(unsavedAvatar).catch((err) => { throw err; });

      user.avatar = savedAvatar;
    }

    return await DbConnector.connection.manager.save(user).catch((err) => { throw err; });
  }

  // Suspend user.
  public async delUser(req: Request): Promise<User> {
    const searchOptions = { id: req.params.id };
    const user: User = await DbConnector.connection.manager.findOne(User, searchOptions).catch((err) => { throw err; });

    if (!user) throw new Error(`user with id ${searchOptions.id} not found.`);
    user.suspend();

    return await DbConnector.connection.manager.save(user).catch((err) => { throw err; });
  }
}

export const userController = new UserController();
