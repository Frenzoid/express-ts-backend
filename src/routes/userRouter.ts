import { NextFunction, Request, Response, Router } from 'express';
import { userController } from '../controllers/userController';
import { ResponseModel as RM } from '../config/response';

export class UsersRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  // Theses methods handle process between the data process and the response.

  // Get all active Users
  public async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const reply = new RM();

    reply.data = await userController.getUsers().catch((err) => {
      reply.addError(err.message);
    });

    res.setHeader('Content-Type', 'application/json');
    return res.json(reply);
  }

  // Get all Users
  public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const reply = new RM();

    reply.data = await userController.getAllUsers().catch((err) => {
      reply.addError(err.message);
    });

    res.setHeader('Content-Type', 'application/json');
    return res.json(reply);
  }

  // Create a new user.
  public async postUser(req: Request, res: Response, next: NextFunction): Promise<Response>  {
    const reply = new RM();

    reply.data = await userController.postUser(req).catch((err) => {
      reply.addError(err.message);
    });

    res.setHeader('Content-Type', 'application/json');
    return res.json(reply);
  }

  // Edit an user.
  public async putUser(req: Request, res: Response, next: NextFunction): Promise<Response>  {
    const reply = new RM();

    reply.data = await await userController.putUser(req).catch((err) => {
      reply.addError(err.message);
    });

    res.setHeader('Content-Type', 'application/json');
    return res.json(reply);
  }

  // Get an User
  public async getUser(req: Request, res: Response, next: NextFunction): Promise<Response>  {
    const reply = new RM();

    reply.data = await userController.getUser(req).catch((err) => {
      reply.addError(err.message);
    });

    res.setHeader('Content-Type', 'application/json');
    return res.json(reply);
  }

  // Suspend user.
  public async delUSer(req: Request, res: Response, next: NextFunction): Promise<Response>  {
    const reply = new RM();

    reply.data = await userController.delUser(req).catch((err) => {
      reply.addError(err.message);
    });

    res.setHeader('Content-Type', 'application/json');
    return res.json(reply);
  }

  public init() {
    this.router.get('/', this.getUsers);
    this.router.get('/all', this.getAllUsers);
    this.router.get('/:id', this.getUser);
    this.router.post('/', this.postUser);
    this.router.put('/:id', this.putUser);
    this.router.delete('/:id', this.delUSer);
  }
}

const userRoutes = new UsersRouter();
export default userRoutes.router;