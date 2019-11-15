import { User } from '../models/User';
import { Tag } from '../models/Tag';
import { Request } from 'express';
import { DbConnector } from '../config/dbcon';

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
    return taggedUsers.filter((set => (f: { id: unknown; }) => !set.has(f.id) && set.add(f.id))(new Set()));
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
    if (Array.isArray(req.body.user.tags) && req.body.user.tags.length > 0) {
      const tagslen = req.body.user.tags.length;
      for (let i = 0; i < tagslen; i = i + 1) {
        const tag = await DbConnector.connection.manager.findOne(Tag, { name: req.body.user.tags[i] }).catch((err) => { throw err; });
        if (tag) user.tags.push(tag);
      }
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

    // Updates tags array.
    if (Array.isArray(usrBody.tags) && usrBody.tags.length > 0) {
      const tagslen = usrBody.tags.length;
      const newTags: Tag[] = [];
      for (let i = 0; i < tagslen; i = i + 1) {
        const tag = await DbConnector.connection.manager.findOne(Tag, { name: usrBody.tags[i] }).catch((err) => { throw err; });
        if (tag) newTags.push(tag);
      }
      user.tags = newTags;
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
