import { NextFunction, Request, Response, Router } from 'express';
import { userController } from '../controllers/userController';
import { response as rp } from '../config/response';

export class UsersRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await userController.getUsers());
    } catch (err) {
      console.log(err);
      rp.errors.push(err);
      return rp.export();
    }
  }

  public async postUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await userController.postUser(req));
    } catch (err) {
      console.log(err);
      rp.errors.push(err);
      return rp.export();
    }
  }

  public async putUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await userController.putUser(req));
    } catch (err) {
      console.log(err);
      rp.errors.push(err);
      return rp.export();
    }
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await userController.getUser(req));
    } catch (err) {
      console.log(err);
      rp.errors.push(err);
      return rp.export();
    }
  }

  public async delUSer(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await userController.delUser(req));
    } catch (err) {
      console.log(err);
      rp.errors.push(err);
      return rp.export();
    }
  }

  public init() {
    this.router.get('/', this.getAllUsers);
    this.router.post('/', this.postUser);
    this.router.get('/:id', this.getUser);
    this.router.put('/:id', this.putUser);
    this.router.delete('/:id', this.delUSer);
  }
}

const userRoutes = new UsersRouter();
userRoutes.init();

export default userRoutes.router;