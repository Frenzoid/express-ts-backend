import { NextFunction, Request, Response, Router } from 'express';
import { userController } from '../controllers/userController';
import { ResponseModel as RM } from '../config/response';

export class UsersRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const reply = new RM();

    reply.data = await userController.getUsers().catch((err) => {
      reply.addError(err.message);
      console.log(err.message);
    });

    return res.json(reply);
  }

  public async postUser(req: Request, res: Response, next: NextFunction) {
    const reply = new RM();

    reply.data = await userController.postUser(req).catch((err) => {
      reply.addError(err.message);
      console.log(err.message);
    });

    return  res.json(reply);
  }

  public async putUser(req: Request, res: Response, next: NextFunction) {
    const reply = new RM();

    reply.data = await await userController.putUser(req).catch((err) => {
      reply.addError(err.message);
      console.log(err.message);
    });

    return res.json(reply);
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    const reply = new RM();

    reply.data = await userController.getUser(req).catch((err) => {
      reply.addError(err.message);
      console.log(err.message);
    });

    return res.json(reply);
  }

  public async delUSer(req: Request, res: Response, next: NextFunction) {
    const reply = new RM();

    reply.data = await userController.delUser(req).catch((err) => {
      reply.errors.messages.push(err.message);
      reply.errors.critical = true;
      console.log(err.message);
    });

    return res.json(reply);
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