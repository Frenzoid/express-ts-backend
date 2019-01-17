// Import libraries.
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as favicon from 'express-favicon';
import * as express_fileupload from 'express-fileupload';
import * as logger from 'morgan';
import * as passport from 'passport';
import * as path from 'path';

// Import config, the response template, and the utils (in this case the jwt manager).
import { Response as Rp } from './config/response';
import { Config } from './config/database_config';
import { TokenManagement } from './utils/tokenManager';

// Imports the routers.
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';

class App {
  public app: express.Application;
  private whiteList = ['/api/v1/auth/', '/api/v1/static/'];
  constructor() {
    this.app = express();
    this.middleware();
  }

  private async middleware(): Promise<any> {

    // Connect with the server
    Config.sConnector.sync({ force: true }).then((result: any) => {
      console.log(result);
    })
    .catch((err) => {
      console.error(`Error syncing database: ${err}`);
    });

    // initializatin the libraries and the express config.
    this.app.use(cors()); // Allows Control Acess Protol to work outside of a localhost.
    this.app.use(compression()); // Compresses the requests.
    this.app.use(logger('dev')); // Logs the activity to the console. (It can be configured to write it to a file).
    this.app.use(bodyParser.json({ limit: '100mb' })); // Parses automaticallythe requests, and adds a limit.
    this.app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' })); // Manages the encoded urls, and adds a limit.
    this.app.use(express_fileupload({ debug: true, abortOnLimit: true, preserveExtension: true })); // Manages the file uploads and adds a limit.
    this.app.use('/api/v1/static', express.static(path.join(__dirname, '/public'))); // Exposes a static folder to the exterior.
    this.app.use(favicon(`${__dirname}/public/coffe.png`));
    passport.use(TokenManagement.getStrategy()); // Initializes and gets the JWT strategy.

    this.app.use((req, res, next) => {
      Rp.clearData();
      next();
    });

    // DenyAll Policy: Denies access to protected paths, unless its on the "whiteList".
    this.app.use((req, res, next) => {
      passport.authenticate('jwt', (err, user, info) => {
        if ((err || !user) && !this.whiteList.find(url => req.url.startsWith(url))) {
          Rp.errors.push('User unauthorized');
          return res.status(401).end(JSON.stringify(Rp.export()));
        }
        next();
      })(req, res, next);
    });

    // token interceptor. Sends a renewed token on each petition if user is logged in.
    this.app.use(async (req, res, next) => {
      if (req.get('authorization')) {
        const newToken = await TokenManagement.renovarToken(
          req.get('authorization'),
        ).catch((err) => {
          Rp.errors.push(err);
          res.status(401).json(Rp.export());
          next();
        });
        res.setHeader('Authorization', newToken as string);
      }
      res.setHeader('access-control-expose-headers', 'Authorization');
      next();
    });

    // Routers
    this.app.use('/api/v1/auth', authRouter);
    this.app.use('/api/v1/users', userRouter);
  }
}

export default new App().app;
