import { response as rp } from '../config/response';
import { User } from '../models/user';
import { Request } from 'express';
import { DbConnector } from '../config/dbcon';

class UserController {
  // Get all Users
  public async getUsers() {

    const users = await DbConnector.connection.manager.find(User).catch((err) => { throw err; });
    rp.data = users;
    return rp.export();

  }

  // Get an User
  public async getUser(req: Request) {
    const searchOptions = { IdUser: req.params.id };
    const user: User[] = await DbConnector.connection.manager.find(User, searchOptions).catch((err) => { throw err; });
    rp.data = user;
    return rp.export();
  }

  // Create a new user.
  public async postUser(req: Request) {
    const user: User = new User(req.body.user);
    rp.data = await DbConnector.connection.manager.save(user).catch((err) => { throw err; });

    return rp.export();
  }

  // Edit an user.
  public async putUser(req: Request) {
    const searchOptions = { IdUser: req.params.id };
    const user: User = await DbConnector.connection.manager.findOne(User, searchOptions).catch((err) => { throw err; });

    user.update(req.body.user);

    rp.data = await DbConnector.connection.manager.save(user).catch((err) => { throw err; });
    return rp.export();
  }

  // Suspend user.
  public async delUser(req: Request) {
    const searchOptions = { IdUser: req.params.id };
    const user: User = await DbConnector.connection.manager.findOne(User, searchOptions).catch((err) => { throw err; });

    user.suspend();

    rp.data = await DbConnector.connection.manager.save(user).catch((err) => { throw err; });
    return rp.export();
  }
}

export const userController = new UserController();
