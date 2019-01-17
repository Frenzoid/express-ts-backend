import * as bcrypt from 'bcrypt-nodejs';
import { Request, Response } from 'express';
import { Response as Rp } from '../config/response';
import { User } from '../models/user';
/* import { mailer } from '../utils/Mailer';*/
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

    if (!token){
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

  /* public async forgotPassword(req) {
    const response = new Response();
    if (!req.body.email) {
      response.errors.push('Not email in body');
      return response;
    }
    const email = req.body.email;
    const user = await User.findOne({
      where: { email }, attributes: {
        include: ['password'],
      },
    });
    if (!user) {
      response.errors.push('Not found this user');
      return response;
    }
    const idToken = TokenManagement.generateForgotPassword(user.id, user.password);
    const link = 'http://booniverse.ie/users/forgot/' + idToken;
    // Send email with link for change password
    await mailer.sentEmail(email,
      'Please, click on the link to reset your password: ' + link,
      'Password recovery email');
    response.data.ok = true;
    return response;
  } */

  /* public async resForgotPassword(req) {
    const response = new Response();
    console.log(req.body.data);

    if (!req.body.data.token) {
      response.errors.push('Not found token in body');
    }

    const payload = TokenManagement.decodeJWT(req.body.data.token);
    const userToken = await User.findOne({
      where: { id: payload.data }, attributes: {
        include: ['password'],
      },
    });

    await TokenManagement.verifyForgorPassword(req.body.data.token, userToken.password).then(async (tkn) => {
      const user = await User.findById(tkn.data);
      if (!user) {
        response.errors.push('not found user');
        return;
      }

      await user.updateAttributes({ password: bcrypt.hashSync(req.body.data.password) }).then(async () => {
        const userBd2 = await User.findOne({ where: { id: user.id } });

        // Send email to user change password
        await mailer.sentEmail(userBd2.email,
          'Your password has been changed',
          'Change password');
        response.data.user = true;
      }).catch((err) => {
        response.errors.push(err);
      });
    }).catch((error) => {
      response.errors.push(error);
    });
    return response;
  } */
}

export const authController = new AuthController();
