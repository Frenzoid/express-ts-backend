import * as bcrypt from 'bcrypt-nodejs';
import { Request, Response } from 'express';
import { Response as Rp } from '../config/response';
import { User } from '../models/user';
import { TokenManagement } from '../utils/tokenManager';

class AuthController {

  // UNCOMMENT THIS TO CHECK IF THE TOKEN MANAGER WORKS FINE!
  /*
    public async genTestChekToken(req: Request, res: Response): Promise<Rp> {
      const token = req.params.test;
       await TokenManagement.verifyToken(token).then(async (tkn) => {
        Rp.data = { payload: tkn.data };
      }).catch((err) => {
        const error = `Error verifying token: ${err}`;
        console.error(error);
        Rp.errors.push(error);
      });
  
      return Rp.export();
    }
  
    public async genTestToken(req: Request, res: Response): Promise<Rp> {
      const payload = req.params.test;
      const token = await TokenManagement.generateToken(payload);
      res.setHeader('Authorization', token);
      Rp.data = { JWToken: token };
      return Rp.export();
    } */

  // Logins a user.
  public async login(user: any, res: Response): Promise<Rp> {

    const userdb: any = await User.findOne({
      where: {
        email: user.email,
      },
      attributes: {
        include: ['password'],
      },
    }).catch((err) => {
      const error = `Login failed by server-side, Error detail:  ${err}`;
      console.error(error);
      Rp.errors.push(error);
      return Rp.export();
    });

    if (!userdb) {
      Rp.errors.push('Incorrect credentials or user not found.');
    } else {
      if (bcrypt.compareSync(user.password, userdb.password)) {
        userdb.password = '';
        Rp.data = userdb;
        res.setHeader('Authorization', await TokenManagement.generateToken(Rp.data.id));
      } else {
        const err = 'Incorrect credentials.';
        console.error('Incorrect credentials.');
        Rp.errors.push(err);
      }
    }

    return Rp.export();
  }

  public async checkToken(req: Request) {
    const token = req.get('authorization');
    let error: string;

    if (!token) {
      error = 'Token not found in headers. Token must be on header \'authorization\'';
      console.error(error);
      Rp.errors.push(error);
      return Rp.export();
    }

    await TokenManagement.verifyToken(token).then(async (tkn) => {
      const user = await User.findById(tkn.data);
      if (!user) {
        const err = 'User not found';
        console.error(err);
        Rp.errors.push(err);
      } else {
        Rp.data = true;
      }
    }).catch((err) => {
      error = `Error verifying token: ${err}`;
      console.error(error);
      Rp.errors.push(error);
    });

    return Rp.export();
  }
}

export const authController = new AuthController();
