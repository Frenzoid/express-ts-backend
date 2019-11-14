import { User } from '../models/user';
import { Request } from 'express';
import { DbConnector } from '../config/dbcon';

class UserController {
  // Get all active Users
  public async getUsers(): Promise<User[]> {
    const searchOptions = { deleted: false };
    return await DbConnector.connection.manager.find(User, searchOptions);
  }

  // Get all Users
  public async getAllUsers(): Promise<User[]> {
    return await DbConnector.connection.manager.find(User).catch((err) => { throw err; });
  }

  // Get an User
  public async getUser(req: Request | number): Promise<User> {
    const searchOptions = (typeof req === 'number') ? { IdUser: req } : { IdUser: req.params.id };
    return await DbConnector.connection.manager.findOne(User, searchOptions).catch((err) => { throw err; });
  }

  // Create a new user.
  public async postUser(req: Request): Promise<User> {
    const user: User = new User(req.body.user);
    return await DbConnector.connection.manager.save(user).catch((err) => { throw err; });
  }

  // Edit an user.
  public async putUser(req: Request): Promise<User> {
    const searchOptions = { IdUser: req.params.id };
    const user: User = await DbConnector.connection.manager.findOne(User, searchOptions).catch((err) => { throw err; });

    user.update(req.body.user);

    return await DbConnector.connection.manager.save(user).catch((err) => { throw err; });
  }

  // Suspend user.
  public async delUser(req: Request): Promise<User> {
    const searchOptions = { IdUser: req.params.id };
    const user: User = await DbConnector.connection.manager.findOne(User, searchOptions).catch((err) => { throw err; });

    user.suspend();

    return await DbConnector.connection.manager.save(user).catch((err) => { throw err; });
  }
}

export const userController = new UserController();
