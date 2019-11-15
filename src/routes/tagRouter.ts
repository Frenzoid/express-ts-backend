import { NextFunction, Request, Response, Router } from 'express';
import { tagController } from '../controllers/tagController';
import { ResponseModel as RM } from '../config/response';

export class TagsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  // Theses methods handle process between the data process and the response.

  // Get all tags
  public async getTags(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const reply = new RM();

    reply.data = await tagController.getTags().catch((err) => {
      reply.addError(err.message);
    });

    res.setHeader('Content-Type', 'application/json');
    return res.json(reply);
  }

  public init() {
    this.router.get('/', this.getTags);
  }
}

const tagsRouter = new TagsRouter();
export default tagsRouter.router;