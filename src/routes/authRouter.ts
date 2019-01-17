import { NextFunction, Request, Response, Router } from 'express';
import { authController } from '../controllers/authController';
import { Response as Rp } from '../config/response';

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

/*   public async genTestChekToken(req: Request, res: Response, next: NextFunction) {
    res.json(await authController.genTestChekToken(req, res).catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  }

  public async genTestToken(req: Request, res: Response, next: NextFunction) {
    res.json(await authController.genTestToken(req, res).catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  } */

  public async login(req: Request, res: Response, next: NextFunction) {
    res.json(await authController.login(req.body.user, res).catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  }

  public async checkToken(req: Request, res: Response, next: NextFunction) {
    res.json(await authController.checkToken(req).catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  }

/*   public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    res.json(await authController.forgotPassword(req).catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  } */

/*   public async resForgotPassword(req: Request, res: Response, next: NextFunction) {
    res.json(await authController.resForgotPassword(req).catch((err) => {
      console.log(err);
      Rp.errors.push(err);
      return Rp.export();
    }));
  }
 */
  public init() {
/*     this.router.get('/genTestToken/:test', this.genTestToken);
    this.router.get('/genTestCheckToken/:test', this.genTestChekToken); */
    this.router.post('/login', this.login);
/*     this.router.post('/forgotPassword', this.forgotPassword);
    this.router.post('/resForgotPassword', this.resForgotPassword); */
    this.router.get('/checkToken', this.checkToken);
  }
}

const authRouter = new AuthRouter();

export default authRouter.router;
