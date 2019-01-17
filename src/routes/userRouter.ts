import { NextFunction, Request, Response, Router } from 'express';
import { userController } from '../controllers/userController';
import { Response as Rp } from '../config/response';

export class UsersRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    res.json(await userController.getUsers().catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  }

  public async postUser(req: Request, res: Response, next: NextFunction) {
    res.json(await userController.newUser(req).catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    res.json(await userController.getUser(req.params.id).catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  }

  public async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    res.json(await userController.getCurrentUser().catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  }

  public async putCurrentUser(req: Request, res: Response, next: NextFunction) {
    res.json(await userController.updateCurrentUser(req.body.user).catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  }

  public async putUser(req: Request, res: Response, next: NextFunction) {
    res.json(await userController.putUser(req.params.id, req.body.user).catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  }

  public async delUSer(req: Request, res: Response, next: NextFunction) {
    res.json(await userController.delUser(req.params.id).catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  }

  public init() {
    this.router.get('/', this.getAllUsers);
    this.router.get('/:id', this.getUser);
    this.router.get('/mine', this.getCurrentUser);
    this.router.post('/', this.postUser);
    this.router.patch('/', this.putCurrentUser);
    this.router.patch('/:id', this.putUser);
    this.router.delete('/:id', this.delUSer);

  }
}

const userRoutes = new UsersRouter();
userRoutes.init();

export default userRoutes.router;