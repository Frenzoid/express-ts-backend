import * as jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { userController } from '../controllers/userController';
import { JWTSECRET } from '../config/const';

export class TokenManagement {
  // tslint:disable-next-line:variable-name
  public static _token: string;

  // tslint:disable-next-line:variable-name
  public static _currentUser: any;

  static get token() {
    return this._token;
  }

  static set token(value) {
    this._token = value;
  }

  static get currentUser() {
    return this._currentUser;
  }

  static set currentUser(value) {
    this._currentUser = value;
  }

  public static async syncUser(id) {
    this.currentUser = await userController
      .getUser(id)
      .catch(err => console.error(err));
    if (this.currentUser.error) console.error('Error Syncing user with API at TokenManager');
    this.currentUser = this.currentUser.data;
  }

  public static generateToken(userId) {
    this.token = jwt.sign(
      { data: userId },
      JWTSECRET,
      { expiresIn: '2 hours' },
    );

    this.syncUser(userId);
    return this.token;
  }

  public static generateForgotPassword(userId, password) {
    this.token = jwt.sign({ data: userId }, password, {
      expiresIn: '30 minutes',
    });
    return this.token;
  }

  public static verifyForgorPassword(
    tokenVer,
    password,
  ): Promise<{ data: number }> {
    let token = tokenVer;
    return new Promise((resolve, reject) => {
      token = token.replace(/^Bearer\s/, '');
      try {
        const resultado = jwt.verify(token, password, (err, tokenDb) => {
          if (err) {
            reject(`Token deprecated. Detail ${err}`);
          } else {
            // this.currentUser = token.data;
            resolve(tokenDb);
          }
        });
      } catch (e) {
        reject(`User not autenticated. Detail ${e}`);
      }
      reject('User not autenticated');
    });
  }

  public static getStrategy() {
    return new Strategy(
      {
        secretOrKey: JWTSECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      (payload, done) => {
        if (payload.data) return done(null, { data: payload.data });
        return done({ error: 'User not autenticated' }, null);
      },
    );
  }

  public static verifyToken(tokenVer): Promise<any> {
    let token = tokenVer;
    return new Promise((resolve, reject) => {
      token = token.replace(/^Bearer\s/, '');
      try {
        const resultado = jwt.verify(token, JWTSECRET, (err, tokenDb) => {
          if (err) {
            reject(`User not autenticated. Detail ${err}`);
          } else {
            resolve(tokenDb);
          }
        });
      } catch (e) {
        reject(`User not autenticated. Detail ${e}`);
      }
      reject('User not autenticated');
    });
  }

  public static async renovarToken(tokenRen): Promise<string> {
    let token = tokenRen;
    token = token.replace(/^Bearer\s/, '');
    const userId = (await TokenManagement.verifyToken(token)).data;

    this.token = await TokenManagement.generateToken(userId);
    return this.token;
  }

  public static decodeJWT(token) {
    const decoded = jwt.decode(token);
    console.log(decoded);
    return decoded;
  }
}
